import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  useGetLedgersQuery,
  useDeleteLedgerMutation,
} from '@/features/Accounts/Ledger/api';
import type { LedgerDecoratedItem } from '@/features/Accounts/Ledger/types';
import { useGetGroupsQuery } from '@/features/Masters/api/groupsApi';
import { getErrorMessage } from '@/utils/errorUtils';

export function useLedgerList() {
  const navigate = useNavigate();

  // Primary ledgers query
  const {
    data: ledgers = [],
    isLoading: isLoadingLedgers,
    isFetching,
    refetch,
  } = useGetLedgersQuery();

  // Relational query for parent group name lookup
  const { data: groups = [], isLoading: isLoadingGroups } = useGetGroupsQuery();

  // Delete mutation
  const [deleteLedger, { isLoading: isDeleting }] = useDeleteLedgerMutation();

  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    ledger: LedgerDecoratedItem | null;
  }>({
    isOpen: false,
    ledger: null,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Memoized Lookup Map for Groups (parent_id -> group.name)
  const groupMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const group of groups) {
      if (group.id) {
        map.set(group.id, group.name);
      }
    }
    return map;
  }, [groups]);

  // Decorate ledgers with resolved parent group name
  const decoratedLedgers = useMemo<LedgerDecoratedItem[]>(() => {
    return ledgers.map((item) => {
      const parentName = item.parent_id
        ? groupMap.get(item.parent_id) || 'Primary'
        : 'Primary';

      return {
        ...item,
        parent_name: parentName,
      };
    });
  }, [ledgers, groupMap]);

  // Client-side search filtering
  const filteredLedgers = useMemo(() => {
    if (!searchQuery.trim()) return decoratedLedgers;

    const query = searchQuery.toLowerCase().trim();
    return decoratedLedgers.filter((ledger) => {
      const nameMatch = ledger.name?.toLowerCase().includes(query);
      const codeMatch = ledger.code?.toLowerCase().includes(query);
      const parentMatch = ledger.parent_name?.toLowerCase().includes(query);
      return nameMatch || codeMatch || parentMatch;
    });
  }, [decoratedLedgers, searchQuery]);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  const handleAddNew = useCallback(() => {
    navigate({ to: '/accounts/masters/ledger/new' });
  }, [navigate]);

  // Deletion Handlers
  const handleOpenDeleteDialog = useCallback((ledger: LedgerDecoratedItem) => {
    if (ledger.is_predefined) return;
    setDeleteDialogState({
      isOpen: true,
      ledger,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    if (isDeleting) return;
    setDeleteDialogState({
      isOpen: false,
      ledger: null,
    });
  }, [isDeleting]);

  const handleConfirmDelete = useCallback(async () => {
    const ledger = deleteDialogState.ledger;
    if (!ledger?.id) return;

    try {
      await deleteLedger(ledger.id).unwrap();
      setToastMessage({
        title: 'Ledger Deleted',
        desc: `"${ledger.name}" was successfully deleted.`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error, 'Failed to delete ledger');
      setToastMessage({
        title: 'Error Deleting Ledger',
        desc: errorMessage,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.ledger, deleteLedger, handleCloseDeleteDialog]);

  return {
    filteredLedgers,
    totalCount: ledgers.length,
    isLoading: isLoadingLedgers || isLoadingGroups,
    isFetching,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    handleAddNew,
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
