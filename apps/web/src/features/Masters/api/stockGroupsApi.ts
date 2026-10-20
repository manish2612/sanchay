import { apiSlice } from '@/store/apiSlice';

export interface CreateStockGroupRequest {
  name: string;
  alias?: string | null;
  code?: string | null;
  parent_id?: string | null;
  global_purchase_ledger_id?: string | null;
  global_sales_ledger_id?: string | null;
  local_purchase_ledger_id?: string | null;
  local_sales_ledger_id?: string | null;
}

export interface UpdateStockGroupRequest {
  id: string;
  name: string;
  alias?: string | null;
  code?: string | null;
  parent_id?: string | null;
  global_purchase_ledger_id?: string | null;
  global_sales_ledger_id?: string | null;
  local_purchase_ledger_id?: string | null;
  local_sales_ledger_id?: string | null;
}

export interface StockGroupItem {
  id: string;
  name: string;
  code?: string | null;
  alias?: string | null;
  parent_id?: string | null;
  parent_name?: string | null;
  global_purchase_ledger_id?: string | null;
  global_sales_ledger_id?: string | null;
  local_purchase_ledger_id?: string | null;
  local_sales_ledger_id?: string | null;
  is_taxable?: boolean;
  is_active?: boolean;
  is_predefined?: boolean;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  created_by?: string;
}

export type StockGroup = StockGroupItem;

export interface DeleteStockGroupResponse {
  message?: string;
}

export const stockGroupsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStockGroups: build.query<StockGroupItem[], void>({
      query: () => ({
        url: 'inventory/stockgroups',
        method: 'GET',
      }),
      providesTags: ['StockGroup'],
    }),
    getStockGroupById: build.query<StockGroupItem, string>({
      query: (id) => ({
        url: `inventory/stockgroups/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'StockGroup', id }],
    }),
    createStockGroup: build.mutation<StockGroupItem, CreateStockGroupRequest>({
      query: (body) => ({
        url: 'inventory/stockgroups',
        method: 'POST',
        body: {
          name: body.name,
          alias: body.alias || '',
          code: body.code || '',
          parent_id: body.parent_id || null,
          global_purchase_ledger_id: body.global_purchase_ledger_id || null,
          global_sales_ledger_id: body.global_sales_ledger_id || null,
          local_purchase_ledger_id: body.local_purchase_ledger_id || null,
          local_sales_ledger_id: body.local_sales_ledger_id || null,
        },
      }),
      invalidatesTags: ['StockGroup'],
    }),
    updateStockGroup: build.mutation<StockGroupItem, UpdateStockGroupRequest>({
      query: ({ id, ...body }) => ({
        url: `inventory/stockgroups/${id}`,
        method: 'PUT',
        body: {
          name: body.name,
          alias: body.alias || '',
          code: body.code || '',
          parent_id: body.parent_id || null,
          global_purchase_ledger_id: body.global_purchase_ledger_id || null,
          global_sales_ledger_id: body.global_sales_ledger_id || null,
          local_purchase_ledger_id: body.local_purchase_ledger_id || null,
          local_sales_ledger_id: body.local_sales_ledger_id || null,
        },
      }),
      invalidatesTags: ['StockGroup'],
    }),
    deleteStockGroup: build.mutation<DeleteStockGroupResponse, string>({
      query: (id) => ({
        url: `inventory/stockgroups/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StockGroup'],
    }),
  }),
});

export const {
  useGetStockGroupsQuery,
  useGetStockGroupByIdQuery,
  useCreateStockGroupMutation,
  useUpdateStockGroupMutation,
  useDeleteStockGroupMutation,
} = stockGroupsApi;
