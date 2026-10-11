import { useCallback } from 'react';
import type { Ledger } from '@/features/Accounts/Ledger/types';

export const TAXATION_SUBCATEGORIES = {
  LOCAL_SALES: '',//SA
  EXPORT_SALES: '',
  LOCAL_PURCHASE: '',//PA
  EXPORT_PURCHASE: '',
} as const;

export function useTaxationStep() {
  /**
   * Filter predicate for Local / Interstate Sales ledgers.
   * Prioritizes matching sub_category if present, with extensibility for custom rules.
   */
  const localSalesFilter = useCallback((ledger: Ledger) => {
    if (ledger.sub_category) {
      return ledger.sub_category.toLowerCase() === TAXATION_SUBCATEGORIES.LOCAL_SALES;
    }
    // Extensible fallback: can match tax classifications or name if sub_category is not yet provided
    return true;
  }, []);

  /**
   * Filter predicate for Export Sales ledgers.
   */
  const exportSalesFilter = useCallback((ledger: Ledger) => {
    if (ledger.sub_category) {
      return ledger.sub_category.toLowerCase() === TAXATION_SUBCATEGORIES.EXPORT_SALES;
    }
    return true;
  }, []);

  /**
   * Filter predicate for Local / Interstate Purchase ledgers.
   */
  const localPurchaseFilter = useCallback((ledger: Ledger) => {
    if (ledger.sub_category) {
      return ledger.sub_category.toLowerCase() === TAXATION_SUBCATEGORIES.LOCAL_PURCHASE;
    }
    return true;
  }, []);

  /**
   * Filter predicate for Export / Import Purchase ledgers.
   */
  const exportPurchaseFilter = useCallback((ledger: Ledger) => {
    if (ledger.sub_category) {
      return ledger.sub_category.toLowerCase() === TAXATION_SUBCATEGORIES.EXPORT_PURCHASE;
    }
    return true;
  }, []);

  return {
    TAXATION_SUBCATEGORIES,
    localSalesFilter,
    exportSalesFilter,
    localPurchaseFilter,
    exportPurchaseFilter,
  };
}
