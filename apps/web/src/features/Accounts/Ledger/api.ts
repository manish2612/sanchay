import { apiSlice } from '@/store/apiSlice';
import type { 
  GetLedgersRequest, 
  GetLedgersResponse,
  GetStockGroupsRequest,
  GetStockGroupsResponse,
  CreateLedgerRequest,
  CreateLedgerResponse
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
    createLedger: build.mutation<CreateLedgerResponse, CreateLedgerRequest>({
      query: (body) => ({
        url: 'accounting/ledgers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Ledger'],
    }),
  }),
});

export const { 
  useGetLedgersQuery, 
  useGetStockGroupsQuery,
  useCreateLedgerMutation 
} = ledgerApi;
