import { createApiRegistry } from '@prime/api';

/**
 * The singleton ApiRegistry for the web app.
 *
 * Created once at module level — imported wherever a raw imperative call is needed.
 * RTK Query endpoints go through this via createAxiosBaseQuery() in apiSlice.ts.
 *
 * Token storage and refresh logic will be wired to real implementations
 * (e.g. js-cookie) once the auth flow is built out.
 *
 * TODO: Replace placeholder baseURL values with import.meta.env.VITE_*
 * TODO: Wire up a real ITokenStorage implementation (js-cookie wrapper)
 * TODO: Wire up a real onRefreshToken callback to POST /auth/refresh
 */
export const api = createApiRegistry<'MAIN'>({
  clients: {
    MAIN: {
      baseURL: 'https://jsonplaceholder.typicode.com',
      // TODO: replace with import.meta.env.VITE_API_URL
    },
  },
  defaultClient: 'MAIN',
  // tokenStorage: cookieTokenStorage,
  // onRefreshToken: async () => { await api.request({ url: '/auth/refresh', method: 'POST' }); },
  // onUnauthorized: () => { window.location.href = '/login'; },
});
