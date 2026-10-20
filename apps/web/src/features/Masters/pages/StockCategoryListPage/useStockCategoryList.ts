import { useState, useMemo, useCallback } from 'react';
import {
  useGetStockCategoriesQuery,
  useDeleteStockCategoryMutation,
  StockCategory,
} from '@/features/Masters/api/stockCategoriesApi';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { getErrorMessage } from '@/utils/errorUtils';

export type StockCategoryFilterType = 'all' | 'primary' | 'subcategories';

export function useStockCategoryList() {
  const { data: rawCategories = [], isLoading, isError, refetch } = useGetStockCategoriesQuery();
  const [deleteStockCategory, { isLoading: isDeleting }] = useDeleteStockCategoryMutation();
  const { openMasterSheet } = useGlobalMasterSheet();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StockCategoryFilterType>('all');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    category: StockCategory | null;
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

  // Match parent_id and parent_name bidirectionally from current list fetched for listing
  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of rawCategories) {
      if (c.id) {
        map.set(c.id, c.name);
      }
    }
    return map;
  }, [rawCategories]);

  const nameToIdMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const c of rawCategories) {
      if (c.id && c.name) {
        map.set(c.name.trim().toLowerCase(), c.id);
      }
    }
    return map;
  }, [rawCategories]);

  const categoriesWithParent = useMemo(() => {
    return rawCategories.map((c) => {
      // 1. Use parent_name if returned in response, else resolve via parent_id
      const resolvedParentName =
        c.parent_name ||
        (c.parent_id && c.parent_id !== c.id
          ? categoryMap.get(c.parent_id) || null
          : null);

      // 2. Resolve parent_id UUID if missing but parent_name is present
      const resolvedParentId =
        c.parent_id ||
        (resolvedParentName
          ? nameToIdMap.get(resolvedParentName.trim().toLowerCase()) || null
          : null);

      return {
        ...c,
        parent_id: resolvedParentId,
        parent_name: resolvedParentName,
      };
    });
  }, [rawCategories, categoryMap, nameToIdMap]);

  // Compute category counts
  const counts = useMemo(() => {
    let primary = 0;
    let subcategories = 0;

    for (const c of categoriesWithParent) {
      if (c.parent_name) {
        subcategories++;
      } else {
        primary++;
      }
    }

    return {
      total: categoriesWithParent.length,
      primary,
      subcategories,
    };
  }, [categoriesWithParent]);

  // Filter and search records
  const filteredCategories = useMemo(() => {
    let list = [...categoriesWithParent];

    // Filter by type tab
    if (activeFilter === 'primary') {
      list = list.filter((c) => !c.parent_name);
    } else if (activeFilter === 'subcategories') {
      list = list.filter((c) => Boolean(c.parent_name));
    }

    // Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(query);
        const aliasMatch = c.alias ? c.alias.toLowerCase().includes(query) : false;
        const codeMatch = c.code ? c.code.toLowerCase().includes(query) : false;
        const parentMatch = c.parent_name ? c.parent_name.toLowerCase().includes(query) : false;
        const typeMatch = c.is_predefined
          ? 'default'.includes(query)
          : 'custom'.includes(query);
        return nameMatch || aliasMatch || codeMatch || parentMatch || typeMatch;
      });
    }

    // Sort by display order then name
    return list.sort((a, b) => {
      const orderA = a.display_order ?? 9999;
      const orderB = b.display_order ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });
  }, [categoriesWithParent, activeFilter, searchQuery]);

  // Open create sheet
  const handleAddNew = useCallback(() => {
    openMasterSheet('stock-category', 'create');
  }, [openMasterSheet]);

  // Open edit sheet (reuses StockCategoryForm in MasterFormSheet)
  const handleEditCategory = useCallback(
    (category: StockCategory) => {
      if (category.is_predefined) return;
      openMasterSheet('stock-category', 'edit', category);
    },
    [openMasterSheet],
  );

  // Search clear helper
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // --- Delete Handlers ---
  const handleOpenDeleteDialog = useCallback((category: StockCategory) => {
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
      await deleteStockCategory(categoryToDelete.id).unwrap();

      setToastMessage({
        title: 'Stock Category Deleted',
        desc: `Successfully deleted "${categoryToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: unknown) {
      console.error('Failed to delete stock category:', err);
      const errMsg = getErrorMessage(
        err,
        'Failed to delete Stock Category. Please try again.',
      );
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.category, deleteStockCategory, handleCloseDeleteDialog]);

  return {
    categories: categoriesWithParent,
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
