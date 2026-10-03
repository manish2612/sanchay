import { apiSlice } from '@/store/apiSlice';

export interface CreateGodownRequest {
  alias: string;
  code: string;
  name: string;
  parent_id: string | null;
}

export interface Godown {
  id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
  is_active: boolean;
  name: string;
  is_predefined: boolean;
}

export const godownsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createGodown: build.mutation<any, CreateGodownRequest>({
      query: (body) => ({
        url: 'inventory/godowns',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Godown'],
    }),
    getGodowns: build.query<Godown[], void>({
      query: () => ({
        url: 'inventory/godowns',
        method: 'GET',
      }),
      providesTags: ['Godown'],
    }),
  }),
});

export const { useCreateGodownMutation, useGetGodownsQuery } = godownsApi;
