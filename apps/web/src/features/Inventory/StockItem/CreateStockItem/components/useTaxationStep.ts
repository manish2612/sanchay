import { useCallback } from 'react';
import type { Ledger } from '@/features/Accounts/Ledger/types';

export const TAXATION_SUBCATEGORIES = {
  LOCAL_SALES: 'SA',
  EXPORT_SALES: 'SA',
  LOCAL_PURCHASE: 'PA',
  EXPORT_PURCHASE: 'PA',
} as const;

export function useTaxationStep() {
  /**
   * Filter predicate for Local / Interstate Sales ledgers.
   */
  const localSalesFilter = useCallback((ledger: Ledger) => {
    const isSales = ledger.sub_category?.toLowerCase() === TAXATION_SUBCATEGORIES.LOCAL_SALES.toLowerCase();
    return isSales;
  }, []);

  /**
   * Filter predicate for Export Sales ledgers.
   */
  const exportSalesFilter = useCallback((ledger: Ledger) => {
    const isSales = ledger.sub_category?.toLowerCase() === TAXATION_SUBCATEGORIES.EXPORT_SALES.toLowerCase();
    return isSales;
  }, []);

  /**
   * Filter predicate for Local / Interstate Purchase ledgers.
   */
  const localPurchaseFilter = useCallback((ledger: Ledger) => {
    const isPurchase = ledger.sub_category?.toLowerCase() === TAXATION_SUBCATEGORIES.LOCAL_PURCHASE.toLowerCase();
    return isPurchase;
  }, []);

  /**
   * Filter predicate for Export / Import Purchase ledgers.
   */
  const exportPurchaseFilter = useCallback((ledger: Ledger) => {
    const isPurchase = ledger.sub_category?.toLowerCase() === TAXATION_SUBCATEGORIES.EXPORT_PURCHASE.toLowerCase();
    return isPurchase ;
  }, []);

  return {
    TAXATION_SUBCATEGORIES,
    localSalesFilter,
    exportSalesFilter,
    localPurchaseFilter,
    exportPurchaseFilter,
  };
}
