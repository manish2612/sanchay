
try {
    const tokens = require("@sanchay/design-tokens");
    console.log("Tokens loaded:", !!tokens.getTheme);
    const adapters = require("@sanchay/theme-adapters");
    console.log("Adapters loaded:", !!adapters.getWebTheme);
} catch (e) {
    console.error(e);
}
