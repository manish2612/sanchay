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

export interface LedgerOpeningBalance {
  amount: number;
  cost_centre_id: string;
  financial_year_id: string;
  id: string;
  ledger_id: string;
}

export interface Ledger {
  id: string;
  name: string;
  code?: string;
  category?: string;
  sub_category?: string;
  parent_id?: string | null;
  grand_parent_id?: string | null;
  is_cost_entre_enabled?: boolean;
  is_cost_centre_enabled?: boolean;
  is_bill_wise_enabled?: boolean;
  block_sales_on_credit_limit_exceed?: boolean;
  credit_period_days?: number;
  credit_limit_amount?: string | number;
  opening_balance?: string | number;
  is_predefined?: boolean;
  tax_rates?: TaxRate[];
  tax_type?: string;
  opening_balances?: LedgerOpeningBalance[];
}

export interface LedgerDecoratedItem extends Ledger {
  parent_name?: string;
}

export type GetLedgersResponse = Ledger[];
export type GetLedgersRequest = void;

export interface DeleteLedgerResponse {
  message: string;
}

export interface UpdateLedgerRequest {
  id: string;
  body: Partial<CreateLedgerRequest>;
}

export interface LedgerBankDetail {
  account_holder_name: string;
  account_number: string;
  bank_name: string;
  beneficiary_code: string;
  branch_name: string;
  routing_code: string;
  swift_code: string;
}

export interface LedgerTaxRatePayload {
  applicability: string;
  effective_from: string;
  effective_to?: string;
  excise_tax_group_id: string | null;
  tax_group_id: string;
  tax_rate: number;
}

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
  bank_detail?: LedgerBankDetail;
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
  tax_rates: LedgerTaxRatePayload[];
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
