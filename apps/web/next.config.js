/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    transpilePackages: ["@sanchay/ui", "@sanchay/config", "@sanchay/utils", "@sanchay/theme-provider", "@sanchay/theme-adapters", "@sanchay/design-tokens"],
    webpack: (config) => {
        config.resolve.extensions = [
            '.next.tsx',
            '.next.ts',
            '.next.jsx',
            '.next.js',
            ...config.resolve.extensions,
        ];
        return config;
    },
};

module.exports = nextConfig;
