import { apiSlice } from '@/store/apiSlice';

export interface CreateCostCategoryRequest {
  name: string;
  alias?: string | null;
  code?: string | null;
  allocate_revenue: boolean;
  allocate_non_revenue: boolean;
}

export interface CostCategory {
  id: string;
  name: string;
  alias?: string | null;
  code?: string | null;
  display_order?: number;
  is_active: boolean;
  allocate_revenue: boolean;
  allocate_non_revenue: boolean;
  is_predefined?: boolean;
}

export interface UpdateCostCategoryRequest {
  id: string;
  name: string;
  alias?: string | null;
  code?: string | null;
  allocate_revenue: boolean;
  allocate_non_revenue: boolean;
}

export interface DeleteCostCategoryResponse {
  message?: string;
}

export const costCategoriesApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createCostCategory: build.mutation<CostCategory, CreateCostCategoryRequest>({
      query: (body) => ({
        url: 'accounting/costcategories',
        method: 'POST',
        body: {
          name: body.name,
          alias: body.alias ?? null,
          code: body.code ?? null,
          allocate_revenue: Boolean(body.allocate_revenue),
          allocate_non_revenue: Boolean(body.allocate_non_revenue),
        },
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
    getCostCategoryById: build.query<CostCategory, string>({
      query: (id) => ({
        url: `accounting/costcategories/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'CostCategory', id }],
    }),
    updateCostCategory: build.mutation<CostCategory, UpdateCostCategoryRequest>({
      query: ({ id, ...body }) => ({
        url: `accounting/costcategories/${id}`,
        method: 'PUT',
        body: {
          name: body.name,
          alias: body.alias ?? null,
          code: body.code ?? null,
          allocate_revenue: Boolean(body.allocate_revenue),
          allocate_non_revenue: Boolean(body.allocate_non_revenue),
        },
      }),
      invalidatesTags: ['CostCategory'],
    }),
    deleteCostCategory: build.mutation<DeleteCostCategoryResponse, string>({
      query: (id) => ({
        url: `accounting/costcategories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CostCategory'],
    }),
  }),
});

export const {
  useCreateCostCategoryMutation,
  useGetCostCategoriesQuery,
  useGetCostCategoryByIdQuery,
  useLazyGetCostCategoryByIdQuery,
  useUpdateCostCategoryMutation,
  useDeleteCostCategoryMutation,
} = costCategoriesApi;
