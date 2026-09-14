import { apiSlice } from '@/store/apiSlice';
import { Company } from '@/types/models/Company';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface LoginRequest {
  company_id: string;
  email: string;
  password: string;
}

export interface User {
  full_name: string;
  email: string;
  mobile_no: string;
}

export interface SwitchCompanyRequest {
  company_id: string;
}

export interface SwitchCompanyResponse {
  message: string;
  token: string;
}

export interface LoginResponse {
  companies: Company[];
  token: string;
  user: User;
}

export interface SignupRequest {
  email: string;
  full_name: string;
  mobile_no: string;
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
     * POST /auth/register
     * Creates a new user account.
     */
    signup: build.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/auth/register',
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
    /**
     * POST /core/switch-company
     * Switches the active company context.
     */
    switchCompany: build.mutation<SwitchCompanyResponse, SwitchCompanyRequest>({
      query: (body) => ({
        url: '/core/switch-company',
        method: 'POST',
        body,
      }),
    }),
  }),
  // overrideExisting prevents accidental duplicate endpoint collisions in dev
  overrideExisting: false,
});

export const { useLoginMutation, useSignupMutation, useLogoutMutation, useSwitchCompanyMutation } = authApi;
