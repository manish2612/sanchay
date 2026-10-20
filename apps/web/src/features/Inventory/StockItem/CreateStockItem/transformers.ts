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
