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
  is_bill_wise_enabled: boolean;
  block_sales_on_credit_limit_exceed: boolean;
  credit_period_days: number;
  credit_limit_amount: string;
  opening_balance: string;
  is_predefined: boolean;
  tax_rates: TaxRate[];
}

export type GetLedgersResponse = Ledger[];
export type GetLedgersRequest = void;
