import { apiSlice } from '@/store/apiSlice';

export interface CreateStockGroupRequest {
  alias: string;
  code: string;
  export_sales_ledger_id: string;
  import_purchase_ledger_id: string;
  is_taxable: boolean;
  local_purchase_ledger_id: string;
  local_sales_ledger_id: string;
  name: string;
  parent_id: string | null;
}

export interface StockGroup {
  id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
  is_active: boolean;
  name: string;
  is_taxable: boolean;
}

export const stockGroupsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createStockGroup: build.mutation<any, CreateStockGroupRequest>({
      query: (body) => ({
        url: 'inventory/stockgroups',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StockGroup'],
    }),
    getStockGroups: build.query<StockGroup[], void>({
      query: () => ({
        url: 'inventory/stockgroups',
        method: 'GET',
      }),
      providesTags: ['StockGroup'],
    }),
  }),
});

export const { useCreateStockGroupMutation, useGetStockGroupsQuery } = stockGroupsApi;
