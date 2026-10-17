import { useCallback } from 'react';
import type { Ledger } from '@/features/Accounts/Ledger/types';

export const TAXATION_SUBCATEGORIES = {
  LOCAL_SALES: 'SA',
  EXPORT_SALES: 'SA',
  LOCAL_PURCHASE: 'PA',
  EXPORT_PURCHASE: 'PA',
} as const;

export type TaxationSubcategories = typeof TAXATION_SUBCATEGORIES;

export const TAX_CLASSIFICATION_FIELD_NAMES = {
  LOCAL_SALES: 'localInterstateSales',
  EXPORT_SALES: 'exportSales',
  LOCAL_PURCHASE: 'localInterstatePurchase',
  EXPORT_PURCHASE: 'exportPurchase',
} as const;

export type TaxClassificationFieldNames = typeof TAX_CLASSIFICATION_FIELD_NAMES;

export function useTaxClassification() {
  /**
   * Filter predicate for Local / Interstate Sales ledgers.
   */
  const localSalesFilter = useCallback((ledger: Ledger) => {
    return ledger.sub_category?.toLowerCase() === TAXATION_SUBCATEGORIES.LOCAL_SALES.toLowerCase();
  }, []);

  /**
   * Filter predicate for Export Sales ledgers.
   */
  const exportSalesFilter = useCallback((ledger: Ledger) => {
    return ledger.sub_category?.toLowerCase() === TAXATION_SUBCATEGORIES.EXPORT_SALES.toLowerCase();
  }, []);

  /**
   * Filter predicate for Local / Interstate Purchase ledgers.
   */
  const localPurchaseFilter = useCallback((ledger: Ledger) => {
    return ledger.sub_category?.toLowerCase() === TAXATION_SUBCATEGORIES.LOCAL_PURCHASE.toLowerCase();
  }, []);

  /**
   * Filter predicate for Export Purchase ledgers.
   */
  const exportPurchaseFilter = useCallback((ledger: Ledger) => {
    return ledger.sub_category?.toLowerCase() === TAXATION_SUBCATEGORIES.EXPORT_PURCHASE.toLowerCase();
  }, []);

  return {
    TAXATION_SUBCATEGORIES,
    TAX_CLASSIFICATION_FIELD_NAMES,
    localSalesFilter,
    exportSalesFilter,
    localPurchaseFilter,
    exportPurchaseFilter,
  };
}
