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

/**
 * Bundle Analyzer Configuration.
 * 
 * This plugin creates a visual map of the compiled Next.js bundle sizes.
 * To use it and see what is taking up space in your bundle, run:
 * `pnpm --filter web analyze` from the monorepo root.
 * 
 * It will generate HTML reports in the `.next/analyze/` directory.
 */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
