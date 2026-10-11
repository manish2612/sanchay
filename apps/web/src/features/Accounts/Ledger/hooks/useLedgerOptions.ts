import { useMemo } from 'react';
import { useGetLedgersQuery } from '../api';
import type { Ledger } from '../types';

export type LedgerFilterFn = (ledger: Ledger) => boolean;

export interface UseLedgerOptionsParams {
  /**
   * Filter ledgers by sub_category (e.g. 'sales', 'purchase', etc.).
   * Performs case-insensitive matching.
   */
  subCategory?: string;

  /**
   * Custom filter predicate function for arbitrary/future filtering logic.
   * Return true to include the ledger in the result.
   */
  filter?: LedgerFilterFn;

  /**
   * Optional pre-filtered options override.
   */
  options?: { label: string; value: string }[];
}

export interface LedgerOption {
  label: string;
  value: string;
  ledger: Ledger;
}

export function useLedgerOptions(params?: UseLedgerOptionsParams) {
  const { subCategory, filter, options: customOptions } = params || {};
  const { data: ledgers = [], isLoading, isFetching, error, refetch } = useGetLedgersQuery();

  const options = useMemo(() => {
    if (customOptions) return customOptions;

    let result = ledgers;

    // Filter by sub_category if provided
    if (subCategory) {
      const target = subCategory.toLowerCase();
      const hasSubCategoryData = ledgers.some((l) => Boolean(l.sub_category));
      // Only strictly filter if backend/mock provides sub_category, otherwise preserve list
      if (hasSubCategoryData) {
        result = result.filter(
          (ledger) => ledger.sub_category?.toLowerCase() === target
        );
      }
    }

    // Apply custom filter predicate if provided
    if (filter) {
      result = result.filter(filter);
    }

    return result.map((ledger) => ({
      label: ledger.name,
      value: ledger.id,
      ledger,
    }));
  }, [ledgers, customOptions, subCategory, filter]);

  return {
    options,
    rawLedgers: ledgers,
    isLoading: isLoading || isFetching,
    error,
    refetch,
  };
}
