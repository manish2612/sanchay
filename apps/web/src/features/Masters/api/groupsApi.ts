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
  display_order: number;
  trial_balance_order?: number;
  is_predefined?: boolean;
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
  }),
});

export const { useCreateGroupMutation, useGetGroupsQuery } = groupsApi;
