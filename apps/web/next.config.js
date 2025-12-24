/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    transpilePackages: ["@sanchay/ui", "@sanchay/config", "@sanchay/utils", "@sanchay/theme-provider", "@sanchay/theme-adapters", "@sanchay/design-tokens"],
};

module.exports = nextConfig;
