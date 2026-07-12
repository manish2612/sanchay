
import { getTheme, Brand, Mode, Theme, Density } from '@prime/design-tokens';
import { generateWebCSSVariables, getWebTheme } from './web';
import { getNativeTheme } from './native';

// Re-export specific platform adapters
export * from './web';
export * from './native';

export type Platform = 'web' | 'native';

interface AdapterResult {
    theme: Theme; // The raw theme object
    webCSSVariables?: string; // Only for web
    nativeTheme?: Theme; // Only for native (aliased to Theme for now)
}

/**
 * Main utility to get the adapted theme for a specific platform.
 * In a real app, this might be a hook, but here it's a pure utility function.
 * 
 * @param brand 
 * @param mode 
 * @param platform 
 * @returns 
 */
export const useThemeAdapter = (brand: Brand, mode: Mode, density: Density, platform: Platform): AdapterResult => {
    const rawTheme = getTheme(brand, mode, density);

    if (platform === 'web') {
        const cssVars = generateWebCSSVariables(rawTheme, ':root');
        const webTheme = getWebTheme(rawTheme);
        return {
            theme: webTheme,
            webCSSVariables: cssVars,
        };
    } else {
        const nativeTheme = getNativeTheme(rawTheme);
        return {
            theme: rawTheme,
            nativeTheme: nativeTheme,
        };
    }
};
