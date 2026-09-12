import { apiSlice } from '@/store/apiSlice';

export interface CurrencyInfo {
  id: string;
  fk_country_id: string;
  name: string;
  symbol: string;
  is_active: boolean; // Will be removed in future
}

export interface StateInfo {
  id: string;
  fk_country_id: string; // Will be removed in future
  name: string;
  code: string;
  numcode: string;
  is_active: boolean; // Will be removed in future
}

export interface Country {
  id: string;
  iso: string; // Will be removed in future
  name: string;
  iso3: string;
  numcode: number;
  is_active: boolean; // Will be removed in future
  currency_info: CurrencyInfo;
  state_info: StateInfo[];
}

export interface Timezone {
  id: string;
  name: string;
  utc_offset: string; // Will be removed in future
  raw_offset_seconds: number; // Will be removed in future
  abbreviation: string; // Will be removed in future
  representative_region: string; // Will be removed in future
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
