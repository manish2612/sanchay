import { apiSlice } from '@/store/apiSlice';
import type {
  GetVoucherTypesRequest,
  GetVoucherTypesResponse,
  CreateVoucherTypeRequest,
  CreateVoucherTypeResponse,
  VoucherType,
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
    getVoucherTypeById: build.query<VoucherType, string>({
      query: (id) => ({
        url: `accounting/vouchertypes/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'VoucherType', id }],
    }),
    createVoucherType: build.mutation<CreateVoucherTypeResponse, CreateVoucherTypeRequest>({
      query: (body) => ({
        url: 'accounting/vouchertypes',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['VoucherType'],
    }),
    updateVoucherType: build.mutation<VoucherType, { id: string; body: CreateVoucherTypeRequest }>({
      query: ({ id, body }) => ({
        url: `accounting/vouchertypes/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['VoucherType'],
    }),
    deleteVoucherType: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `accounting/vouchertypes/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['VoucherType'],
    }),
  }),
});

export const {
  useGetVoucherTypesQuery,
  useGetVoucherTypeByIdQuery,
  useCreateVoucherTypeMutation,
  useUpdateVoucherTypeMutation,
  useDeleteVoucherTypeMutation,
} = voucherTypeApi;
