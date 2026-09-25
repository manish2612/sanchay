import { apiSlice } from '@/store/apiSlice';
import { DetailedCompany } from '@/types/models/Company';

export interface CompanyFiscalYear {
  from_date: string;
  to_date: string;
}

export interface CreateCompanyRequest {
  address?: string;
  book_start_date: string;
  cin_number?: string;
  city?: string;
  country_currency_id?: string;
  country_id: string;
  decimal_places?: number; // or number based on backend expectation
  email?: string;
  fiscal_years: CompanyFiscalYear[];
  fy_start_date: string;
  mailing_name: string;
  mobile_number?: string;
  name: string;
  pan_number?: string;
  postal_code?: string;
  registration_type?: string;
  state_id: string;
  tax_identifier?: string;
  telephone_number?: string;
  timezone: string;
  trade_name?: string;
  whatsapp_number?: string;
}

export type CreateCompanyResponse = DetailedCompany;

export const companyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCompany: builder.mutation<CreateCompanyResponse, CreateCompanyRequest>({
      query: (body) => ({
        url: '/core/companies',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useCreateCompanyMutation } = companyApi;
