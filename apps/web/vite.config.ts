import { defineConfig } from 'vite';
import path from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

export default defineConfig({
  plugins: [
    tanstackRouter({ autoCodeSplitting: true }),
    react(),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://test.morya-infotech.com',
        changeOrigin: true,
        secure: true,
        configure: (proxy) => {
          // Rewrite Set-Cookie headers on every proxied response so the browser
          // correctly stores and resends the HttpOnly refresh_token on localhost.
          //
          // cookieDomainRewrite alone is insufficient — the backend sets:
          //   Domain=test.morya-infotech.com  → browser rejects (wrong domain)
          //   Secure                          → blocks on http://localhost
          //   SameSite=Strict                 → may block on proxy responses
          //
          // This hook strips/rewrites each attribute individually:
          proxy.on('proxyRes', (_proxyRes, _req, res) => {
            const setCookieHeader = _proxyRes.headers['set-cookie'];
            if (!setCookieHeader) return;

            const rewritten = setCookieHeader.map((cookie) =>
              cookie
                // Remove Domain — browser will scope cookie to localhost automatically
                .replace(/;\s*domain=[^;]+/gi, '')
                // Remove Secure — http://localhost doesn't guarantee HTTPS carve-out
                .replace(/;\s*secure(?=;|$)/gi, '')
                // Downgrade SameSite to Lax — Strict can block cross-context storage,
                // None requires Secure (which we just removed)
                .replace(/;\s*samesite=(strict|none)/gi, '; SameSite=Lax')
            );

            // Replace the header on the outgoing response to the browser
            res.setHeader('set-cookie', rewritten);
          });
        },
      },
    },
  },
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
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('lucide-react')) return 'vendor-lucide';
            if (id.includes('@tanstack')) return 'vendor-tanstack';
            if (id.includes('react-day-picker')) return 'vendor-date';
            // Let Vite handle react natively to avoid execution order issues
          }
        }
      }
    }
  }
});
