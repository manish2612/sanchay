export interface Company {
  id: string;
  name: string;
  mailing_name: string;
  no_of_decimal: number;
  registration_no: string;
  fy_start_date?: string;
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
  registration_type?: string;
  /** @deprecated */
  cin_no?: string;
  /** @deprecated */
  address?: string;
  /** @deprecated */
  fk_country_id?: string;
  /** @deprecated */
  fk_state_id?: string;
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
  /** @deprecated */
  company_fiscal_years?: any;
}
