import { useState, useMemo, useCallback } from 'react';
import {
  useGetStockGroupsQuery,
  useDeleteStockGroupMutation,
  StockGroupItem,
} from '@/features/Masters/api/stockGroupsApi';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { getErrorMessage } from '@/utils/errorUtils';

export interface StockGroupDecoratedItem extends StockGroupItem {
  parent_name: string | null;
}

export type StockGroupFilterType = 'all' | 'primary' | 'subgroup';

export function useStockGroupList() {
  const { data: stockGroups = [], isLoading, isError, refetch } = useGetStockGroupsQuery();
  const [deleteStockGroup, { isLoading: isDeleting }] = useDeleteStockGroupMutation();
  const { openMasterSheet } = useGlobalMasterSheet();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<StockGroupFilterType>('all');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    group: StockGroupDecoratedItem | null;
  }>({
    isOpen: false,
    group: null,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Helper to determine if a group is a subgroup
  const checkIsSubgroup = useCallback((g: { parent_id?: string | null; parent_name?: string | null; id?: string }) => {
    if (g.parent_id && g.parent_id !== g.id) return true;
    if (g.parent_name && g.parent_name.trim().toLowerCase() !== 'primary') return true;
    return false;
  }, []);

  // Decorate stock groups by prioritizing response parent_name, or resolving parent_id against current list
  const decoratedStockGroups = useMemo<StockGroupDecoratedItem[]>(() => {
    const groupMap = new Map<string, StockGroupItem>();
    for (const item of stockGroups) {
      if (item.id) {
        groupMap.set(item.id, item);
      }
    }

    return stockGroups.map((item) => {
      let parentName: string | null = null;
      if (item.parent_name) {
        parentName = item.parent_name;
      } else if (item.parent_id && item.parent_id !== item.id) {
        const parent = groupMap.get(item.parent_id);
        if (parent) {
          parentName = parent.name;
        }
      }

      return {
        ...item,
        parent_name: parentName,
      };
    });
  }, [stockGroups]);

  // Compute counts
  const counts = useMemo(() => {
    let primary = 0;
    let subgroup = 0;

    for (const g of decoratedStockGroups) {
      if (checkIsSubgroup(g)) {
        subgroup++;
      } else {
        primary++;
      }
    }

    return {
      total: decoratedStockGroups.length,
      primary,
      subgroup,
    };
  }, [decoratedStockGroups, checkIsSubgroup]);

  // Filter and search records
  const filteredStockGroups = useMemo(() => {
    let list = [...decoratedStockGroups];

    // Filter by tab
    if (activeFilter === 'primary') {
      list = list.filter((g) => !checkIsSubgroup(g));
    } else if (activeFilter === 'subgroup') {
      list = list.filter((g) => checkIsSubgroup(g));
    }

    // Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter((g) => {
        const nameMatch = (g.name || '').toLowerCase().includes(query);
        const aliasMatch = g.alias ? g.alias.toLowerCase().includes(query) : false;
        const codeMatch = g.code ? g.code.toLowerCase().includes(query) : false;
        const parentMatch = g.parent_name ? g.parent_name.toLowerCase().includes(query) : false;
        return nameMatch || aliasMatch || codeMatch || parentMatch;
      });
    }

    // Sort alphabetically by name
    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [decoratedStockGroups, activeFilter, searchQuery]);

  // Open create sheet
  const handleAddNew = useCallback(() => {
    openMasterSheet('stock-group', 'create');
  }, [openMasterSheet]);

  // Open edit sheet
  const handleEditGroup = useCallback(
    (group: StockGroupDecoratedItem) => {
      if (group.is_predefined) return;
      openMasterSheet('stock-group', 'edit', group);
    },
    [openMasterSheet],
  );

  // Search clear helper
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // --- Delete Handlers ---
  const handleOpenDeleteDialog = useCallback((group: StockGroupDecoratedItem) => {
    if (group.is_predefined) return;
    setDeleteDialogState({
      isOpen: true,
      group,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogState({
      isOpen: false,
      group: null,
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const groupToDelete = deleteDialogState.group;
    if (!groupToDelete) return;

    try {
      await deleteStockGroup(groupToDelete.id).unwrap();

      setToastMessage({
        title: 'Stock Group Deleted',
        desc: `Successfully deleted "${groupToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: unknown) {
      console.error('Failed to delete stock group:', err);
      const errMsg = getErrorMessage(err, 'Failed to delete Stock Group. Please try again.');
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.group, deleteStockGroup, handleCloseDeleteDialog]);

  return {
    stockGroups,
    decoratedStockGroups,
    filteredStockGroups,
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
    handleEditGroup,
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
