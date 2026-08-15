import type { BaseQueryFn } from '@reduxjs/toolkit/query';
import type { ApiError, ApiRequestArgs } from './types';
import type { ApiRegistry } from './clients';

/**
 * Creates an RTK Query `baseQuery` powered by the Phase 1 `ApiRegistry`.
 *
 * The adapter translates RTK Query's standard args object — which has the
 * same shape as `ApiRequestArgs` — directly into `registry.request()`.
 * No transformation needed: both sides speak the same language.
 *
 * Errors are caught and returned as `{ error: ApiError }` (never thrown),
 * which is the RTK Query contract for safe error handling.
 *
 * @example
 * // In store/apiSlice.ts
 * const baseQuery = createAxiosBaseQuery(api);
 * export const apiSlice = createApi({ baseQuery, ... });
 *
 * // In features/users/api.ts
 * getUser: build.query<User, number>({
 *   query: (id) => ({ url: `/users/${id}`, method: 'GET' }),
 * }),
 *
 * // With a specific backend client
 * getAdminData: build.query<AdminData, void>({
 *   query: () => ({ url: '/admin/data', method: 'GET', client: 'ADMIN' }),
 * }),
 */
export function createAxiosBaseQuery<TClientKey extends string>(
  registry: ApiRegistry<TClientKey>,
): BaseQueryFn<ApiRequestArgs<TClientKey>, unknown, ApiError> {
  return async (args) => {
    try {
      const data = await registry.request<unknown>(args);
      return { data };
    } catch (error) {
      // ApiRegistry.request() always throws ApiError (normalized in Phase 1).
      // We return it as { error } — never re-throw — so RTK Query can handle it.
      return { error: error as ApiError };
    }
  };
}
