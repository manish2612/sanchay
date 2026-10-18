import { apiSlice } from '@/store/apiSlice';
import type {
  GetTaxTypesResponse,
  GetTaxTypesRequest,
  GetTaxGroupsResponse,
  GetTaxGroupsRequest,
  CreateTaxGroupRequest,
  CreateTaxGroupResponse,
} from '@/features/Masters/types/taxGroup';

export const taxGroupsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getTaxTypes: build.query<GetTaxTypesResponse, GetTaxTypesRequest>({
      query: () => ({
        url: 'accounting/taxtypes',
        method: 'GET',
      }),
      providesTags: ['TaxType' as any],
    }),
    getTaxGroups: build.query<GetTaxGroupsResponse, GetTaxGroupsRequest>({
      query: () => ({
        url: 'accounting/taxgroups',
        method: 'GET',
      }),
      providesTags: ['TaxGroup' as any],
    }),
    createTaxGroup: build.mutation<CreateTaxGroupResponse, CreateTaxGroupRequest>({
      query: (body) => ({
        url: 'accounting/taxgroups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TaxGroup' as any],
    }),
  }),
});

export const {
  useGetTaxTypesQuery,
  useGetTaxGroupsQuery,
  useCreateTaxGroupMutation,
} = taxGroupsApi;
