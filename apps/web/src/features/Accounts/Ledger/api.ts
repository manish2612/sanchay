import { apiSlice } from '@/store/apiSlice';
import type { 
  GetLedgersRequest, 
  GetLedgersResponse,
  GetStockGroupsRequest,
  GetStockGroupsResponse
} from './types';

export const ledgerApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getLedgers: build.query<GetLedgersResponse, GetLedgersRequest>({
      query: () => ({
        url: 'accounting/ledgers',
        method: 'GET',
      }),
      providesTags: ['Ledger'],
    }),
    getStockGroups: build.query<GetStockGroupsResponse, GetStockGroupsRequest>({
      query: () => ({
        url: 'inventory/stockgroups',
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetLedgersQuery, useGetStockGroupsQuery } = ledgerApi;
