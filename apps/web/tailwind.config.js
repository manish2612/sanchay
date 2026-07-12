const { getTheme } = require("@prime/design-tokens");
const { getWebTheme } = require("@prime/theme-adapters");

// Get the default theme to generate configuration
// In the app, the ThemeProvider will handle swapping CSS variables for modes/brands
const rawTheme = getTheme('default', 'light', 'comfortable');
const webTheme = getWebTheme(rawTheme);

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [

        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/modules/src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: webTheme.colors,
            fontSize: webTheme.fontSizes,
            fontFamily: webTheme.fonts,
            fontWeight: webTheme.fontWeights,
            lineHeight: webTheme.lineHeights,
            borderRadius: webTheme.radii,
            boxShadow: webTheme.shadows,
            spacing: webTheme.space,
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-4px)' },
                    '75%': { transform: 'translateX(4px)' },
                }
            },
            animation: {
                shake: 'shake 0.2s ease-in-out 0s 2',
            }
        },
    },
    plugins: [],
};
// Trigger rebuild
