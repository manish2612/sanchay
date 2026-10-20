import { useState, useMemo, useCallback } from 'react';
import {
  useGetStockUnitsQuery,
  useDeleteStockUnitMutation,
  StockUnit,
} from '@/features/Masters/api/stockUnitsApi';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { getErrorMessage } from '@/utils/errorUtils';

export type UnitOfMeasureFilterType = 'all' | 'active' | 'inactive';

export const isPredefinedUnit = (
  unit?: { is_predefined?: boolean | number | string | null } | null
): boolean => {
  if (!unit) return false;
  return (
    unit.is_predefined === true ||
    (unit.is_predefined as unknown) === 1 ||
    (unit.is_predefined as unknown) === '1' ||
    (unit.is_predefined as unknown) === 'true'
  );
};

export function useUnitOfMeasureList() {
  const { data: units = [], isLoading, isError, refetch } = useGetStockUnitsQuery();
  const [deleteStockUnit, { isLoading: isDeleting }] = useDeleteStockUnitMutation();
  const { openMasterSheet } = useGlobalMasterSheet();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<UnitOfMeasureFilterType>('all');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    unit: StockUnit | null;
  }>({
    isOpen: false,
    unit: null,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Compute status counts
  const counts = useMemo(() => {
    let active = 0;
    let inactive = 0;

    for (const u of units) {
      if (u.is_active !== false) {
        active++;
      } else {
        inactive++;
      }
    }

    return {
      total: units.length,
      active,
      inactive,
    };
  }, [units]);

  // Filter and search records
  const filteredUnits = useMemo(() => {
    let list = [...units];

    // Filter by tab
    if (activeFilter === 'active') {
      list = list.filter((u) => u.is_active !== false);
    } else if (activeFilter === 'inactive') {
      list = list.filter((u) => u.is_active === false);
    }

    // Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter((u) => {
        const symbolMatch = u.symbol.toLowerCase().includes(query);
        const nameMatch = u.name.toLowerCase().includes(query);
        const uqcMatch = u.uqc_code ? u.uqc_code.toLowerCase().includes(query) : false;
        const typeMatch = isPredefinedUnit(u)
          ? 'default'.includes(query) || 'predefined'.includes(query)
          : 'custom'.includes(query);
        return symbolMatch || nameMatch || uqcMatch || typeMatch;
      });
    }

    // Sort alphabetically by symbol then formal name
    return list.sort((a, b) => {
      const symCompare = a.symbol.localeCompare(b.symbol);
      if (symCompare !== 0) return symCompare;
      return a.name.localeCompare(b.name);
    });
  }, [units, activeFilter, searchQuery]);

  // Open create sheet
  const handleAddNew = useCallback(() => {
    openMasterSheet('unit-of-measure', 'create');
  }, [openMasterSheet]);

  // Open edit sheet (reuses UnitOfMeasureForm in MasterFormSheet!)
  const handleEditUnit = useCallback(
    (unit: StockUnit) => {
      if (isPredefinedUnit(unit)) return;
      openMasterSheet('unit-of-measure', 'edit', unit);
    },
    [openMasterSheet],
  );

  // Search clear helper
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // --- Delete Handlers ---
  const handleOpenDeleteDialog = useCallback((unit: StockUnit) => {
    if (isPredefinedUnit(unit)) return;
    setDeleteDialogState({
      isOpen: true,
      unit,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogState({
      isOpen: false,
      unit: null,
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const unitToDelete = deleteDialogState.unit;
    if (!unitToDelete || isPredefinedUnit(unitToDelete)) return;

    try {
      await deleteStockUnit(unitToDelete.id).unwrap();

      setToastMessage({
        title: 'Unit of Measure Deleted',
        desc: `Successfully deleted "${unitToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: unknown) {
      console.error('Failed to delete unit of measure:', err);
      const errMsg = getErrorMessage(
        err,
        'Failed to delete Unit of Measure. Please try again.',
      );
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.unit, deleteStockUnit, handleCloseDeleteDialog]);

  return {
    units,
    filteredUnits,
    isLoading,
    isError,
    refetch,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    activeFilter,
    setActiveFilter,
    counts,
    handleAddNew,
    handleEditUnit,
    // Deletion
    deleteDialogState,
    isDeleting,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    // Feedback Toast
    toastMessage,
    setToastMessage,
  };
}
