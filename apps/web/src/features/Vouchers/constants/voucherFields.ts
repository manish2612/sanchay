export const VOUCHER_FIELDS = {
  // Dates (Both AD and BS are submitted, though UI only shows one dynamic calendar)
  VOUCHER_DATE_AD: 'voucherDateAd',
  VOUCHER_DATE_BS: 'voucherDateBs', // Miti
  REF_DATE_AD: 'refDateAd',
  REF_DATE_BS: 'refDateBs',         // Miti

  // Header / Details
  VOUCHER_TYPE_ID: 'voucherTypeId',
  VOUCHER_NO: 'voucherNo',
  REFERENCE_NO: 'referenceNo',
  PARTY_ACCOUNT: 'partyAccount',
  APPLY_TAX: 'applyTax',
  MODE: 'mode',
  PAYMENT_MODE: 'paymentMode',
  SALES_AC: 'salesAc',

  // Tables
  LEDGER_ENTRIES: 'ledgerEntries',
  ITEM_ENTRIES: 'itemEntries',

  // Footer
  NARRATION: 'narration',

  // API Metadata
  SEQUENCE_INDEX: 'sequenceIndex',
  SUFFIX: 'suffix',
} as const;

export type VoucherFieldPaths = typeof VOUCHER_FIELDS[keyof typeof VOUCHER_FIELDS];
