import { apiSlice } from '@/store/apiSlice';
import type {
  GetTaxTypesResponse,
  GetTaxTypesRequest,
  GetTaxGroupsResponse,
  GetTaxGroupsRequest,
  CreateTaxGroupRequest,
  CreateTaxGroupResponse,
  UpdateTaxGroupRequest,
  UpdateTaxGroupResponse,
  DeleteTaxGroupResponse,
  TaxGroupResponse,
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
    getTaxGroupById: build.query<TaxGroupResponse, string>({
      query: (id) => ({
        url: `accounting/taxgroups/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'TaxGroup' as any, id }],
    }),
    createTaxGroup: build.mutation<CreateTaxGroupResponse, CreateTaxGroupRequest>({
      query: (body) => ({
        url: 'accounting/taxgroups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['TaxGroup' as any],
    }),
    updateTaxGroup: build.mutation<UpdateTaxGroupResponse, UpdateTaxGroupRequest>({
      query: ({ id, ...body }) => ({
        url: `accounting/taxgroups/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['TaxGroup' as any],
    }),
    deleteTaxGroup: build.mutation<DeleteTaxGroupResponse, string>({
      query: (id) => ({
        url: `accounting/taxgroups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['TaxGroup' as any],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetTaxTypesQuery,
  useGetTaxGroupsQuery,
  useGetTaxGroupByIdQuery,
  useCreateTaxGroupMutation,
  useUpdateTaxGroupMutation,
  useDeleteTaxGroupMutation,
} = taxGroupsApi;
