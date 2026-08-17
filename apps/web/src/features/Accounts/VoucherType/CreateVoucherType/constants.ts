export const VOUCHER_TYPE_FIELDS = {
  // Step 1: Basic Details
  NAME: 'name',
  PARENT: 'parent',
  DEFAULT_VIEWING_MODE: 'defaultViewingMode',
  SET_AS_DEFAULT: 'setAsDefault',
  DECLARATION: 'declaration',
  APPLY_TAX: 'applyTax', // Conditionally visible

  // Step 2: Voucher Numbering (Table)
  VOUCHER_NUMBERING: 'voucherNumbering',

  // Step 3: Default Ledgers (Dynamic)
  CASH_LEDGER: 'cashLedger',
  BANK_LEDGER: 'bankLedger',
  SALES_PURCHASE_LEDGER: 'salesPurchaseLedger',
  EXPORT_IMPORT_LEDGER: 'exportImportLedger',
  DISCOUNT_LEDGER: 'discountLedger',
  ROUNDING_OFF_LEDGER: 'roundingOffLedger',

  // Step 4: Configurations (Dynamic)
  EXCISE_DUTY_APPLICABLE: 'exciseDutyApplicable',
  DISCOUNT_AT_BILL_LEVEL: 'discountAtBillLevel',
  DISCOUNT_AT_ITEM_LEVEL: 'discountAtItemLevel',
  ALLOW_ZERO_VALUE_ITEM: 'allowZeroValueItem',
  ALLOW_ZERO_VALUE_LEDGER: 'allowZeroValueLedger',
  USE_FOR_POS: 'useForPos',
  PRINT_CONFIGURABLE: 'printConfigurable',
  PRINT_AFTER_SAVE: 'printAfterSave',
  NEW_MODE_AFTER_SAVE: 'newModeAfterSave',
  COL_FREE_QTY: 'colFreeQty',
  COL_ALT_QTY: 'colAltQty',
  COL_RATE: 'colRate',
  COL_NET_RATE: 'colNetRate',
  COL_GROSS_AMOUNT: 'colGrossAmount',
} as const;

export const INITIAL_STEPS = [
  {
    id: 1,
    title: 'Basic Details',
    description: 'Basic configuration of the voucher type',
    fields: [
      VOUCHER_TYPE_FIELDS.NAME,
      VOUCHER_TYPE_FIELDS.PARENT,
      VOUCHER_TYPE_FIELDS.DEFAULT_VIEWING_MODE,
      VOUCHER_TYPE_FIELDS.SET_AS_DEFAULT,
      VOUCHER_TYPE_FIELDS.DECLARATION,
      VOUCHER_TYPE_FIELDS.APPLY_TAX,
    ],
  },
  {
    id: 'voucher-numbering',
    title: 'Voucher Numbering',
    description: 'Configure voucher numbering formats',
    fields: [VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING],
  },
];

export const DYNAMIC_STEPS = [
  {
    id: 'default-ledgers',
    title: 'Default Ledgers',
    description: 'Configure default ledgers for transactions',
    fields: [
      VOUCHER_TYPE_FIELDS.CASH_LEDGER,
      VOUCHER_TYPE_FIELDS.BANK_LEDGER,
      VOUCHER_TYPE_FIELDS.SALES_PURCHASE_LEDGER,
      VOUCHER_TYPE_FIELDS.EXPORT_IMPORT_LEDGER,
      VOUCHER_TYPE_FIELDS.DISCOUNT_LEDGER,
      VOUCHER_TYPE_FIELDS.ROUNDING_OFF_LEDGER,
    ],
  },
  {
    id: 'configurations',
    title: 'Configurations',
    description: 'Advanced settings and column visibilities',
    fields: [
      VOUCHER_TYPE_FIELDS.EXCISE_DUTY_APPLICABLE,
      VOUCHER_TYPE_FIELDS.DISCOUNT_AT_BILL_LEVEL,
      VOUCHER_TYPE_FIELDS.DISCOUNT_AT_ITEM_LEVEL,
      VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_ITEM,
      VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_LEDGER,
      VOUCHER_TYPE_FIELDS.USE_FOR_POS,
      VOUCHER_TYPE_FIELDS.PRINT_CONFIGURABLE,
      VOUCHER_TYPE_FIELDS.PRINT_AFTER_SAVE,
      VOUCHER_TYPE_FIELDS.NEW_MODE_AFTER_SAVE,
      VOUCHER_TYPE_FIELDS.COL_FREE_QTY,
      VOUCHER_TYPE_FIELDS.COL_ALT_QTY,
      VOUCHER_TYPE_FIELDS.COL_RATE,
      VOUCHER_TYPE_FIELDS.COL_NET_RATE,
      VOUCHER_TYPE_FIELDS.COL_GROSS_AMOUNT,
    ],
  },
];

export const PARENT_OPTIONS = [
  { label: 'Sales', value: 'sales' },
  { label: 'Purchase', value: 'purchase' },
  { label: 'Contra', value: 'contra' },
  { label: 'Payment', value: 'payment' },
  { label: 'Receipt', value: 'receipt' },
];

export const DEFAULT_VIEWING_MODE_OPTIONS = [
  { label: 'Accounting Invoice', value: 'accounting' },
  { label: 'Item Invoice', value: 'item' },
  { label: 'As Voucher', value: 'voucher' },
];

export const APPLY_TAX_OPTIONS = [
  { label: 'Not Applicable', value: 'not_applicable' },
  { label: 'Tax on Item Rate', value: 'item_rate' },
  { label: 'Tax on Value', value: 'value' },
];

export const NUMBERING_TYPE_OPTIONS = [
  { label: 'Automatic', value: 'automatic' },
  { label: 'Manual', value: 'manual' },
  { label: 'None', value: 'none' },
];

export const RESET_OPTIONS = [
  { label: 'Daily', value: 'daily' },
  { label: 'Weekly', value: 'weekly' },
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Never', value: 'never' },
];
