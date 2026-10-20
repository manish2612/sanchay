import { apiSlice } from '@/store/apiSlice';
import type {
  CreateStockItemPayload,
  StockItemResponse,
  StockItemListItem,
  DeleteStockItemResponse,
} from './types';

export const stockItemsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getStockItems: build.query<StockItemListItem[], void>({
      query: () => ({
        url: 'inventory/stockitems',
        method: 'GET',
      }),
      providesTags: ['StockItem'],
    }),
    getStockItemById: build.query<StockItemResponse, string>({
      query: (id) => ({
        url: `inventory/stockitems/${id}`,
        method: 'GET',
      }),
      providesTags: (_result, _error, id) => [{ type: 'StockItem', id }],
    }),
    createStockItem: build.mutation<StockItemResponse, CreateStockItemPayload>({
      query: (body) => ({
        url: 'inventory/stockitems',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StockItem'],
    }),
    updateStockItem: build.mutation<StockItemResponse, { id: string; data: Partial<CreateStockItemPayload> }>({
      query: ({ id, data }) => ({
        url: `inventory/stockitems/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['StockItem'],
    }),
    deleteStockItem: build.mutation<DeleteStockItemResponse, string>({
      query: (id) => ({
        url: `inventory/stockitems/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['StockItem'],
    }),
  }),
});

export const {
  useGetStockItemsQuery,
  useGetStockItemByIdQuery,
  useCreateStockItemMutation,
  useUpdateStockItemMutation,
  useDeleteStockItemMutation,
} = stockItemsApi;

