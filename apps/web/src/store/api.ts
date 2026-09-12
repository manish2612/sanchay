import { createApiRegistry } from '@prime/api';
import { cookieTokenStorage } from '@/utils/tokenStorage';

/**
 * The singleton ApiRegistry for the web app.
 *
 * Created once at module level — imported wherever a raw imperative call is needed.
 * RTK Query endpoints go through this via createAxiosBaseQuery() in apiSlice.ts.
 */
export const api = createApiRegistry<'MAIN'>({
  clients: {
    MAIN: {
      baseURL: import.meta.env.VITE_API_URL || 'http://202.51.1.109:5814/api/v1/',
    },
  },
  defaultClient: 'MAIN',
  tokenStorage: cookieTokenStorage,
  
  // ==============================================================================
  // REFRESH TOKEN LOGIC (Commented out for future implementation)
  // ==============================================================================
  // To enable silent token refreshes:
  // 1. Uncomment this `onRefreshToken` method.
  // 2. Ensure your backend returns the new auth token (and refresh token) in the response.
  //
  // onRefreshToken: async () => {
  //   try {
  //     // We assume the refresh token is stored securely (e.g. HttpOnly cookie or tokenStorage).
  //     const response = await api.request({ 
  //       url: '/auth/refresh', 
  //       method: 'POST' 
  //     });
  //     
  //     // Extract the new token from the response
  //     const newToken = response.data.token; // adjust path to match your API response
  //     
  //     if (newToken) {
  //       cookieTokenStorage.setToken(newToken);
  //     } else {
  //       throw new Error('No token returned from refresh endpoint');
  //     }
  //   } catch (error) {
  //     // If refresh fails, clear token and let onUnauthorized take over
  //     cookieTokenStorage.clearToken();
  //     throw error;
  //   }
  // },
  // ==============================================================================

  onUnauthorized: () => { 
    cookieTokenStorage.clearToken();
    // Do not force a page reload if we are already on the login page.
    // This prevents the 'Leave site?' prompt when a 401 occurs during login.
    if (window.location.pathname !== '/login') {
      window.location.href = '/login'; 
    }
  },
});
