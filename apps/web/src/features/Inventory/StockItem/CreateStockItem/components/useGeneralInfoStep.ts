import { useMemo } from 'react';
import { useGetStockGroupsQuery } from '@/features/Masters/api/stockGroupsApi';
import { useGetStockCategoriesQuery } from '@/features/Masters/api/stockCategoriesApi';
import { useGetStockUnitsQuery, type StockUnit } from '@/features/Masters/api/stockUnitsApi';

export interface UnitOption {
  label: string;
  value: string;
  symbol: string;
  name: string;
  decimal_places: number;
}

export interface GeneralInfoOption {
  label: string;
  value: string;
}

export function useGeneralInfoStep() {
  const { data: stockGroups = [], isLoading: isLoadingStockGroups } = useGetStockGroupsQuery();
  const { data: stockCategories = [], isLoading: isLoadingCategories } = useGetStockCategoriesQuery();
  const { data: stockUnits = [], isLoading: isLoadingUnits } = useGetStockUnitsQuery();

  const stockGroupOptions = useMemo<GeneralInfoOption[]>(() => {
    return stockGroups.map((group) => ({
      label: group.name,
      value: group.id,
    }));
  }, [stockGroups]);

  const categoryOptions = useMemo<GeneralInfoOption[]>(() => {
    return stockCategories.map((category) => ({
      label: category.name,
      value: category.id,
    }));
  }, [stockCategories]);

  const unitOptions = useMemo<UnitOption[]>(() => {
    return stockUnits.map((unit: StockUnit) => ({
      label: unit.name ? `${unit.name} (${unit.symbol})` : unit.symbol,
      value: unit.symbol,
      symbol: unit.symbol,
      name: unit.name,
      decimal_places: unit.decimal_places,
    }));
  }, [stockUnits]);

  return {
    stockGroupOptions,
    isLoadingStockGroups,
    categoryOptions,
    isLoadingCategories,
    unitOptions,
    isLoadingUnits,
  };
}
