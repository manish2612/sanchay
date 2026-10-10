export interface VoucherTypeNumberingInfoRes {
  numbering_type: string;
  reset_on: string;
  prefix: string;
  suffix: string;
  effective_from: string;
  starting_number: number;
  prefill_padding: number;
}

export interface VoucherTypeTaxComponent {
  taxgroup_component_name: string;
  taxgroup_component_scope: string;
  taxgroup_component_compute_method: string;
  taxgroup_component_rate: string;
  input_ledger_id: string;
  output_ledger_id: string;
}

export interface VoucherTypeTaxGroup {
  taxgroup_name: string;
  taxgroup_code: string;
  taxgroup_combined_rate: string;
  tax_component: VoucherTypeTaxComponent[];
}

export interface VoucherTypeTaxRate {
  effective_from: string;
  applicability: string;
  tax_rate: string;
  tax_group: VoucherTypeTaxGroup[];
}

export interface VoucherTypeDefaultLedger {
  id: string;
  name: string;
  code: string;
  parent_id: string;
  is_cost_centre_enabled: boolean;
  is_bill_wise_enabled: boolean;
  block_sales_on_credit_limit_exceed: boolean;
  credit_period_days: number;
  credit_limit_amount: string;
  opening_balance: string;
  is_party_ledger: boolean;
  is_predefined: boolean;
  tax_rates: VoucherTypeTaxRate[];
}

export interface VoucherType {
  id: string;
  is_active: boolean;
  name: string;
  category: string;
  apply_tax: string;
  apply_disc_bill: boolean;
  apply_disc_item: boolean;
  is_excise_appl: boolean;
  print_after_save: boolean;
  create_mode_after_save: boolean;
  view_mode: string;
  is_set_as_default: boolean;
  allow_zero_value_item: boolean;
  allow_zero_value_ledger: boolean;
  voucher_mode: string;
  posting_affects: string;
  printing_config: boolean;
  page_size: string;
  page_orientation: string;
  page_width: number;
  page_height: number;
  top_margin: number;
  bottom_margin: number;
  left_margin: number;
  right_margin: number;
  no_of_copies: number;
  print_format: string;
  is_pos_mode: boolean;
  free_qty_column: boolean;
  alt_qty_olumn: boolean;
  rate_column: boolean;
  net_rate_column: boolean;
  gross_column: boolean;
  use_for_hsg_society: boolean;
  is_tax_applicable: boolean;
  is_predefined: boolean;
  numbering_info?: VoucherTypeNumberingInfoRes[];
  default_cash_ledger?: VoucherTypeDefaultLedger;
  default_local_trade_ledger?: VoucherTypeDefaultLedger;
  default_global_trade_ledger?: VoucherTypeDefaultLedger;
  default_discount_ledger?: VoucherTypeDefaultLedger;
  default_roundoff_ledger?: VoucherTypeDefaultLedger;
}

export type GetVoucherTypesResponse = VoucherType[];
export type GetVoucherTypesRequest = void;

export interface VoucherTypeNumberingInfo {
  effective_from: string;
  numbering_type: string;
  prefill_padding: number;
  prefix: string;
  reset_on: string;
  starting_number: number;
  suffix: string;
  voucher_type_id: string;
}

export interface CreateVoucherTypeRequest {
  allow_zero_value_item: boolean;
  allow_zero_value_ledger: boolean;
  alt_qty_olumn: boolean;
  apply_disc_bill: boolean;
  apply_disc_item: boolean;
  apply_tax: string;
  bottom_margin: number;
  category: string;
  code: string;
  create_mode_after_save: boolean;
  declaration: string;
  default_bank_ledger_id: string | null;
  default_cash_ledger_id: string | null;
  default_discount_ledger_id: string | null;
  default_global_trade_ledger_id: string | null;
  default_local_trade_ledger_id: string | null;
  default_roundoff_ledger_id: string | null;
  free_qty_column: boolean;
  gross_column: boolean;
  is_excise_appl: boolean;
  is_pos_mode: boolean;
  is_predefined: boolean;
  is_set_as_default: boolean;
  is_tax_applicable: boolean;
  left_margin: number;
  name: string;
  net_rate_column: boolean;
  no_of_copies: number;
  page_height: number;
  page_orientation: string;
  page_size: string;
  page_width: number;
  parent_id: string;
  print_after_save: boolean;
  print_format: string;
  printing_config: boolean;
  rate_column: boolean;
  right_margin: number;
  top_margin: number;
  use_for_hsg_society: boolean;
  view_mode: string;
  voucher_type_numbering_info: VoucherTypeNumberingInfo[];
}

export type CreateVoucherTypeResponse = any;
