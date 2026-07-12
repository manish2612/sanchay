
import React, { createContext, useContext, ReactNode } from 'react';
import { Theme } from '@prime/design-tokens';

export type NativeTheme = any; // Ideally we mirror Theme but with numbers instead of strings. 
// For now, using 'any' or we could construct a mapped type. 
// Given brevity, let's keep it loose or just say it returns the processed object.

/**
 * Strips 'px' from a string if it exists and returns a number.
 * e.g. "16px" -> 16
 * e.g. "120ms" -> 120 (if we decide to strip ms)
 */
const stripUnit = (val: string): number | string => {
    if (val.endsWith('px')) {
        const num = parseFloat(val);
        if (!isNaN(num)) return num;
    }
    // Optional: strip 'ms' for animations if RN expects numbers.
    // Standard Animated API often uses numbers for ms.
    if (val.endsWith('ms')) {
        const num = parseFloat(val);
        if (!isNaN(num)) return num;
    }
    return val;
};

/**
 * Recursively processing the theme to convert unit strings to numbers for RN.
 * Targeted keys: spacing, radii, fontSize, lineHeight, motion duration.
 */

const mapFontToken = (val: string): string => {
    if (val.includes('var(--font-ibm-plex-sans)')) return 'IBM Plex Sans';
    if (val.includes('var(--font-work-sans)')) return 'Work Sans';
    return val;
};

/**
 * Recursively processing the theme to convert unit strings to numbers for RN.
 * Targeted keys: spacing, radii, fontSize, lineHeight, motion duration.
 */
const processThemeForNative = (obj: any): any => {
    if (Array.isArray(obj)) {
        return obj.map(processThemeForNative);
    }
    if (obj && typeof obj === 'object') {
        const result: any = {};
        for (const k of Object.keys(obj)) {
            const val = obj[k];
            // Recursion
            result[k] = processThemeForNative(val);
        }
        return result;
    }
    // Primitive handling
    if (typeof obj === 'string') {
        // Map fonts first
        if (obj.includes('var(--font-')) {
            return mapFontToken(obj);
        }

        // Normalize HSL colors for React Native (Space-separated -> Comma-separated)
        // e.g. "hsl(212 100% 48%)" -> "hsl(212, 100%, 48%)"
        if (obj.startsWith('hsl(')) {
            // Handle "hsl(h s l / a)" -> "hsla(h, s, l, a)" if needed, or just standard hsl
            // Simple regex for standard "hsl(h s% l%)"
            return obj.replace(/hsl\(\s*([\d.]+)\s+([\d.]+%)\s+([\d.]+%)\s*\)/, 'hsl($1, $2, $3)')
                .replace(/hsl\(\s*([\d.]+)\s+([\d.]+%)\s+([\d.]+%)\s*\/\s*([\d.]+)\s*\)/, 'hsla($1, $2, $3, $4)');
        }

        // We broadly attempt to strip units if the numeric value is safe.
        // However, we should be careful not to strip things that SHOULD be strings.
        // But in our schema, most "16px" values are intended for sizing.
        return stripUnit(obj);
    }
    return obj;
};

export const getNativeTheme = (theme: Theme): NativeTheme => {
    console.log('[ThemeAdapters] Processing Native Theme');
    // We deep clone and process values.
    const start = Date.now();
    const res = processThemeForNative(theme);
    console.log(`[ThemeAdapters] Theme processed in ${Date.now() - start}ms`);
    return res;
};

const ThemeContext = createContext<NativeTheme | null>(null);

export const ThemeProvider = ({ theme, children }: { theme: NativeTheme, children: ReactNode }) => {
    console.log('[ThemeAdapters] ThemeProvider rendering');
    return React.createElement(ThemeContext.Provider, { value: theme }, children);
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
