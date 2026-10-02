import { apiSlice } from '@/store/apiSlice';

export type NextVoucherNumberRequest = {
  voucher_type_id: string;
  voucher_date: string;
} & Record<string, unknown>;

export interface NextVoucherNumberResponse {
  voucher_type_id: string;
  voucher_date: string;
  next_voucher_number: string;
  sequence_index: number;
  numbering_type: string;
  reset_on: string;
  prefix: string;
  suffix: string;
}

export const vouchersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getNextVoucherNumber: build.query<NextVoucherNumberResponse, NextVoucherNumberRequest>({
      query: (params) => ({
        url: 'accounting/vouchers/next-number',
        method: 'GET',
        params,
      }),
      providesTags: ['Voucher'],
    }),
    createVoucher: build.mutation<any, any>({
      query: (payload) => ({
        url: 'accounting/vouchers',
        method: 'POST',
        body: payload,
      }),
      invalidatesTags: ['Voucher', 'Ledger'], // Invalidate ledgers as balances might update
    }),
  }),
  overrideExisting: false,
});

export const { useGetNextVoucherNumberQuery, useCreateVoucherMutation } = vouchersApi;
