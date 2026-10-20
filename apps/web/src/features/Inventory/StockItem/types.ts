export interface AlternateUnitPayload {
  alternate_unit_id: string | null;
  conversion_factor: number;
  denominator_factor: number;
}

export interface PriceRulePayload {
  effective_from: string;
  effective_to: string | null;
  min_selling_rate: number;
  mrp: number;
  net_rate: number;
  standard_rate: number;
}

export interface OpeningBalancePayload {
  amount: number;
  batch_number: string;
  branch_id: string | null;
  expiry_date: string | null;
  godown_id: string | null;
  mfg_date: string | null;
  quantity: number;
  rate: number;
}

export interface TaxRatePayload {
  applicability: string;
  effective_from: string;
  effective_to: string | null;
  excise_tax_group_id: string;
  tax_group_id: string;
  tax_rate: number;
}

export interface CreateStockItemPayload {
  alias: string;
  alternate_units: AlternateUnitPayload[];
  base_unit_id: string | null;
  description: string;
  global_purchase_ledger_id: string | null;
  global_sales_ledger_id: string | null;
  hsn_sac_code: string | null;
  is_branch_enabled: boolean;
  is_godown_enabled: boolean;
  item_code: string;
  local_purchase_ledger_id: string | null;
  local_sales_ledger_id: string | null;
  maintain_batches: boolean;
  name: string;
  opening_balances: OpeningBalancePayload[];
  opening_quantity: number;
  opening_rate: number;
  opening_value: number;
  part_number: string;
  price_rules: PriceRulePayload[];
  remarks: string;
  stock_category_id: string | null;
  stock_group_id: string | null;
  tax_rates: TaxRatePayload[];
  track_expiry_date: boolean;
  track_mfg_date: boolean;
}

export interface StockItemResponse {
  id: string;
  name: string;
  alias?: string;
  item_code?: string;
  part_number?: string;
  base_unit_id?: string;
  stock_group_id?: string;
  stock_category_id?: string;
  is_active?: boolean;
  company_id?: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any;
}

export interface StockItemListItem {
  id: string;
  name: string;
  is_active?: boolean;
  item_code?: string;
  part_number?: string;
  hsn_sac_code?: string;
  description?: string;
  remarks?: string;
  base_unit_id?: string | null;
  stock_group_id?: string | null;
  stock_category_id?: string | null;
  maintain_batches?: boolean;
  track_mfg_date?: boolean;
  track_expiry_date?: boolean;
  opening_quantity?: string | number;
  opening_rate?: string | number;
  opening_value?: string | number;
  [key: string]: any;
}

export interface StockItemDecoratedItem extends StockItemListItem {
  stock_group_name: string;
  stock_category_name: string;
  unit_name: string;
}

export interface DeleteStockItemResponse {
  message?: string;
}

