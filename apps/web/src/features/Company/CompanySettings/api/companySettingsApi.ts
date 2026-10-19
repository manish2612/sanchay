import { apiSlice } from '@/store/apiSlice';
import { CompanySettingsResponse, UpdateCompanySettingsArgs } from '../types';

export const companySettingsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanySettings: builder.query<CompanySettingsResponse, string>({
      query: (companyId) => ({
        url: `core/companies/${companyId}/settings`,
        method: 'GET',
      }),
      providesTags: (result, error, companyId) => [
        { type: 'CompanySettings' as const, id: companyId },
      ],
    }),

    updateCompanySettings: builder.mutation<CompanySettingsResponse, UpdateCompanySettingsArgs>({
      query: ({ companyId, settings }) => ({
        url: `core/companies/${companyId}/settings`,
        method: 'PUT',
        body: settings,
      }),
      invalidatesTags: (result, error, { companyId }) => [
        { type: 'CompanySettings' as const, id: companyId },
      ],
    }),
  }),
});

export const {
  useGetCompanySettingsQuery,
  useUpdateCompanySettingsMutation,
} = companySettingsApi;
