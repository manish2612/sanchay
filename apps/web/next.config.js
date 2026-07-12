/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    transpilePackages: ["@prime/ui", "@prime/config", "@prime/utils", "@prime/theme-provider", "@prime/theme-adapters", "@prime/design-tokens", "@prime/modules"],
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
