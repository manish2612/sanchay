import { apiSlice } from '@/store/apiSlice';

export interface CreateStockUnitRequest {
  code: string;
  decimal_places: number;
  name: string;
  symbol: string;
  uqc_code: string;
}

export interface StockUnit {
  id: string;
  decimal_places: number;
  name: string;
  symbol: string;
  uqc_code: string;
  is_active?: boolean;
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
    getStockUnits: build.query<StockUnit[], void>({
      query: () => ({
        url: 'inventory/stockunits',
        method: 'GET',
      }),
      providesTags: ['StockUnit'],
    }),
  }),
});

export const { useCreateStockUnitMutation, useGetStockUnitsQuery } = stockUnitsApi;

