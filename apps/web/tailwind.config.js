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

        "./src/**/*.{js,ts,jsx,tsx,mdx}",
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
            height: {
                screen: ['100vh', '100dvh'],
            },
            minHeight: {
                screen: ['100vh', '100dvh'],
            },
            keyframes: {
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-4px)' },
                    '75%': { transform: 'translateX(4px)' },
                },
                'num-slide-up': {
                    '0%': { opacity: '0', transform: 'translateY(12px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                'num-fade-in': {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            },
            animation: {
                shake: 'shake 0.2s ease-in-out 0s 2',
                'num-slide-up': 'num-slide-up var(--duration, 0.3s) ease-out both',
                'num-fade-in': 'num-fade-in var(--duration, 0.3s) ease-out both',
            }
        },
    },
    plugins: [require("tailwindcss-animate")],
};
// Trigger rebuild
