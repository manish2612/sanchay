import { useState, useMemo, useCallback } from 'react';
import {
  useGetTaxGroupsQuery,
  useDeleteTaxGroupMutation,
} from '@/features/Masters/api/taxGroupsApi';
import type { TaxGroupResponse } from '@/features/Masters/types/taxGroup';
import { useGlobalMasterSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { getErrorMessage } from '@/utils/errorUtils';

export type TaxGroupFilterType = 'all' | 'active' | 'inactive';

export function useTaxGroupList() {
  const { data: taxGroups = [], isLoading, isError, refetch } = useGetTaxGroupsQuery();
  const [deleteTaxGroup, { isLoading: isDeleting }] = useDeleteTaxGroupMutation();
  const { openMasterSheet } = useGlobalMasterSheet();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<TaxGroupFilterType>('all');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    taxGroup: TaxGroupResponse | null;
  }>({
    isOpen: false,
    taxGroup: null,
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

    for (const item of taxGroups) {
      if (item.is_active !== false) {
        active++;
      } else {
        inactive++;
      }
    }

    return {
      total: taxGroups.length,
      active,
      inactive,
    };
  }, [taxGroups]);

  // Filter and search records
  const filteredTaxGroups = useMemo(() => {
    let list = [...taxGroups];

    // Filter by status tab
    if (activeFilter === 'active') {
      list = list.filter((item) => item.is_active !== false);
    } else if (activeFilter === 'inactive') {
      list = list.filter((item) => item.is_active === false);
    }

    // Filter by search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((item) => {
        const nameMatch = (item.name || '').toLowerCase().includes(q);
        const codeMatch = (item.code || '').toLowerCase().includes(q);
        const taxTypeMatch = (item.tax_type_name || '').toLowerCase().includes(q);
        const componentMatch = (item.components || []).some(
          (c) =>
            (c.taxgroup_component_name || '').toLowerCase().includes(q) ||
            (c.input_ledger_name || '').toLowerCase().includes(q) ||
            (c.output_ledger_name || '').toLowerCase().includes(q)
        );
        return nameMatch || codeMatch || taxTypeMatch || componentMatch;
      });
    }

    return list;
  }, [taxGroups, activeFilter, searchQuery]);

  const handleAddNew = useCallback(() => {
    openMasterSheet('tax-group', 'create');
  }, [openMasterSheet]);

  const handleEditTaxGroup = useCallback(
    (taxGroup: TaxGroupResponse) => {
      if (taxGroup.is_predefined) return;
      openMasterSheet('tax-group', 'edit', taxGroup);
    },
    [openMasterSheet]
  );

  const handleOpenDeleteDialog = useCallback((taxGroup: TaxGroupResponse) => {
    if (taxGroup.is_predefined) return;
    setDeleteDialogState({
      isOpen: true,
      taxGroup,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    if (isDeleting) return;
    setDeleteDialogState({
      isOpen: false,
      taxGroup: null,
    });
  }, [isDeleting]);

  const handleConfirmDelete = useCallback(async () => {
    if (!deleteDialogState.taxGroup) return;

    const groupName = deleteDialogState.taxGroup.name;
    const groupId = deleteDialogState.taxGroup.id;

    try {
      await deleteTaxGroup(groupId).unwrap();
      setDeleteDialogState({ isOpen: false, taxGroup: null });
      setToastMessage({
        title: 'Tax Group Deleted',
        desc: `"${groupName}" was deleted successfully.`,
        variant: 'success',
      });
    } catch (err: any) {
      console.error('Failed to delete tax group:', err);
      const errMsg = getErrorMessage(err, 'Failed to delete tax group. Please try again.');
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.taxGroup, deleteTaxGroup]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    filteredTaxGroups,
    isLoading,
    isError,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    activeFilter,
    setActiveFilter,
    counts,
    handleAddNew,
    handleEditTaxGroup,
    refetch,
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
