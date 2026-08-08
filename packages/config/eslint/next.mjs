/**
 * Next.js specific ESLint Configuration.
 * 
 * This configuration extends the `base.mjs` setup and adds rules specifically
 * for React and Next.js applications (including hooks and core web vitals).
 * 
 * Usage: Import this in the `eslint.config.mjs` of any Next.js app in the monorepo.
 */
import { baseConfig } from './base.mjs';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import hooksPlugin from 'eslint-plugin-react-hooks';

export const nextConfig = [
  ...baseConfig,
  {
    plugins: {
      '@next/next': nextPlugin,
      'react': reactPlugin,
      'react-hooks': hooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...hooksPlugin.configs.recommended.rules,
      'react/prop-types': 'off', // Not needed with TypeScript
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];
