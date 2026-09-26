import { apiSlice } from '@/store/apiSlice';
import type { GetLedgersRequest, GetLedgersResponse } from './types';

export const ledgerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLedgers: build.query<GetLedgersResponse, GetLedgersRequest>({
      query: () => ({
        url: 'accounting/ledgers',
        method: 'GET',
      }),
      providesTags: ['Ledger'],
    }),
  }),
});

export const { useGetLedgersQuery } = ledgerApi;
