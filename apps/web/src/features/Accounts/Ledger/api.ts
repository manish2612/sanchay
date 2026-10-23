import { apiSlice } from '@/store/apiSlice';
import type { 
  GetLedgersRequest, 
  GetLedgersResponse,
  Ledger,
  CreateLedgerRequest,
  CreateLedgerResponse,
  UpdateLedgerRequest,
  DeleteLedgerResponse,
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
    getLedgerById: build.query<Ledger, string>({
      query: (id) => ({
        url: `accounting/ledgers/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Ledger', id }],
    }),
    createLedger: build.mutation<CreateLedgerResponse, CreateLedgerRequest>({
      query: (body) => ({
        url: 'accounting/ledgers',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Ledger'],
    }),
    updateLedger: build.mutation<Ledger, UpdateLedgerRequest>({
      query: ({ id, body }) => ({
        url: `accounting/ledgers/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Ledger'],
    }),
    deleteLedger: build.mutation<DeleteLedgerResponse, string>({
      query: (id) => ({
        url: `accounting/ledgers/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Ledger'],
    }),
  }),
});

export const { 
  useGetLedgersQuery, 
  useGetLedgerByIdQuery,
  useCreateLedgerMutation,
  useUpdateLedgerMutation,
  useDeleteLedgerMutation,
} = ledgerApi;
