import { apiSlice } from '@/store/apiSlice';

export interface CreateGroupRequest {
  alias: string;
  code: string;
  name: string;
  parent_id: string | null;
}

export interface Group {
  id: string;
  is_active: boolean;
  name: string;
  alias?: string;
  classification?: string;
  category?: string;
  sub_category?: string;
  display_order: number;
  trial_balance_order?: number;
  is_predefined?: boolean;
  parent_name?: string | null;
  primary_group_name?: string | null;
}

export interface GroupDetail extends Group {
  code?: string;
  parent_name?: string | null;
  primary_group_name?: string | null;
  use_for_hsg?: boolean;
}

export interface UpdateGroupRequest {
  id: string;
  alias: string;
  code?: string;
  name: string;
  parent_id: string | null;
}

export interface DeleteGroupResponse {
  message: string;
}

export const groupsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createGroup: build.mutation<any, CreateGroupRequest>({
      query: (body) => ({
        url: 'accounting/groups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Group'],
    }),
    getGroups: build.query<Group[], void>({
      query: () => ({
        url: 'accounting/groups',
        method: 'GET',
      }),
      providesTags: ['Group'],
    }),
    getGroupById: build.query<GroupDetail, string>({
      query: (id) => ({
        url: `accounting/groups/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'Group', id }],
    }),
    updateGroup: build.mutation<Group, UpdateGroupRequest>({
      query: ({ id, ...body }) => ({
        url: `accounting/groups/${id}`,
        method: 'PUT',
        body: {
          alias: body.alias ?? null,
          code: body.code ?? null,
          name: body.name,
          parent_id: body.parent_id ?? null,
        },
      }),
      invalidatesTags: ['Group'],
    }),
    deleteGroup: build.mutation<DeleteGroupResponse, string>({
      query: (id) => ({
        url: `accounting/groups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Group'],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  useLazyGetGroupByIdQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupsApi;
