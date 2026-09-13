import { apiSlice } from '@/store/apiSlice';
import { Company } from '@/types/models/Company';

export interface CompanyFiscalYear {
  from_date: string;
  sr_no: number;
  to_date: string;
}

export interface CreateCompanyRequest {
  address?: string;
  book_start_date: string;
  cin_no?: string;
  company_fiscal_years: CompanyFiscalYear[];
  email?: string;
  fk_country_currency_id?: string;
  fk_country_id: string;
  fk_state_id: string;
  fy_start_date: string;
  mailing_name: string;
  mobile_no?: string;
  name: string;
  no_of_decimal: number;
  registration_no?: string;
  registration_type?: string;
  tele_no?: string;
  timezone: string;
  whatsApp_no?: string;
  zip_code?: string;
}

export type CreateCompanyResponse = Company;

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
