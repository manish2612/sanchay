export interface CompanyFiscalYear {
  from_date: string;
  to_date: string;
}

export interface Company {
  id: string;
  name: string;
  iso3?: string;
  no_of_decimal: number;
  registration_type?: string;
  registration_no: string;
  cin_no?: string;
  fk_country_id?: string;
  fk_state_id?: string;
  company_fiscal_years?: CompanyFiscalYear[];

  /** @deprecated */
  mailing_name?: string;
  /** @deprecated */
  fy_start_date?: string;
  /** @deprecated */
  book_start_date?: string;
  /** @deprecated */
  created_at?: string;
  /** @deprecated */
  updated_at?: string;
  /** @deprecated */
  deleted_at?: string | null;
  /** @deprecated */
  mobile_no?: string;
  /** @deprecated */
  whatsApp_no?: string;
  /** @deprecated */
  tele_no?: string;
  /** @deprecated */
  email?: string;
  /** @deprecated */
  address?: string;
  /** @deprecated */
  timezone?: string;
  /** @deprecated */
  zip_code?: string;
  /** @deprecated */
  fk_user_id?: string;
  /** @deprecated */
  last_vch_date?: string;
  /** @deprecated */
  is_active?: boolean;
}
