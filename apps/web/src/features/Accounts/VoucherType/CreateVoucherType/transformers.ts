import { VOUCHER_TYPE_FIELDS, DEFAULT_VIEWING_MODE_OPTIONS } from './constants';
import type { VoucherTypeFormValues } from './schema';
import type { VoucherType } from '../types';

/**
 * Normalizes view_mode value between API response and form dropdown options
 */
export function normalizeViewMode(viewMode?: string, voucherMode?: string): string {
  if (!viewMode && !voucherMode) return '';

  const mode = (viewMode || voucherMode || '').toUpperCase();

  // Check direct match
  const directMatch = DEFAULT_VIEWING_MODE_OPTIONS.find((opt) => opt.value === mode);
  if (directMatch) return directMatch.value;

  // Known API alias mappings
  if (mode === 'ACCOUNTING' || mode === 'ACCOUNT_INVOICE' || mode === 'AMAO') {
    return 'AMAO';
  }
  if (mode === 'ITEM_INVOICE' || mode === 'IM') {
    return 'IM';
  }
  if (mode === 'ITEM_MODE_ACCOUNTS_ONLY' || mode === 'IMAO') {
    return 'IMAO';
  }
  if (mode === 'ITEM_MODE_INVENTORY_ONLY' || mode === 'IMIO') {
    return 'IMIO';
  }
  if (mode === 'ACCOUNTS_MODE' || mode === 'AM') {
    return 'AM';
  }

  return viewMode || '';
}

/**
 * Normalizes numbering type between API and form dropdown ('AUTOMATIC' -> 'AUTO')
 */
export function normalizeNumberingType(type?: string): string {
  if (!type) return 'AUTO';
  const upper = type.toUpperCase();
  if (upper === 'AUTOMATIC' || upper === 'AUTO') return 'AUTO';
  if (upper === 'MANUAL') return 'MANUAL';
  return type;
}

/**
 * Resolves parent ID from either direct parent_id or category matching
 */
export function resolveParentId(
  data: Partial<VoucherType>,
  voucherTypes: VoucherType[] = []
): string {
  if (data.parent_id) return data.parent_id;

  if (data.category && voucherTypes.length > 0) {
    const matched = voucherTypes.find(
      (vt) =>
        vt.category?.toUpperCase() === data.category?.toUpperCase() ||
        vt.name?.toLowerCase() === data.category?.toLowerCase() ||
        vt.code?.toUpperCase() === data.code?.toUpperCase()
    );
    if (matched) return matched.id;
  }

  return '';
}

/**
 * Transforms GET /accounting/vouchertypes/{id} response into form default values
 */
export function transformVoucherTypeResponseToForm(
  data: VoucherType,
  voucherTypes: VoucherType[] = []
): VoucherTypeFormValues {
  // Step 1: Basic Details
  const parentId = resolveParentId(data, voucherTypes);
  const viewingMode = normalizeViewMode(data.view_mode, data.voucher_mode);

  // Step 2: Voucher Numbering Rows
  const numberingRows = (data.numbering_info || []).map((item: any, index: number) => {
    let effectiveDate: Date | string = '';
    if (item.effective_from) {
      const parsed = new Date(item.effective_from);
      effectiveDate = isNaN(parsed.getTime()) ? item.effective_from : parsed;
    }

    return {
      id: item.id || `row-${index + 1}`,
      numbering_type: normalizeNumberingType(item.numbering_type),
      effective_from: effectiveDate,
      reset_on: item.reset_on || 'YEARLY',
      prefix: item.prefix || '',
      starting_number: Number(item.starting_number) || 1,
      suffix: item.suffix || '',
      prefill_padding: item.prefill_padding !== undefined && item.prefill_padding !== null ? Number(item.prefill_padding) : undefined,
      isPhantom: false,
    };
  });

  // Step 3: Default Ledgers
  const defaultCashLedgerId =
    data.default_cash_ledger_id || data.default_cash_ledger?.id || '';
  const defaultBankLedgerId =
    data.default_bank_ledger_id || '';
  const defaultLocalTradeLedgerId =
    data.default_local_trade_ledger_id || data.default_local_trade_ledger?.id || '';
  const defaultGlobalTradeLedgerId =
    data.default_global_trade_ledger_id || data.default_global_trade_ledger?.id || '';
  const defaultDiscountLedgerId =
    data.default_discount_ledger_id || data.default_discount_ledger?.id || '';
  const defaultRoundoffLedgerId =
    data.default_roundoff_ledger_id || data.default_roundoff_ledger?.id || '';

  return {
    // Step 1
    [VOUCHER_TYPE_FIELDS.NAME]: data.name || '',
    [VOUCHER_TYPE_FIELDS.PARENT]: parentId,
    [VOUCHER_TYPE_FIELDS.DEFAULT_VIEWING_MODE]: viewingMode,
    [VOUCHER_TYPE_FIELDS.SET_AS_DEFAULT]: Boolean(data.is_set_as_default),
    [VOUCHER_TYPE_FIELDS.DECLARATION]: data.declaration || '',
    [VOUCHER_TYPE_FIELDS.APPLY_TAX]: data.apply_tax || '',

    // Step 2
    [VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING]: numberingRows,

    // Step 3
    [VOUCHER_TYPE_FIELDS.CASH_LEDGER]: defaultCashLedgerId,
    [VOUCHER_TYPE_FIELDS.BANK_LEDGER]: defaultBankLedgerId,
    [VOUCHER_TYPE_FIELDS.SALES_PURCHASE_LEDGER]: defaultLocalTradeLedgerId,
    [VOUCHER_TYPE_FIELDS.EXPORT_IMPORT_LEDGER]: defaultGlobalTradeLedgerId,
    [VOUCHER_TYPE_FIELDS.DISCOUNT_LEDGER]: defaultDiscountLedgerId,
    [VOUCHER_TYPE_FIELDS.ROUNDING_OFF_LEDGER]: defaultRoundoffLedgerId,

    // Step 4
    [VOUCHER_TYPE_FIELDS.EXCISE_DUTY_APPLICABLE]: Boolean(data.is_excise_appl),
    [VOUCHER_TYPE_FIELDS.DISCOUNT_AT_BILL_LEVEL]: Boolean(data.apply_disc_bill),
    [VOUCHER_TYPE_FIELDS.DISCOUNT_AT_ITEM_LEVEL]: Boolean(data.apply_disc_item),
    [VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_ITEM]: Boolean(data.allow_zero_value_item),
    [VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_LEDGER]: Boolean(data.allow_zero_value_ledger),
    [VOUCHER_TYPE_FIELDS.USE_FOR_POS]: Boolean(data.is_pos_mode),
    [VOUCHER_TYPE_FIELDS.PRINT_CONFIGURABLE]: Boolean(data.printing_config),
    [VOUCHER_TYPE_FIELDS.PRINT_AFTER_SAVE]: Boolean(data.print_after_save),
    [VOUCHER_TYPE_FIELDS.NEW_MODE_AFTER_SAVE]: Boolean(data.create_mode_after_save),
    [VOUCHER_TYPE_FIELDS.COL_FREE_QTY]: Boolean(data.free_qty_column),
    [VOUCHER_TYPE_FIELDS.COL_ALT_QTY]: Boolean(data.alt_qty_olumn),
    [VOUCHER_TYPE_FIELDS.COL_RATE]: Boolean(data.rate_column),
    [VOUCHER_TYPE_FIELDS.COL_NET_RATE]: Boolean(data.net_rate_column),
    [VOUCHER_TYPE_FIELDS.COL_GROSS_AMOUNT]: Boolean(data.gross_column),
  };
}
