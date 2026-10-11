import { useMemo } from 'react';
import { useGetStockUnitsQuery, type StockUnit } from '../api/stockUnitsApi';

export type StockUnitFilterFn = (unit: StockUnit) => boolean;

export interface UseStockUnitOptionsParams {
  /**
   * Custom filter predicate function for arbitrary filtering logic.
   * Return true to include the stock unit in the result.
   */
  filter?: StockUnitFilterFn;

  /**
   * Optional pre-filtered options override.
   */
  options?: { label: string; value: string }[];
}

export interface StockUnitOption {
  label: string;
  value: string;
  symbol: string;
  name: string;
  decimal_places: number;
  unit: StockUnit;
}

export function useStockUnitOptions(params?: UseStockUnitOptionsParams) {
  const { filter, options: customOptions } = params || {};
  const { data: stockUnits = [], isLoading, isFetching, error, refetch } = useGetStockUnitsQuery();

  const options = useMemo<StockUnitOption[]>(() => {
    let result = stockUnits;
    if (filter) {
      result = result.filter(filter);
    }

    return result.map((unit) => ({
      label: unit.name ? `${unit.name} (${unit.symbol})` : unit.symbol,
      value: unit.symbol,
      symbol: unit.symbol,
      name: unit.name,
      decimal_places: unit.decimal_places,
      unit,
    }));
  }, [stockUnits, filter]);

  return {
    options: customOptions || options,
    rawStockUnits: stockUnits,
    isLoading: isLoading || isFetching,
    error,
    refetch,
  };
}
