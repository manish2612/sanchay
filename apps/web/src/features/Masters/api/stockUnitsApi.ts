import { apiSlice } from '@/store/apiSlice';

export interface CreateStockUnitRequest {
  code: string;
  decimal_places: number;
  name: string;
  symbol: string;
  uqc_code: string;
}

export const stockUnitsApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    createStockUnit: build.mutation<any, CreateStockUnitRequest>({
      query: (body) => ({
        url: 'inventory/stockunits',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['StockUnit'],
    }),
  }),
});

export const { useCreateStockUnitMutation } = stockUnitsApi;
