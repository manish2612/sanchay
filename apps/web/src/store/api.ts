import { createApiRegistry } from '@prime/api';
import { cookieTokenStorage } from '@/utils/tokenStorage';

const baseURL = import.meta.env.VITE_API_URL || '/api/v1/';

/**
 * The singleton ApiRegistry for the web app.
 *
 * Created once at module level — imported wherever a raw imperative call is needed.
 * RTK Query endpoints go through this via createAxiosBaseQuery() in apiSlice.ts.
 */
export const api = createApiRegistry<'MAIN'>({
  clients: {
    MAIN: {
      baseURL,
    },
  },
  defaultClient: 'MAIN',
  tokenStorage: cookieTokenStorage,
  
  // ==============================================================================
  // REFRESH TOKEN LOGIC
  // ==============================================================================
  // Handles silent token refreshes via HttpOnly cookie
  onRefreshToken: async () => {
    try {
      // Use native fetch to bypass the Axios interceptors and prevent a 401 deadlock
      const response = await fetch(`${baseURL}auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        credentials: 'include', // Ensure the HttpOnly cookie is sent
      });
      
      if (!response.ok) {
        throw new Error('Refresh endpoint returned an error');
      }
      
      const data = await response.json();
      
      // Extract the new token from the response
      const newToken = data?.token;
      
      if (newToken) {
        cookieTokenStorage.setToken(newToken);
      } else {
        throw new Error('No token returned from refresh endpoint');
      }
    } catch (error) {
      // If refresh fails, clear token and let onUnauthorized take over
      cookieTokenStorage.clearToken();
      throw error;
    }
  },
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

