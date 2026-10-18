export interface TaxComponent {
  taxgroup_component_name: string;
  taxgroup_component_scope: string;
  taxgroup_component_compute_method: string;
  taxgroup_component_rate: string;
  input_ledger_id: string;
  output_ledger_id: string;
  input_ledger_name: string;
  output_ledger_name: string;
}

export interface TaxGroup {
  taxgroup_name: string;
  taxgroup_code: string;
  taxgroup_combined_rate: string;
  tax_component: TaxComponent[];
}

export interface TaxRate {
  effective_from: string;
  applicability: string;
  tax_rate: string;
  tax_group: TaxGroup[];
}

export interface Ledger {
  id: string;
  name: string;
  code: string;
  is_cost_entre_enabled: boolean;
  is_cost_centre_enabled?: boolean;
  is_bill_wise_enabled: boolean;
  block_sales_on_credit_limit_exceed: boolean;
  credit_period_days: number;
  credit_limit_amount: string;
  opening_balance: string;
  is_predefined: boolean;
  tax_rates: TaxRate[];
  sub_category?: string;
}

export type GetLedgersResponse = Ledger[];
export type GetLedgersRequest = void;

export interface StockGroup {
  id: string;
  company_id: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  created_by: string;
  is_active: boolean;
  name: string;
  is_taxable: boolean;
}

export type GetStockGroupsResponse = StockGroup[];
export type GetStockGroupsRequest = void;

export interface CreateLedgerRequest {
  account_group_id: string | null;
  address: {
    address: string | null;
    city: string;
    country_id: string | null;
    postal_code: string | null;
    state_id: string | null;
  };
  alias: string;
  block_sales_on_credit_limit_exceed: boolean;
  code: string;
  contact: {
    cin_number: string;
    contact_person: string | null;
    description: string;
    email: string | null;
    mobile_number: string | null;
    registration_type: string | null;
    tax_identifier: string | null;
    telephone_number: string | null;
    whatsapp_number: string | null;
  };
  credit_limit_amount: number;
  credit_period_days: number;
  is_bill_wise_enabled: boolean;
  is_cost_centre_enabled: boolean;
  name: string;
  opening_balance: number;
  opening_balance_type: string;
  opening_balances: {
    amount: number;
    cost_centre_id: string;
    financial_year_id: string;
    ledger_id: string;
  }[];
  tax_rates: any[];
  tax_type_id: string | null;
}

export interface CreateLedgerResponse {
  block_sales_on_credit_limit_exceed: boolean;
  code: string;
  credit_limit_amount: number;
  credit_period_days: number;
  grand_parent_id: string;
  id: string;
  is_bill_wise_enabled: boolean;
  is_cost_centre_enabled: boolean;
  is_party_ledger: boolean;
  is_predefined: boolean;
  name: string;
  opening_balance: number;
  parent_id: string;
  tax_rates: any[];
}
