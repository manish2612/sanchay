import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    react(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      '@master-forms': path.resolve(__dirname, './src/features/Masters/components/forms'),
      '@prime/theme-adapters': path.resolve(__dirname, '../../packages/theme-adapters/src/index.ts'),
      '@prime/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
      '@prime/theme-provider/web': path.resolve(__dirname, '../../packages/theme-provider/src/web/index.tsx'),
      '@prime/theme-provider/native': path.resolve(__dirname, '../../packages/theme-provider/src/native/index.native.tsx'),
      '@prime/theme-provider': path.resolve(__dirname, '../../packages/theme-provider/src/index.ts'),
      '@prime/api': path.resolve(__dirname, '../../packages/api/src/index.ts'),
      '@prime/config': path.resolve(__dirname, '../../packages/config/src/index.ts'),
      '@prime/modules': path.resolve(__dirname, '../../packages/modules/src/index.ts'),
      '@prime/services': path.resolve(__dirname, '../../packages/services/src/index.ts'),
      '@prime/design-tokens': path.resolve(__dirname, '../../packages/design-tokens/src/index.ts'),
    }
  }
});
