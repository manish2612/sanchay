import { useState, useMemo, useCallback } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  useGetVoucherTypesQuery,
  useDeleteVoucherTypeMutation,
} from './api';
import type { VoucherType } from './types';
import { getErrorMessage } from '@/utils/errorUtils';

export function useVoucherTypeList() {
  const navigate = useNavigate();
  const {
    data: voucherTypes = [],
    isLoading,
    isFetching,
    refetch,
  } = useGetVoucherTypesQuery();
  const [deleteVoucherType, { isLoading: isDeleting }] = useDeleteVoucherTypeMutation();

  const [searchQuery, setSearchQuery] = useState('');

  // Delete modal state
  const [deleteDialogState, setDeleteDialogState] = useState<{
    isOpen: boolean;
    voucherType: VoucherType | null;
  }>({
    isOpen: false,
    voucherType: null,
  });

  // Feedback Toast state
  const [toastMessage, setToastMessage] = useState<{
    title: string;
    desc: string;
    variant?: 'success' | 'destructive' | 'default';
  } | null>(null);

  // Client-side search & sort filtering
  const filteredVoucherTypes = useMemo(() => {
    let list = [...voucherTypes];

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter((vt) => {
        const nameMatch = vt.name?.toLowerCase().includes(query);
        const categoryMatch = vt.category?.toLowerCase().includes(query);
        const viewModeMatch = vt.view_mode?.toLowerCase().includes(query);
        return Boolean(nameMatch || categoryMatch || viewModeMatch);
      });
    }

    return list.sort((a, b) => a.name.localeCompare(b.name));
  }, [voucherTypes, searchQuery]);

  // Navigation to create wizard
  const handleAddNew = useCallback(() => {
    navigate({ to: '/accounts/masters/voucher-type/new' });
  }, [navigate]);

  // Edit handler placeholder (disabled in UI for now)
  const handleEditVoucherType = useCallback((voucherType: VoucherType) => {
    if (voucherType.is_predefined) return;
    // In future: navigate or open sheet
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  // Delete Handlers
  const handleOpenDeleteDialog = useCallback((voucherType: VoucherType) => {
    if (voucherType.is_predefined) return;
    setDeleteDialogState({
      isOpen: true,
      voucherType,
    });
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    if (isDeleting) return;
    setDeleteDialogState({
      isOpen: false,
      voucherType: null,
    });
  }, [isDeleting]);

  const handleConfirmDelete = useCallback(async () => {
    const vtToDelete = deleteDialogState.voucherType;
    if (!vtToDelete?.id) return;

    try {
      await deleteVoucherType(vtToDelete.id).unwrap();

      setToastMessage({
        title: 'Voucher Type Deleted',
        desc: `Successfully deleted "${vtToDelete.name}".`,
        variant: 'success',
      });
      handleCloseDeleteDialog();
    } catch (err: unknown) {
      const errMsg = getErrorMessage(
        err,
        'Failed to delete Voucher Type. Please try again.'
      );
      setToastMessage({
        title: 'Delete Failed',
        desc: errMsg,
        variant: 'destructive',
      });
    }
  }, [deleteDialogState.voucherType, deleteVoucherType, handleCloseDeleteDialog]);

  return {
    voucherTypes,
    filteredVoucherTypes,
    totalCount: voucherTypes.length,
    isLoading,
    isFetching,
    refetch,
    searchQuery,
    setSearchQuery,
    handleClearSearch,
    handleAddNew,
    handleEditVoucherType,
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
