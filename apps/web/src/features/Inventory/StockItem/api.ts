import { apiSlice } from '@/store/apiSlice';
import type { CreateStockItemPayload, StockItemResponse } from './types';

export const stockItemsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createStockItem: build.mutation<StockItemResponse, CreateStockItemPayload>({
      query: (body) => ({
        url: 'inventory/stockitems',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StockItem'],
    }),
  }),
});

export const { useCreateStockItemMutation } = stockItemsApi;
