
try {
    const tokens = require("@prime/design-tokens");
    console.log("Tokens loaded:", !!tokens.getTheme);
    const adapters = require("@prime/theme-adapters");
    console.log("Adapters loaded:", !!adapters.getWebTheme);
} catch (e) {
    console.error(e);
}
