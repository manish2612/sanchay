import { useState, useMemo, useEffect, useCallback } from 'react';
import { useGetGroupsQuery, useDeleteGroupMutation, Group } from '@/features/Masters/api/groupsApi';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { getErrorMessage } from '@/utils/errorUtils';

export type GroupFilterType = 'all' | 'predefined' | 'custom';

export function useGroupList() {
  const { data: groups = [], isLoading, isError, refetch } = useGetGroupsQuery();
  const [deleteGroup, { isLoading: isDeleting }] = useDeleteGroupMutation();
  const { openMasterSheet } = useGlobalMasterSheet();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<GroupFilterType>('all');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    group: Group | null;
  }>({
    isOpen: false,
    group: null,
  });

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Calculate high-level summary counts
  const counts = useMemo(() => {
    let predefined = 0;
    let custom = 0;

    for (const g of groups) {
      if (g.is_predefined) predefined++;
      else custom++;
    }

    return {
      total: groups.length,
      predefined,
      custom,
    };
  }, [groups]);

  // Filter and search records
  const filteredGroups = useMemo(() => {
    let list = [...groups];

    // Filter by type tab
    if (activeFilter === 'predefined') {
      list = list.filter((g) => Boolean(g.is_predefined));
    } else if (activeFilter === 'custom') {
      list = list.filter((g) => !g.is_predefined);
    }

    // Filter by search query
    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter((g) => {
        const nameMatch = g.name.toLowerCase().includes(query);
        const aliasMatch = g.alias ? g.alias.toLowerCase().includes(query) : false;
        const primaryGroupMatch = g.primary_group_name
          ? g.primary_group_name.toLowerCase().includes(query)
          : false;
        const categoryMatch = g.category ? g.category.toLowerCase().includes(query) : false;
        const subCategoryMatch = g.sub_category ? g.sub_category.toLowerCase().includes(query) : false;
        const classificationMatch = g.classification
          ? g.classification.toLowerCase().includes(query)
          : false;

        return (
          nameMatch ||
          aliasMatch ||
          primaryGroupMatch ||
          categoryMatch ||
          subCategoryMatch ||
          classificationMatch
        );
      });
    }

    // Sort by display order then name
    return list.sort((a, b) => {
      const orderA = a.display_order ?? 9999;
      const orderB = b.display_order ?? 9999;
      if (orderA !== orderB) return orderA - orderB;
      return a.name.localeCompare(b.name);
    });
  }, [groups, activeFilter, searchQuery]);

  // Add new group sheet trigger
  const handleAddNew = useCallback(() => {
    openMasterSheet('group', 'create');
  }, [openMasterSheet]);

  // Edit group sheet trigger (reuses GroupForm in MasterFormSheet!)
  const handleEditGroup = useCallback(
    (group: Group) => {
      if (group.is_predefined) return;
      openMasterSheet('group', 'edit', group);
    },
    [openMasterSheet],
  );

  // Clear search helper
  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // --- Delete Handlers ---
  const handleOpenDeleteDialog = useCallback((group: Group) => {
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
      await deleteGroup(groupToDelete.id).unwrap();

      setToastMessage({
        title: 'Group Deleted',
        desc: `Successfully deleted "${groupToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: any) {
      console.error('Failed to delete group:', err);
      const errMsg = getErrorMessage(err, 'Failed to delete Group. Please try again.');
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.group, deleteGroup, handleCloseDeleteDialog]);

  // Keyboard shortcut listener: `/` to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        !(
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        )
      ) {
        e.preventDefault();
        const searchInput = document.getElementById('group-list-search');
        searchInput?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    groups,
    filteredGroups,
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
    // Toast state
    toastMessage,
    setToastMessage,
  };
}
