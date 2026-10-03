import { createApi } from '@reduxjs/toolkit/query/react';
import { createAxiosBaseQuery } from '@prime/api';
import { api } from './api';

const rawBaseQuery = createAxiosBaseQuery(api);

const SKIP_COMPANY_ID_URLS = ['/auth', '/global'];

const dynamicBaseQuery: typeof rawBaseQuery = async (args, apiContext, extraOptions) => {
  const state = apiContext.getState() as any; 
  const activeCompanyId = state?.auth?.activeCompanyId;

  const skipInjection = SKIP_COMPANY_ID_URLS.some(url => args.url.includes(url));

  if (activeCompanyId && !skipInjection) {
    args.headers = {
      'X-Company-ID': activeCompanyId,
      ...args.headers, 
    };
  }

  return rawBaseQuery(args, apiContext, extraOptions);
};

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
  baseQuery: dynamicBaseQuery,
  /**
   * Global cache tag types. Each feature registers the tags it uses.
   * Add new tags here as features are added — they are purely for TypeScript
   * autocompletion and do not affect runtime behaviour.
   */
  tagTypes: ['Post', 'User', 'Auth', 'Ledger', 'VoucherType', 'CostCategory', 'CostCenter', 'Voucher', 'Group', 'Godown', 'StockCategory'],
  endpoints: () => ({}),
});
