const { getTheme } = require("@sanchay/design-tokens");
const { getWebTheme } = require("@sanchay/theme-adapters");

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
    ],
    theme: {
        extend: {
            colors: webTheme.colors,
            fontSize: webTheme.typography.fontSize,
            fontFamily: webTheme.typography.fontFamily,
            fontWeight: webTheme.typography.fontWeight,
            lineHeight: webTheme.typography.lineHeight,
            borderRadius: webTheme.radii,
            boxShadow: webTheme.shadows,
            spacing: webTheme.spacing,
        },
    },
    plugins: [],
};
