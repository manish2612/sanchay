import { apiSlice } from '@/store/apiSlice';

export interface CostCenterOpeningBalance {
  amount: number;
  cost_centre_id: string;
  financial_year_id: string;
  ledger_id: string;
}

export interface CreateCostCenterRequest {
  alias: string;
  code: string;
  cost_category_id: string;
  name: string;
  opening_balances: CostCenterOpeningBalance[];
  parent_id?: string | null;
}

export const costCentersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCostCenter: build.mutation<any, CreateCostCenterRequest>({
      query: (body) => ({
        url: 'accounting/costcentres',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CostCenter'],
    }),
  }),
});

export const { useCreateCostCenterMutation } = costCentersApi;
