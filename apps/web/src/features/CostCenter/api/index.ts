import { apiSlice } from '@/store/apiSlice';

export interface CostCategory {
  id: string;
  is_active: boolean;
  name: string;
  allocate_revenue: boolean;
  allocate_non_revenue: boolean;
  display_order: number;
}

export interface CostCenter {
  id: string;
  is_active: boolean;
  name: string;
  display_order: number;
  cost_category_name: string;
}

export const costCenterApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getCostCategories: build.query<CostCategory[], void>({
      query: () => ({
        url: 'accounting/costcategories',
        method: 'GET',
      }),
      providesTags: ['CostCategory'],
    }),
    getCostCenters: build.query<CostCenter[], void>({
      query: () => ({
        url: 'accounting/costcentres',
        method: 'GET',
      }),
      providesTags: ['CostCenter'],
    }),
  }),
  overrideExisting: false,
});

export const { useGetCostCategoriesQuery, useGetCostCentersQuery } = costCenterApi;
