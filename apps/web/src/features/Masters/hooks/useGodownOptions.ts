import { useMemo } from 'react';
import { useGetGodownsQuery, type Godown } from '../api/godownsApi';

export type GodownFilterFn = (godown: Godown) => boolean;

export interface UseGodownOptionsParams {
  /**
   * Custom filter predicate function for arbitrary filtering logic.
   * Return true to include the godown in the result.
   */
  filter?: GodownFilterFn;

  /**
   * Optional pre-filtered options override.
   */
  options?: { label: string; value: string }[];
}

export interface GodownOption {
  id: string;
  label: string;
  value: string;
  name: string;
  godown: Godown;
}

export function useGodownOptions(params?: UseGodownOptionsParams) {
  const { filter, options: customOptions } = params || {};
  const { data: godowns = [], isLoading, isFetching, error, refetch } = useGetGodownsQuery();

  const options = useMemo<GodownOption[]>(() => {
    let result = godowns;
    if (filter) {
      result = result.filter(filter);
    }

    return result.map((godown) => ({
      id: godown.id,
      label: godown.name,
      value: godown.id,
      name: godown.name,
      godown,
    }));
  }, [godowns, filter]);

  return {
    options: customOptions || options,
    rawGodowns: godowns,
    isLoading: isLoading || isFetching,
    error,
    refetch,
  };
}
