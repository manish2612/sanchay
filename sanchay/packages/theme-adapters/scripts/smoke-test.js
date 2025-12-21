
const { useThemeAdapter, generateWebCSSVariables, getNativeTheme } = require('../dist');
const { getTheme } = require('@sanchay/design-tokens');

// Quick manual smoke test since we don't have a test runner set up yet
const run = () => {
    console.log("Running Smoke Test for Theme Adapters...");

    // 1. Get default light theme
    // Note: getTheme returns a Theme object which now has nested structure
    const rawTheme = getTheme('default', 'light');
    if (!rawTheme) {
        console.error("FAIL: Could not load default light theme from design-tokens");
        process.exit(1);
    }
    console.log("PASS: Loaded default theme");

    // 2. Test CSS Variables Generation
    const css = generateWebCSSVariables(rawTheme);

    // Check for nested variables e.g. --colors-primary
    if (!css.includes('--colors-primary')) {
        console.error("FAIL: Web Adapter missing --colors-primary");
        process.exit(1);
    }

    // Check for newly added tokens
    if (!css.includes('--colors-disabled: hsl(214 32% 93%)')) {
        console.error("FAIL: Web Adapter missing or incorrect --colors-disabled");
        process.exit(1);
    }
    if (!css.includes('--shadows-lg')) {
        console.error("FAIL: Web Adapter missing --shadows-lg");
        process.exit(1);
    }

    // Check for nested typography e.g. --typography-fontSize-sm
    if (!css.includes('--typography-fontSize-sm')) {
        console.error("FAIL: Web Adapter missing --typography-fontSize-sm");
        process.exit(1);
    }

    // Check for unit presence (they are in strings now, so adapter should just pass them)
    // spacing[4] is "16px" -> --spacing-4: 16px
    if (!css.includes('--spacing-4: 16px')) {
        console.error("FAIL: Web Adapter incorrect value for --spacing-4");
        const match = css.match(/--spacing-4:.*?;/);
        console.log(match ? match[0] : "Not found (or incorrect value)");
        process.exit(1);
    }

    console.log("PASS: Web Adapter CSS generation (Nested keys & string units)");

    // 3. Test Native Theme
    const nativeTheme = getNativeTheme(rawTheme);

    // Spacing should be numbers (stripped units)
    // raw was "16px", native should be 16
    if (nativeTheme.spacing[4] !== 16) {
        console.error("FAIL: Native Adapter did not strip units for spacing. Got:", nativeTheme.spacing[4]);
        process.exit(1);
    }

    // Radii should be numbers "4px" -> 4
    if (nativeTheme.radii.sm !== 4) {
        console.error("FAIL: Native Adapter did not strip units for radii. Got:", nativeTheme.radii.sm);
        process.exit(1);
    }

    // Motion duration "120ms" -> 120 (if we implemented ms stripping)
    // Checking implementation: we added ms stripping.
    if (nativeTheme.motion.duration.fast !== 120) {
        console.error("FAIL: Native Adapter did not strip ms from motion. Got:", nativeTheme.motion.duration.fast);
        console.log("Expected 120 (number)");
        process.exit(1);
    }

    console.log("PASS: Native Adapter (Unit stripping)");

    // 4. Test useThemeAdapter utility
    const webResult = useThemeAdapter('default', 'light', 'web');
    if (!webResult.webCSSVariables) {
        console.error("FAIL: useThemeAdapter('web') did not return css variables");
        process.exit(1);
    }

    const nativeResult = useThemeAdapter('default', 'dark', 'native');
    if (!nativeResult.nativeTheme) {
        console.error("FAIL: useThemeAdapter('native') did not return native theme");
        process.exit(1);
    }

    console.log("ALL PASS: Theme Adapters smoke test passed.");
};

run();
