import { apiSlice } from '@/store/apiSlice';

export interface CreateCostCategoryRequest {
  alias: string;
  allocate_non_revenue: boolean;
  allocate_revenue: boolean;
  code: string;
  name: string;
}

export interface CostCategory {
  id: string;
  name: string;
  alias?: string;
  code?: string;
  display_order: number;
  is_active: boolean;
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
    getCostCategories: build.query<CostCategory[], void>({
      query: () => ({
        url: 'accounting/costcategories',
        method: 'GET',
      }),
      providesTags: ['CostCategory'],
    }),
  }),
});

export const { useCreateCostCategoryMutation, useGetCostCategoriesQuery } = costCategoriesApi;
