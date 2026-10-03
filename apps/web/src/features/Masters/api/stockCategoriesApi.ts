import { apiSlice } from '@/store/apiSlice';

export interface CreateStockCategoryRequest {
  alias: string;
  code: string;
  name: string;
  parent_id: string | null;
}

export interface StockCategory {
  id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
  is_active: boolean;
  name: string;
  alias?: string;
  code?: string;
}

export const stockCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createStockCategory: build.mutation<any, CreateStockCategoryRequest>({
      query: (body) => ({
        url: 'inventory/stockcategories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StockCategory'],
    }),
    getStockCategories: build.query<StockCategory[], void>({
      query: () => ({
        url: 'inventory/stockcategories',
        method: 'GET',
      }),
      providesTags: ['StockCategory'],
    }),
  }),
});

export const { useCreateStockCategoryMutation, useGetStockCategoriesQuery } = stockCategoriesApi;
