import { apiSlice } from '@/store/apiSlice';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginRequest {
  company_id: number;
  email: string;
  password: string;
}

export interface Company {
  company_id: number;
  company_name: string;
  registration_no: string;
  role: string;
}

export interface LoginResponse {
  active_company: Company;
  companies: Company[];
  token: string;
}

export interface SignupRequest {
  username: string;
  email: string;
  mobileno: string;
  password: string;
}

export interface SignupResponse {
  message?: string;
  // Based on common patterns; extend as needed if API returns more data
}

// ---------------------------------------------------------------------------
// Endpoints
// ---------------------------------------------------------------------------

export const authApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    /**
     * POST /auth/signin
     * Authenticates a user and returns tokens.
     * Use the `useLoginMutation` hook in components.
     */
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: credentials,
      }),
    }),

    /**
     * POST /auth/signup
     * Creates a new user account.
     */
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/auth/signup',
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

export const { useLoginMutation, useSignupMutation, useLogoutMutation } = authApi;
