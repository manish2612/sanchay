import { apiSlice } from '@/store/apiSlice';

export interface CurrencyInfo {
  id: string;
  name: string;
  symbol: string;
}

export interface StateInfo {
  id: string;
  name: string;
  code: string;
  numcode: string;
}

export interface Country {
  id: string;
  name: string;
  iso3: string;
  numcode: number;
  currency_info: CurrencyInfo;
  state_info: StateInfo[];
}

export interface Timezone {
  name: string;
  representative_region: string;
  utc_offset: string;
}

export interface GlobalMastersResponse {
  countries: Country[];
  timezones: Timezone[];
}

export const globalMastersApi = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    getGlobalMasters: build.query<GlobalMastersResponse, void>({
      query: () => ({
        url: '/global/globalmasters',
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useGetGlobalMastersQuery } = globalMastersApi;
