/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    transpilePackages: ["@sanchay/ui", "@sanchay/config", "@sanchay/utils", "@sanchay/theme-provider", "@sanchay/theme-adapters", "@sanchay/design-tokens"],
    webpack: (config) => {
        config.resolve.alias = {
            ...(config.resolve.alias || {}),
            'react-native$': 'react-native-web',
        };
        config.resolve.extensions = [
            '.web.tsx',
            '.web.ts',
            '.web.jsx',
            '.web.js',
            ...config.resolve.extensions,
        ];
        return config;
    },
};

module.exports = nextConfig;
