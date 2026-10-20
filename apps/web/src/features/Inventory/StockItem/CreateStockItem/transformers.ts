import { StockItemFormValues } from './schema';
import { CreateStockItemPayload } from '../types';

/**
 * Transforms React Hook Form values into the exact backend payload expected
 * for creating a stock item.
 */
export const transformStockItemPayload = (data: StockItemFormValues): CreateStockItemPayload => {
  return {
    alias: '',
    alternate_units: data.enableMultiUnit
      ? (data.multiUnits || [])
          .filter((r) => !r.isPhantom && Boolean(r.unit) && Number(r.quantity) > 0)
          .map((r) => ({
            alternate_unit_id: r.unit || null,
            conversion_factor: Number(r.quantity) || 0,
            denominator_factor: 1,
          }))
      : [],
    base_unit_id: data.unit || null,
    description: '',
    global_purchase_ledger_id: data.exportPurchase || null,
    global_sales_ledger_id: data.exportSales || null,
    hsn_sac_code: data.hsnSac?.trim() ? data.hsnSac.trim() : null,
    is_branch_enabled: false,
    is_godown_enabled: Boolean(data.enableGodownAllocation),
    item_code: '',
    local_purchase_ledger_id: data.localInterstatePurchase || null,
    local_sales_ledger_id: data.localInterstateSales || null,
    maintain_batches: Boolean(data.maintainBatches),
    name: data.name?.trim() || '',
    opening_balances: data.enableGodownAllocation
      ? (data.godownAllocations || [])
          .filter((r) => !r.isPhantom && Boolean(r.godown))
          .map((r) => ({
            amount: (Number(r.quantity) || 0) * (Number(r.rate) || 0),
            batch_number: r.batchNumber?.trim() || '',
            branch_id: null,
            expiry_date:
              data.trackExpiryDate && r.expiryDate ? new Date(r.expiryDate).toISOString() : null,
            godown_id: r.godownId || null,
            mfg_date: data.trackMfgDate && r.mfgDate ? new Date(r.mfgDate).toISOString() : null,
            quantity: Number(r.quantity) || 0,
            rate: Number(r.rate) || 0,
          }))
      : Number(data.openingQuantity) > 0
        ? [
            {
              amount: Number(data.openingAmount) || 0,
              batch_number: '',
              branch_id: '',
              expiry_date: null,
              godown_id: '',
              mfg_date: null,
              quantity: Number(data.openingQuantity) || 0,
              rate: Number(data.openingRate) || 0,
            },
          ]
        : [],
    opening_quantity: Number(data.openingQuantity) || 0,
    opening_rate: Number(data.openingRate) || 0,
    opening_value: Number(data.openingAmount) || 0,
    part_number: data.partNumber ? String(data.partNumber).trim() : '',
    price_rules: data.enableStandardRates
      ? (data.standardRates || [])
          .filter(
            (r) =>
              !r.isPhantom &&
              (Number(r.minSellingRate) > 0 || Number(r.mrp) > 0 || Number(r.netRate) > 0),
          )
          .map((r) => ({
            effective_from: r.fromDate
              ? new Date(r.fromDate).toISOString()
              : new Date().toISOString(),
            effective_to: r.toDate ? new Date(r.toDate).toISOString() : null,
            min_selling_rate: Number(r.minSellingRate) || 0,
            mrp: Number(r.mrp) || 0,
            net_rate: Number(r.netRate) || 0,
            standard_rate: 0,
          }))
      : [],
    remarks: '',
    stock_category_id: data.categoryId || null,
    stock_group_id: data.parentId || null,
    tax_rates: [],
    track_expiry_date: Boolean(data.trackExpiryDate),
    track_mfg_date: Boolean(data.trackMfgDate),
  };
};

/**
 * Transforms backend stock item detail response into React Hook Form values
 * for editing an existing stock item.
 */
export const transformStockItemResponseToForm = (item: any): StockItemFormValues => {
  const openingBalances = item.opening_balances || item.batch_balances || item.item_balances || [];
  const hasGodownAllocations = openingBalances.some((b: any) => Boolean(b.godown_id));
  const enableGodownAllocation =
    item.is_godown_enabled !== undefined ? Boolean(item.is_godown_enabled) : hasGodownAllocations;

  const godownAllocations = openingBalances
    .filter((b: any) => Boolean(b.godown_id))
    .map((b: any) => ({
      godown: b.godown_id || '',
      godownId: b.godown_id || '',
      batchNumber: b.batch_number ? String(b.batch_number) : '',
      mfgDate: b.mfg_date ? new Date(b.mfg_date) : null,
      expiryDate: b.expiry_date ? new Date(b.expiry_date) : null,
      quantity: Number(b.quantity ?? b.current_qty ?? 0),
      rate: Number(b.rate ?? b.unit_rate ?? 0),
      isPhantom: false,
    }));

  const alternateUnits = item.alternate_units || [];
  const enableMultiUnit = alternateUnits.length > 0;
  const multiUnits = alternateUnits.map((u: any) => ({
    unit: u.alternate_unit_id || '',
    quantity: Number(u.conversion_factor || 1),
    isPhantom: false,
  }));

  const priceRules = item.price_rules || [];
  const enableStandardRates = priceRules.length > 0;
  const standardRates = priceRules.map((r: any) => ({
    fromDate: r.effective_from ? new Date(r.effective_from) : null,
    toDate: r.effective_to ? new Date(r.effective_to) : null,
    minSellingRate: Number(r.min_selling_rate || 0),
    mrp: Number(r.mrp || 0),
    netRate: Number(r.net_rate || 0),
    isPhantom: false,
  }));

  const openingQty = Number(item.opening_quantity || 0);
  const openingRate = Number(item.opening_rate || 0);
  const openingAmount = Number(item.opening_value ?? item.opening_amount ?? (openingQty * openingRate));

  return {
    name: item.name || '',
    alias: item.alias || '',
    parentId: item.stock_group_id || '',
    categoryId: item.stock_category_id || '',
    unit: item.base_unit_id || '',
    hsnSac: item.hsn_sac_code || '',
    partNumber: item.part_number ? String(item.part_number) : '',

    maintainBatches: Boolean(item.maintain_batches),
    isBranchEnabled: Boolean(item.is_branch_enabled),

    localInterstateSales: item.local_sales_ledger_id || null,
    exportSales: item.global_sales_ledger_id || null,
    localInterstatePurchase: item.local_purchase_ledger_id || null,
    exportPurchase: item.global_purchase_ledger_id || null,

    enableMultiUnit,
    multiUnits,

    enableStandardRates,
    standardRates,

    trackMfgDate: Boolean(item.track_mfg_date),
    trackExpiryDate: Boolean(item.track_expiry_date),

    openingQuantity: openingQty,
    openingRate: openingRate,
    openingAmount: openingAmount,

    enableGodownAllocation,
    godownAllocations,
  };
};

