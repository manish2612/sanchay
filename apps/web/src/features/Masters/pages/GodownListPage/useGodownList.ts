import { useState, useMemo, useCallback } from 'react';
import {
  useGetGodownsQuery,
  useDeleteGodownMutation,
  GodownItem,
} from '@/features/Masters/api/godownsApi';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { getErrorMessage } from '@/utils/errorUtils';

export interface GodownDecoratedItem extends GodownItem {
  parent_name: string | null;
}

export type GodownFilterType = 'all' | 'primary' | 'subgodown';

export const isPredefinedRecord = (item?: { is_predefined?: boolean | number | string | null } | null): boolean => {
  if (!item) return false;
  return (
    item.is_predefined === true ||
    (item.is_predefined as unknown) === 1 ||
    (item.is_predefined as unknown) === '1' ||
    (item.is_predefined as unknown) === 'true'
  );
};

export function useGodownList() {
  const { data: godowns = [], isLoading, isError, refetch } = useGetGodownsQuery();
  const [deleteGodown, { isLoading: isDeleting }] = useDeleteGodownMutation();
  const { openMasterSheet } = useGlobalMasterSheet();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<GodownFilterType>('all');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    godown: GodownDecoratedItem | null;
  }>({
    isOpen: false,
    godown: null,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Decorate godowns and build lookup map for parent resolution
  const { decoratedGodowns, godownMap } = useMemo(() => {
    const map = new Map<string, GodownDecoratedItem>();
    const tempDecorated: GodownDecoratedItem[] = godowns.map((item) => ({
      ...item,
      parent_name: item.parent_name || null,
    }));

    for (const item of tempDecorated) {
      if (item.id) {
        map.set(item.id, item);
      }
      if (item.code) {
        map.set(item.code, item);
      }
    }

    for (const item of tempDecorated) {
      if (!item.parent_name && item.parent_id && item.parent_id !== item.id) {
        const parent = map.get(item.parent_id);
        if (parent) {
          item.parent_name = parent.name;
        }
      }
    }

    return {
      decoratedGodowns: tempDecorated,
      godownMap: map,
    };
  }, [godowns]);

  // Helper to determine if a godown is primary (top-level)
  const isPrimaryGodown = useCallback((g: GodownDecoratedItem) => {
    if (g.parent_id && g.parent_id !== g.id) return false;
    if (g.parent_name && g.parent_name.trim().toLowerCase() !== 'primary') return false;
    return true;
  }, []);

  // Compute counts
  const counts = useMemo(() => {
    let primary = 0;
    let subgodown = 0;

    for (const g of decoratedGodowns) {
      if (isPrimaryGodown(g)) {
        primary++;
      } else {
        subgodown++;
      }
    }

    return {
      total: decoratedGodowns.length,
      primary,
      subgodown,
    };
  }, [decoratedGodowns, isPrimaryGodown]);

  // Filter and search records
  const filteredGodowns = useMemo(() => {
    let list = [...decoratedGodowns];

    // Filter by tab
    if (activeFilter === 'primary') {
      list = list.filter(isPrimaryGodown);
    } else if (activeFilter === 'subgodown') {
      list = list.filter((g) => !isPrimaryGodown(g));
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
  }, [decoratedGodowns, activeFilter, searchQuery]);

  // Open create sheet
  const handleAddNew = useCallback(() => {
    openMasterSheet('godown', 'create');
  }, [openMasterSheet]);

  // Open edit sheet
  const handleEditGodown = useCallback(
    (godown: GodownDecoratedItem) => {
      if (isPredefinedRecord(godown)) return;
      openMasterSheet('godown', 'edit', godown);
    },
    [openMasterSheet],
  );

  // Search clear helper
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // --- Delete Handlers ---
  const handleOpenDeleteDialog = useCallback((godown: GodownDecoratedItem) => {
    if (isPredefinedRecord(godown)) return;
    setDeleteDialogState({
      isOpen: true,
      godown,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setDeleteDialogState({
      isOpen: false,
      godown: null,
    });
  }, []);

  const handleConfirmDelete = useCallback(async () => {
    const godownToDelete = deleteDialogState.godown;
    if (!godownToDelete || isPredefinedRecord(godownToDelete)) return;

    try {
      await deleteGodown(godownToDelete.id).unwrap();

      setToastMessage({
        title: 'Godown Deleted',
        desc: `Successfully deleted "${godownToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: unknown) {
      console.error('Failed to delete godown:', err);
      const errMsg = getErrorMessage(err, 'Failed to delete Godown. Please try again.');
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.godown, deleteGodown, handleCloseDeleteDialog]);

  return {
    godowns,
    godownMap,
    decoratedGodowns,
    filteredGodowns,
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
    handleEditGodown,
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
