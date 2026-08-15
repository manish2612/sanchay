import { apiSlice } from '@/store/apiSlice';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    /**
     * POST /auth/login
     * Authenticates a user and returns tokens.
     * Use the `useLoginMutation` hook in components.
     */
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    /**
     * POST /auth/logout
     * Invalidates the current session on the server.
     */
    logout: build.mutation<void, void>({
      query: () => ({ url: '/auth/logout', method: 'POST' }),
      // Invalidate all cached data on logout for security
      invalidatesTags: ['Post', 'User', 'Auth'],
    }),
  }),
  // overrideExisting prevents accidental duplicate endpoint collisions in dev
  overrideExisting: false,
});

export const { useLoginMutation, useLogoutMutation } = authApi;
