import { useMemo } from 'react';
import { useGetStockGroupsQuery } from '@/features/Masters/api/stockGroupsApi';
import { useGetStockCategoriesQuery } from '@/features/Masters/api/stockCategoriesApi';
import { useStockUnitOptions, type StockUnitOption } from '@/features/Masters/hooks/useStockUnitOptions';

export type UnitOption = StockUnitOption;

export interface GeneralInfoOption {
  label: string;
  value: string;
}

export function useGeneralInfoStep() {
  const { data: stockGroups = [], isLoading: isLoadingStockGroups } = useGetStockGroupsQuery();
  const { data: stockCategories = [], isLoading: isLoadingCategories } = useGetStockCategoriesQuery();
  const { options: unitOptions, isLoading: isLoadingUnits } = useStockUnitOptions();

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

  return {
    stockGroupOptions,
    isLoadingStockGroups,
    categoryOptions,
    isLoadingCategories,
    unitOptions,
    isLoadingUnits,
  };
}
