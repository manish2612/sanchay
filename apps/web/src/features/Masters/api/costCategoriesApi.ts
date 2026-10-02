import { apiSlice } from '@/store/apiSlice';

export interface CreateCostCategoryRequest {
  alias: string;
  allocate_non_revenue: boolean;
  allocate_revenue: boolean;
  code: string;
  name: string;
}

export const costCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCostCategory: build.mutation<any, CreateCostCategoryRequest>({
      query: (body) => ({
        url: 'accounting/costcategories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['CostCategory'],
    }),
  }),
});

export const { useCreateCostCategoryMutation } = costCategoriesApi;
