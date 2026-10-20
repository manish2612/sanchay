import { apiSlice } from '@/store/apiSlice';

export interface GodownItem {
  id: string;
  name: string;
  alias?: string | null;
  code?: string | null;
  parent_id?: string | null;
  parent_name?: string | null;
  is_predefined?: boolean;
  is_active?: boolean;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  created_by?: string;
}

export type Godown = GodownItem;
export type GodownListItem = GodownItem;

export interface CreateGodownRequest {
  alias?: string;
  code?: string;
  name: string;
  parent_id?: string | null;
}

export interface UpdateGodownRequest {
  id: string;
  alias?: string;
  code?: string;
  name: string;
  parent_id?: string | null;
}

export interface DeleteGodownResponse {
  message?: string;
}

export const godownsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGodowns: build.query<GodownItem[], void>({
      query: () => ({
        url: 'inventory/godowns',
        method: 'GET',
      }),
      providesTags: ['Godown'],
    }),
    getGodownById: build.query<GodownItem, string>({
      query: (id) => ({
        url: `inventory/godowns/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Godown', id }],
    }),
    createGodown: build.mutation<GodownItem, CreateGodownRequest>({
      query: (body) => ({
        url: 'inventory/godowns',
        method: 'POST',
        body: {
          name: body.name,
          alias: body.alias ?? '',
          code: body.code ?? '',
          parent_id: body.parent_id ?? null,
        },
      }),
      invalidatesTags: ['Godown'],
    }),
    updateGodown: build.mutation<GodownItem, UpdateGodownRequest>({
      query: ({ id, ...body }) => ({
        url: `inventory/godowns/${id}`,
        method: 'PUT',
        body: {
          name: body.name,
          alias: body.alias ?? '',
          code: body.code ?? '',
          parent_id: body.parent_id ?? null,
        },
      }),
      invalidatesTags: ['Godown'],
    }),
    deleteGodown: build.mutation<DeleteGodownResponse, string>({
      query: (id) => ({
        url: `inventory/godowns/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Godown'],
    }),
  }),
});

export const {
  useGetGodownsQuery,
  useGetGodownByIdQuery,
  useCreateGodownMutation,
  useUpdateGodownMutation,
  useDeleteGodownMutation,
} = godownsApi;
