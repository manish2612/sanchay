import { apiSlice } from '@/store/apiSlice';
import type { 
  GetVoucherTypesRequest, 
  GetVoucherTypesResponse,
  CreateVoucherTypeRequest,
  CreateVoucherTypeResponse
} from './types';

export const voucherTypeApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getVoucherTypes: build.query<GetVoucherTypesResponse, GetVoucherTypesRequest>({
      query: () => ({
        url: 'accounting/vouchertypes',
        method: 'GET',
      }),
      providesTags: ['VoucherType'],
    }),
    createVoucherType: build.mutation<CreateVoucherTypeResponse, CreateVoucherTypeRequest>({
      query: (body) => ({
        url: 'accounting/vouchertypes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VoucherType'],
    }),
  }),
});

export const { useGetVoucherTypesQuery, useCreateVoucherTypeMutation } = voucherTypeApi;
