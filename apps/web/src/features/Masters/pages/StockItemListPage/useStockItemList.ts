import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  useGetStockItemsQuery,
  useDeleteStockItemMutation,
} from '@/features/Inventory/StockItem/api';
import type {
  StockItemDecoratedItem,
  StockItemListItem,
} from '@/features/Inventory/StockItem/types';
import { useGetStockGroupsQuery } from '@/features/Masters/api/stockGroupsApi';
import { useGetStockCategoriesQuery } from '@/features/Masters/api/stockCategoriesApi';
import { useGetStockUnitsQuery } from '@/features/Masters/api/stockUnitsApi';
import { getErrorMessage } from '@/utils/errorUtils';

export function useStockItemList() {
  const navigate = useNavigate();

  // Primary stock items query
  const {
    data: stockItems = [],
    isLoading: isLoadingItems,
    isFetching,
    refetch,
  } = useGetStockItemsQuery();

  // Relational queries for ID-to-name lookup
  const { data: stockGroups = [], isLoading: isLoadingGroups } = useGetStockGroupsQuery();
  const { data: stockCategories = [], isLoading: isLoadingCategories } = useGetStockCategoriesQuery();
  const { data: stockUnits = [], isLoading: isLoadingUnits } = useGetStockUnitsQuery();

  // Delete mutation
  const [deleteStockItem, { isLoading: isDeleting }] = useDeleteStockItemMutation();

  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    item: StockItemDecoratedItem | null;
  }>({
    isOpen: false,
    item: null,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Memoized Lookup Maps
  const groupMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const group of stockGroups) {
      if (group.id) {
        map.set(group.id, group.name);
      }
    }
    return map;
  }, [stockGroups]);

  const categoryMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const cat of stockCategories) {
      if (cat.id) {
        map.set(cat.id, cat.name);
      }
    }
    return map;
  }, [stockCategories]);

  const unitMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const unit of stockUnits) {
      if (unit.id) {
        const displayName =
          unit.name && unit.symbol && unit.name !== unit.symbol
            ? `${unit.name} (${unit.symbol})`
            : unit.name || unit.symbol || '';
        map.set(unit.id, displayName);
      }
    }
    return map;
  }, [stockUnits]);

  // Decorate stock items with resolved names from row-level IDs
  const decoratedStockItems = useMemo<StockItemDecoratedItem[]>(() => {
    return stockItems.map((item: StockItemListItem) => {
      const groupName = item.stock_group_id ? groupMap.get(item.stock_group_id) || '—' : '—';
      const categoryName = item.stock_category_id ? categoryMap.get(item.stock_category_id) || '—' : '—';
      const unitName = item.base_unit_id ? unitMap.get(item.base_unit_id) || '—' : '—';

      return {
        ...item,
        stock_group_name: groupName,
        stock_category_name: categoryName,
        unit_name: unitName,
      };
    });
  }, [stockItems, groupMap, categoryMap, unitMap]);

  // Search filter
  const filteredStockItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return decoratedStockItems;

    return decoratedStockItems.filter((item) => {
      const nameMatch = item.name ? item.name.toLowerCase().includes(query) : false;
      const groupMatch =
        item.stock_group_name && item.stock_group_name !== '—'
          ? item.stock_group_name.toLowerCase().includes(query)
          : false;
      const categoryMatch =
        item.stock_category_name && item.stock_category_name !== '—'
          ? item.stock_category_name.toLowerCase().includes(query)
          : false;
      const unitMatch =
        item.unit_name && item.unit_name !== '—'
          ? item.unit_name.toLowerCase().includes(query)
          : false;
      const codeMatch = item.item_code ? item.item_code.toLowerCase().includes(query) : false;

      return nameMatch || groupMatch || categoryMatch || unitMatch || codeMatch;
    });
  }, [decoratedStockItems, searchQuery]);

  // Navigation: Navigate to the full page create wizard
  const handleAddNew = useCallback(() => {
    navigate({ to: '/inventory/masters/stock-item/new' });
  }, [navigate]);

  // Search clear helper
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // --- Delete Handlers ---
  const handleOpenDeleteDialog = useCallback((item: StockItemDecoratedItem) => {
    setDeleteDialogState({
      isOpen: true,
      item,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogState({
      isOpen: false,
      item: null,
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const itemToDelete = deleteDialogState.item;
    if (!itemToDelete) return;

    try {
      await deleteStockItem(itemToDelete.id).unwrap();

      setToastMessage({
        title: 'Stock Item Deleted',
        desc: `Successfully deleted "${itemToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: unknown) {
      console.error('Failed to delete stock item:', err);
      const errMsg = getErrorMessage(err, 'Failed to delete Stock Item. Please try again.');
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.item, deleteStockItem, handleCloseDeleteDialog]);

  const isLoading = isLoadingItems || isLoadingGroups || isLoadingCategories || isLoadingUnits;

  return {
    stockItems,
    filteredStockItems,
    totalCount: stockItems.length,
    isLoading,
    isFetching,
    refetch,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    handleAddNew,
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
