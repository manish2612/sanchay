import { CompanySettings, StockValuationMethod } from './types';

export const DEFAULT_COMPANY_SETTINGS: CompanySettings = {
  enable_branches: true,
  enable_cost_centres: false,
  enable_billwise_entry: true,
  enable_godowns: true,
  enable_batches: true,
  enable_negative_stock_control: false,
  enable_tracking: true,
  enable_dispatch_details: false,
  enable_buyer_details: true,
  enable_stock_item_travel_info: false,
  enable_stock_item_description: true,
  enable_ledger_description: false,
  default_stock_valuation_method: 'WEIGHTED_AVERAGE',
};

export interface SettingSwitchItem {
  key: Exclude<keyof CompanySettings, 'default_stock_valuation_method'>;
  label: string;
  description: string;
  scope?: string;
}

export const ORGANIZATION_SWITCHES: SettingSwitchItem[] = [
  {
    key: 'enable_branches',
    label: 'Enable Branches',
    description: 'Enables multi-branch segregation and inter-branch transactions.',
    scope: 'Organization',
  },
];

export const ACCOUNTING_SWITCHES: SettingSwitchItem[] = [
  {
    key: 'enable_cost_centres',
    label: 'Enable Cost Centres',
    description: 'Use in Ledger UI & voucher for Cost Centre wise functionality.',
    scope: 'Ledger & Vouchers',
  },
  {
    key: 'enable_billwise_entry',
    label: 'Enable Bill-wise Entry',
    description: 'Use in Ledger Master UI to hide/show bill-by-bill allocation.',
    scope: 'Ledger Master',
  },
  {
    key: 'enable_ledger_description',
    label: 'Enable Ledger Description',
    description: 'Use in Voucher Entry for supplementary narrative lines.',
    scope: 'Voucher Entry',
  },
];

export const INVENTORY_SWITCHES: SettingSwitchItem[] = [
  {
    key: 'enable_batches',
    label: 'Enable Batches',
    description: 'Use in Stock Item Master UI to hide/show batch & expiry fields.',
    scope: 'Stock Items',
  },
  {
    key: 'enable_godowns',
    label: 'Enable Godowns',
    description: 'Use for Godown-wise location inventory functionality.',
    scope: 'Godown & Vouchers',
  },
  {
    key: 'enable_negative_stock_control',
    label: 'Enable Negative Stock Control',
    description: 'Use in Inventory Voucher Entry to restrict/warn on zero balance.',
    scope: 'Inventory Vouchers',
  },
  {
    key: 'enable_stock_item_description',
    label: 'Enable Stock Item Description',
    description: 'Use in Voucher Entry for additional item description notes.',
    scope: 'Voucher Entry',
  },
  {
    key: 'enable_stock_item_travel_info',
    label: 'Enable Stock Item Travel Info',
    description: 'Captures travel-specific inventory details during voucher entry.',
    scope: 'Stock Items',
  },
];

export const LOGISTICS_SWITCHES: SettingSwitchItem[] = [
  {
    key: 'enable_tracking',
    label: 'Enable Tracking',
    description: 'Use in Voucher Entry for receipt/delivery note tracking numbers.',
    scope: 'Voucher Entry',
  },
  {
    key: 'enable_dispatch_details',
    label: 'Enable Dispatch Details',
    description: 'Use in Voucher Entry to capture carrier, LR/RR, and vehicle info.',
    scope: 'Voucher Entry',
  },
  {
    key: 'enable_buyer_details',
    label: 'Enable Buyer Details',
    description: 'Use in Voucher Entry for separate consignee/buyer billing details.',
    scope: 'Voucher Entry',
  },
];

export const STOCK_VALUATION_OPTIONS: { value: StockValuationMethod; label: string; description: string }[] = [
  {
    value: 'WEIGHTED_AVERAGE',
    label: 'Weighted Average',
    description: 'Recalculates average cost continuously across inventory pools.',
  },
  {
    value: 'FIFO_BATCH',
    label: 'FIFO (Batch-wise)',
    description: 'First-in, first-out allocation calculated per batch.',
  },
  {
    value: 'FIFO_NON_BATCH',
    label: 'FIFO (Overall)',
    description: 'Standard first-in, first-out queue across total stock.',
  },
  {
    value: 'MOVING_COST',
    label: 'Moving Cost',
    description: 'Real-time moving weighted average updated on every purchase.',
  },
  {
    value: 'ALL',
    label: 'All Valuation Methods',
    description: 'Allows individual valuation method selection per stock item.',
  },
];
