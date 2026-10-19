export type StockValuationMethod =
  | 'WEIGHTED_AVERAGE'
  | 'FIFO_BATCH'
  | 'FIFO_NON_BATCH'
  | 'MOVING_COST'
  | 'ALL';

export interface CompanySettings {
  enable_branches: boolean;
  enable_cost_centres: boolean;
  enable_billwise_entry: boolean;
  enable_godowns: boolean;
  enable_batches: boolean;
  enable_negative_stock_control: boolean;
  enable_tracking: boolean;
  enable_dispatch_details: boolean;
  enable_buyer_details: boolean;
  enable_stock_item_travel_info: boolean;
  enable_stock_item_description: boolean;
  enable_ledger_description: boolean;
  default_stock_valuation_method: StockValuationMethod;
}

export type CompanySettingsResponse = CompanySettings;

export interface UpdateCompanySettingsArgs {
  companyId: string;
  settings: CompanySettings;
}
