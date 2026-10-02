import { apiSlice } from '@/store/apiSlice';

export interface CreateCostCenterRequest {
  alias: string;
  code: string;
  cost_category_id: string;
  name: string;
  parent_id: string | null;
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
