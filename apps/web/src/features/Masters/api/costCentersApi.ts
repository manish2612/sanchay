import { apiSlice } from '@/store/apiSlice';

export interface CostCenterOpeningBalance {
  amount: number;
  cost_centre_id: string;
  financial_year_id: string;
  ledger_id: string;
}

export interface CostCenterListItem {
  id: string;
  is_active: boolean;
  name: string;
  display_order: number;
  cost_category_name: string;
  is_predefined?: boolean;
}

export interface CostCenterDetail {
  id: string;
  name: string;
  alias?: string | null;
  code?: string | null;
  display_order?: number;
  is_active: boolean;
  cost_category_name?: string;
  cost_category_id?: string;
  parent_name?: string | null;
  parent_id?: string | null;
  opening_balances?: CostCenterOpeningBalance[];
  is_predefined?: boolean;
}

export interface CreateCostCenterRequest {
  name: string;
  alias?: string;
  code?: string;
  cost_category_id: string;
  parent_id?: string | null;
  opening_balances?: CostCenterOpeningBalance[];
}

export interface UpdateCostCenterRequest {
  id: string;
  name: string;
  alias?: string;
  code?: string;
  cost_category_id: string;
  parent_id?: string | null;
  opening_balances?: CostCenterOpeningBalance[];
}

export interface DeleteCostCenterResponse {
  message?: string;
}

export const costCentersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCostCenters: build.query<CostCenterListItem[], void>({
      query: () => ({
        url: 'accounting/costcentres',
        method: 'GET',
      }),
      providesTags: ['CostCenter'],
    }),
    getCostCenterById: build.query<CostCenterDetail, string>({
      query: (id) => ({
        url: `accounting/costcentres/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'CostCenter', id }],
    }),
    createCostCenter: build.mutation<CostCenterDetail, CreateCostCenterRequest>({
      query: (body) => ({
        url: 'accounting/costcentres',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CostCenter'],
    }),
    updateCostCenter: build.mutation<CostCenterDetail, UpdateCostCenterRequest>({
      query: ({ id, ...body }) => ({
        url: `accounting/costcentres/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['CostCenter'],
    }),
    deleteCostCenter: build.mutation<DeleteCostCenterResponse, string>({
      query: (id) => ({
        url: `accounting/costcentres/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CostCenter'],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetCostCentersQuery,
  useGetCostCenterByIdQuery,
  useLazyGetCostCenterByIdQuery,
  useCreateCostCenterMutation,
  useUpdateCostCenterMutation,
  useDeleteCostCenterMutation,
} = costCentersApi;
