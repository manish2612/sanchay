import { apiSlice } from '@/store/apiSlice';

export interface CreateStockUnitRequest {
  code: string;
  decimal_places: number;
  name: string;
  symbol: string;
  uqc_code: string;
  is_predefined?: boolean;
}

export interface StockUnit {
  id: string;
  decimal_places: number;
  name: string;
  symbol: string;
  uqc_code: string;
  is_active?: boolean;
  is_predefined?: boolean;
}

export const stockUnitsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createStockUnit: build.mutation<StockUnit, CreateStockUnitRequest>({
      query: (body) => ({
        url: 'inventory/stockunits',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StockUnit'],
    }),
    getStockUnits: build.query<StockUnit[], void>({
      query: () => ({
        url: 'inventory/stockunits',
        method: 'GET',
      }),
      providesTags: ['StockUnit'],
    }),
    getStockUnitById: build.query<StockUnit, string>({
      query: (id) => ({
        url: `inventory/stockunits/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'StockUnit', id }],
    }),
    updateStockUnit: build.mutation<StockUnit, { id: string; data: Partial<CreateStockUnitRequest> }>({
      query: ({ id, data }) => ({
        url: `inventory/stockunits/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['StockUnit'],
    }),
    deleteStockUnit: build.mutation<{ message?: string } | void, string>({
      query: (id) => ({
        url: `inventory/stockunits/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StockUnit'],
    }),
  }),
});

export const {
  useCreateStockUnitMutation,
  useGetStockUnitsQuery,
  useGetStockUnitByIdQuery,
  useUpdateStockUnitMutation,
  useDeleteStockUnitMutation,
} = stockUnitsApi;

