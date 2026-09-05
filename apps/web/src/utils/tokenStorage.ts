import Cookies from 'js-cookie';
import type { ITokenStorage } from '@prime/api';

const TOKEN_KEY = 'auth_token';

/**
 * Token storage implementation using js-cookie.
 * Allows the @prime/api interceptors to automatically append the token
 * to requests, and clears it upon logout or terminal authentication failure.
 */
export const cookieTokenStorage: ITokenStorage = {
  getToken: () => Cookies.get(TOKEN_KEY),
  setToken: (token: string) => {
    // Set cookie to be secure in production, restrict same-site usage.
    Cookies.set(TOKEN_KEY, token, {
      secure: window.location.protocol === 'https:',
      sameSite: 'strict',
      path: '/',
    });
  },
  clearToken: () => {
    Cookies.remove(TOKEN_KEY, { path: '/' });
  },
};
