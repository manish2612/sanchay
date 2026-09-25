export interface CompanyFiscalYear {
  from_date: string;
  to_date: string;
}

export interface LoginCompany {
  id: string;
  name: string;
  iso3?: string;
  decimal_places: number;
  registration_type: string;
  tax_identifier: string;
  cin_number: string;
  country_id: string;
  state_id: string;
  company_fiscal_years: CompanyFiscalYear[];
}

export interface DetailedCompany {
  id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
  name: string;
  trade_name: string;
  mailing_name: string;
  fy_start_date: string;
  book_start_date: string;
  decimal_places: number;
  mobile_number: string;
  whatsapp_number: string;
  telephone_number: string;
  email: string;
  registration_type: string;
  tax_identifier: string;
  cin_number: string;
  pan_number: string;
  address: string;
  city: string;
  state_id: string;
  country_id: string;
  postal_code: string;
  timezone: string;
  owner_user_id: string;
  settings: Record<string, boolean>;
  last_voucher_date: string;
  is_active: boolean;
  state: any;
  country: any;
  fiscal_years: CompanyFiscalYear[];
}

export type Company = LoginCompany | DetailedCompany;
