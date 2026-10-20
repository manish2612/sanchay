import { useState, useMemo, useCallback } from 'react';
import {
  useGetCostCentersQuery,
  useDeleteCostCenterMutation,
  CostCenterListItem,
} from '@/features/Masters/api/costCentersApi';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { getErrorMessage } from '@/utils/errorUtils';

export type CostCentreFilterType = 'all' | 'active' | 'inactive';

export function useCostCentreList() {
  const { data: costCentres = [], isLoading, isError, refetch } = useGetCostCentersQuery();
  const [deleteCostCenter, { isLoading: isDeleting }] = useDeleteCostCenterMutation();
  const { openMasterSheet } = useGlobalMasterSheet();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<CostCentreFilterType>('all');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    center: CostCenterListItem | null;
  }>({
    isOpen: false,
    center: null,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Compute counts
  const counts = useMemo(() => {
    let active = 0;
    let inactive = 0;

    for (const c of costCentres) {
      if (c.is_active !== false) {
        active++;
      } else {
        inactive++;
      }
    }

    return {
      total: costCentres.length,
      active,
      inactive,
    };
  }, [costCentres]);

  // Filter and search records
  const filteredCostCentres = useMemo(() => {
    let list = [...costCentres];

    // Filter by status tab
    if (activeFilter === 'active') {
      list = list.filter((c) => c.is_active !== false);
    } else if (activeFilter === 'inactive') {
      list = list.filter((c) => c.is_active === false);
    }

    // Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(query);
        const categoryMatch = c.cost_category_name
          ? c.cost_category_name.toLowerCase().includes(query)
          : false;
        return nameMatch || categoryMatch;
      });
    }

    // Sort by display order then name
    return list.sort((a, b) => {
      const orderA = a.display_order ?? 9999;
      const orderB = b.display_order ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });
  }, [costCentres, activeFilter, searchQuery]);

  // Open create sheet
  const handleAddNew = useCallback(() => {
    openMasterSheet('cost-centre', 'create');
  }, [openMasterSheet]);

  // Open edit sheet (reuses CostCenterForm in MasterFormSheet!)
  const handleEditCenter = useCallback(
    (center: CostCenterListItem) => {
      if (center.is_predefined) return;
      openMasterSheet('cost-centre', 'edit', center);
    },
    [openMasterSheet],
  );

  // Search clear helper
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // --- Delete Handlers ---
  const handleOpenDeleteDialog = useCallback((center: CostCenterListItem) => {
    if (center.is_predefined) return;
    setDeleteDialogState({
      isOpen: true,
      center,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogState({
      isOpen: false,
      center: null,
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const centerToDelete = deleteDialogState.center;
    if (!centerToDelete) return;

    try {
      await deleteCostCenter(centerToDelete.id).unwrap();

      setToastMessage({
        title: 'Cost Centre Deleted',
        desc: `Successfully deleted "${centerToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: unknown) {
      console.error('Failed to delete cost centre:', err);
      const errMsg = getErrorMessage(err, 'Failed to delete Cost Centre. Please try again.');
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.center, deleteCostCenter, handleCloseDeleteDialog]);

  return {
    costCentres,
    filteredCostCentres,
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
    handleEditCenter,
    // Delete state & handlers
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
