
import { Theme } from '@sanchay/design-tokens';

/**
 * Flattens a nested object into a single-level object with hyphenated keys.
 * Since the tokens now contain units (e.g. "16px"), we do NOT need to append units.
 * We just need to flatten the structure.
 */
const flattenTheme = (obj: any, prefix = ''): Record<string, string> => {
    return Object.keys(obj).reduce((acc, k) => {
        const pre = prefix.length ? prefix + '-' : '';
        const value = obj[k];

        if (value && typeof value === 'object' && !Array.isArray(value)) {
            Object.assign(acc, flattenTheme(value, pre + k));
        } else {
            // It's a string or number value.
            // We just convert to string.
            // Special handling: if value is number, we keep it as is (no px appended).
            // But our tokens are mostly strings now.
            acc[pre + k] = String(value);
        }
        return acc;
    }, {} as Record<string, string>);
};

const processThemeForWeb = (obj: any, prefix = ''): any => {
    if (obj && typeof obj === 'object' && !Array.isArray(obj)) {
        const result: any = {};
        for (const k of Object.keys(obj)) {
            const pre = prefix.length ? prefix + '-' : '';
            result[k] = processThemeForWeb(obj[k], pre + k);
        }
        return result;
    }
    // Leaf: Return semantic variable reference
    return `var(--${prefix})`;
};

export const getWebTheme = (theme: Theme): Theme => {
    // We return a theme object where every value is a CSS variable reference
    // e.g. spacing[1] = "var(--spacing-1)"
    return processThemeForWeb(theme);
};

export const generateWebCSSVariables = (theme: Theme, selector: string = ':root'): string => {
    // Generate CSS variables
    // Logic is now MUCH simpler because units are in the tokens.

    const cssVars: Record<string, string> = {};

    // We flatten the entire theme.
    // E.g. spacing[4] -> --spacing-4
    // typography.fontSize.sm -> --typography-fontSize-sm

    const flat = flattenTheme(theme);

    Object.entries(flat).forEach(([key, value]) => {
        // Only output variables for leaf nodes that have values
        if (value !== undefined && value !== null) {
            cssVars[`--${key}`] = value;
        }
    });

    // Generate CSS string
    const variables = Object.entries(cssVars)
        .map(([k, v]) => `  ${k}: ${v};`)
        .join('\n');

    return `${selector} {\n${variables}\n}`;
};
