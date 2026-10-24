import { useState, useMemo, useCallback } from 'react';
import {
  useGetCostCategoriesQuery,
  useDeleteCostCategoryMutation,
  CostCategory,
} from '@/features/Masters/api/costCategoriesApi';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { getErrorMessage } from '@/utils/errorUtils';

export type CostCategoryFilterType = 'all' | 'revenue' | 'non_revenue';

export function useCostCategoryList() {
  const { data: categories = [], isLoading, isError, refetch } = useGetCostCategoriesQuery();
  const [deleteCostCategory, { isLoading: isDeleting }] = useDeleteCostCategoryMutation();
  const { openMasterSheet } = useGlobalMasterSheet();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<CostCategoryFilterType>('all');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    category: CostCategory | null;
  }>({
    isOpen: false,
    category: null,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Compute category counts
  const counts = useMemo(() => {
    let revenue = 0;
    let nonRevenue = 0;

    for (const c of categories) {
      if (c.allocate_revenue) revenue++;
      if (c.allocate_non_revenue) nonRevenue++;
    }

    return {
      total: categories.length,
      revenue,
      nonRevenue,
    };
  }, [categories]);

  // Filter and search records
  const filteredCategories = useMemo(() => {
    let list = [...categories];

    // Filter by type tab
    if (activeFilter === 'revenue') {
      list = list.filter((c) => Boolean(c.allocate_revenue));
    } else if (activeFilter === 'non_revenue') {
      list = list.filter((c) => Boolean(c.allocate_non_revenue));
    }

    // Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(query);
        const aliasMatch = c.alias ? c.alias.toLowerCase().includes(query) : false;
        const codeMatch = c.code ? c.code.toLowerCase().includes(query) : false;
        const isPredefined = Boolean(c.is_predefined);
        const statusMatch = isPredefined
          ? 'default'.includes(query) || 'predefined'.includes(query)
          : 'custom'.includes(query);
        return nameMatch || aliasMatch || codeMatch || statusMatch;
      });
    }

    // Sort by display order then name
    return list.sort((a, b) => {
      const orderA = a.display_order ?? 9999;
      const orderB = b.display_order ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });
  }, [categories, activeFilter, searchQuery]);

  // Open create sheet
  const handleAddNew = useCallback(() => {
    openMasterSheet('cost-category', 'create');
  }, [openMasterSheet]);

  // Open edit sheet (reuses CostCategoryForm in MasterFormSheet!)
  const handleEditCategory = useCallback(
    (category: CostCategory) => {
      if (category.is_predefined) return;
      openMasterSheet('cost-category', 'edit', category);
    },
    [openMasterSheet],
  );

  // Search clear helper
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // --- Delete Handlers ---
  const handleOpenDeleteDialog = useCallback((category: CostCategory) => {
    if (category.is_predefined) return;
    setDeleteDialogState({
      isOpen: true,
      category,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogState({
      isOpen: false,
      category: null,
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const categoryToDelete = deleteDialogState.category;
    if (!categoryToDelete || categoryToDelete.is_predefined) return;

    try {
      await deleteCostCategory(categoryToDelete.id).unwrap();

      setToastMessage({
        title: 'Cost Category Deleted',
        desc: `Successfully deleted "${categoryToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: unknown) {
      console.error('Failed to delete cost category:', err);
      const errMsg = getErrorMessage(
        err,
        'Failed to delete Cost Category. Please try again.',
      );
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.category, deleteCostCategory, handleCloseDeleteDialog]);

  return {
    categories,
    filteredCategories,
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
    handleEditCategory,
    // Delete state & handlers
    deleteDialogState,
    isDeleting,
    handleOpenDeleteDialog,
    handleCloseDeleteDialog,
    handleConfirmDelete,
    // Toast state
    toastMessage,
    setToastMessage,
  };
}
