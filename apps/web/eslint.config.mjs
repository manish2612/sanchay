/**
 * Web App ESLint Configuration.
 * 
 * Imports the shared Next.js configuration from the `@prime/config` package
 * and applies any app-specific overrides or ignores (e.g. ignoring .next folder).
 */
import { nextConfig } from '@prime/config/eslint/next.mjs';

export default [
  ...nextConfig,
  {
    ignores: ['.next/**', 'dist/**', 'node_modules/**', 'postcss.config.mjs', 'tailwind.config.js'],
  }
];
