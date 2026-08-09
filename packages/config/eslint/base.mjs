/**
 * Base ESLint Configuration for the Monorepo.
 * 
 * This file sets up the foundation for ESLint v9 Flat Config.
 * It includes TypeScript-specific linting rules and most importantly,
 * integrates `eslint-config-prettier` to ensure that ESLint defers all
 * formatting rules (like quotes, indentation, etc.) to Prettier.
 * 
 * Usage: Import this configuration into other specific configs (like next.mjs).
 */
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export const baseConfig = tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
  // Ensure Prettier is the last config to disable conflicting formatting rules
  prettierConfig,
);
