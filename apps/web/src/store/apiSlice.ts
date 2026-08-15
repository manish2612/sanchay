import { createApi } from '@reduxjs/toolkit/query/react';
import { createAxiosBaseQuery } from '@prime/api';
import { api } from './api';

/**
 * Root RTK Query slice.
 *
 * Intentionally has NO endpoints defined here. All endpoints are injected
 * by feature-level api.ts files via `apiSlice.injectEndpoints()`.
 * This keeps each feature self-contained and avoids a single giant file.
 *
 * @example
 * // features/users/api.ts
 * export const usersApi = apiSlice.injectEndpoints({ endpoints: (build) => ({ ... }) });
 */
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: createAxiosBaseQuery(api),
  /**
   * Global cache tag types. Each feature registers the tags it uses.
   * Add new tags here as features are added — they are purely for TypeScript
   * autocompletion and do not affect runtime behaviour.
   */
  tagTypes: ['Post', 'User', 'Auth'],
  endpoints: () => ({}),
});
