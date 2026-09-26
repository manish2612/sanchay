import { apiSlice } from '@/store/apiSlice';
import type { GetVoucherTypesRequest, GetVoucherTypesResponse } from './types';

export const voucherTypeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getVoucherTypes: build.query<GetVoucherTypesResponse, GetVoucherTypesRequest>({
      query: () => ({
        url: 'accounting/vouchertypes',
        method: 'GET',
      }),
      providesTags: ['VoucherType'],
    }),
  }),
});

export const { useGetVoucherTypesQuery } = voucherTypeApi;
