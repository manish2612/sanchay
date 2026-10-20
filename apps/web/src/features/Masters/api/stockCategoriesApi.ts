import { apiSlice } from '@/store/apiSlice';

export interface CreateStockCategoryRequest {
  alias: string;
  code: string;
  name: string;
  parent_id: string | null;
  parent_name?: string | null;
  is_predefined?: boolean;
}

export interface UpdateStockCategoryRequest {
  id: string;
  alias?: string | null;
  code?: string | null;
  name?: string;
  parent_id?: string | null;
  parent_name?: string | null;
  is_active?: boolean;
  is_predefined?: boolean;
}

export interface StockCategory {
  id: string;
  name: string;
  alias?: string | null;
  code?: string | null;
  parent_id?: string | null;
  parent_name?: string | null;
  is_active?: boolean;
  is_predefined?: boolean;
  display_order?: number;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  created_by?: string;
}

export const stockCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStockCategories: build.query<StockCategory[], void>({
      query: () => ({
        url: 'inventory/stockcategories',
        method: 'GET',
      }),
      providesTags: ['StockCategory'],
    }),
    getStockCategoryById: build.query<StockCategory, string>({
      query: (id) => ({
        url: `inventory/stockcategories/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'StockCategory', id }],
    }),
    createStockCategory: build.mutation<StockCategory, CreateStockCategoryRequest>({
      query: (body) => ({
        url: 'inventory/stockcategories',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StockCategory'],
    }),
    updateStockCategory: build.mutation<StockCategory, UpdateStockCategoryRequest>({
      query: ({ id, ...body }) => ({
        url: `inventory/stockcategories/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['StockCategory'],
    }),
    deleteStockCategory: build.mutation<{ message: string }, string>({
      query: (id) => ({
        url: `inventory/stockcategories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StockCategory'],
    }),
  }),
});

export const {
  useGetStockCategoriesQuery,
  useGetStockCategoryByIdQuery,
  useCreateStockCategoryMutation,
  useUpdateStockCategoryMutation,
  useDeleteStockCategoryMutation,
} = stockCategoriesApi;
