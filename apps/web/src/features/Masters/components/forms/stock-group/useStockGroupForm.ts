import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockGroupSchema, StockGroupFormValues } from './schema';
import {
  useCreateStockGroupMutation,
  useUpdateStockGroupMutation,
  useGetStockGroupByIdQuery,
  useGetStockGroupsQuery,
  StockGroupItem,
} from '@/features/Masters/api/stockGroupsApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

/**
 * Resolves the parent group's UUID from parent_id or parent_name.
 */
function resolveParentUUID(
  parentId?: string | null,
  parentName?: string | null,
  groups: StockGroupItem[] = [],
): string {
  // 1. Direct UUID match in stock groups list
  if (parentId && groups.some((g) => g.id === parentId)) {
    return parentId;
  }

  // 2. Name match (case-insensitive, trimmed) against available stock groups
  if (parentName && parentName.trim().toLowerCase() !== 'primary') {
    const cleanName = parentName.trim().toLowerCase();
    const matchedGroup = groups.find((g) => g.name.trim().toLowerCase() === cleanName);
    if (matchedGroup) {
      return matchedGroup.id;
    }
  }

  // 3. Fallback to parentId if provided
  return parentId || '';
}

export function useStockGroupForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
  mode: 'create' | 'edit' = 'create',
  initialData?: StockGroupItem,
) {
  const [createStockGroup, { isLoading: isCreating }] = useCreateStockGroupMutation();
  const [updateStockGroup, { isLoading: isUpdating }] = useUpdateStockGroupMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Available groups for parent lookup & UUID resolution
  const { data: stockGroups = [] } = useGetStockGroupsQuery();

  // Fetch full details if in edit mode
  const { data: stockGroupDetail, isLoading: isLoadingDetail } = useGetStockGroupByIdQuery(
    initialData?.id || '',
    { skip: mode !== 'edit' || !initialData?.id },
  );

  const form = useForm<StockGroupFormValues>({
    resolver: zodResolver(stockGroupSchema),
    defaultValues: {
      name: initialData?.name || '',
      alias: initialData?.alias || '',
      parentId: resolveParentUUID(
        initialData?.parent_id,
        initialData?.parent_name,
        stockGroups,
      ),
      localInterstateSales: initialData?.local_sales_ledger_id || '',
      exportSales: initialData?.global_sales_ledger_id || '',
      localInterstatePurchase: initialData?.local_purchase_ledger_id || '',
      exportPurchase: initialData?.global_purchase_ledger_id || '',
    },
  });

  // Re-populate form when edit data arrives, stock groups load, or mode switches
  useEffect(() => {
    if (mode === 'edit') {
      const activeData = stockGroupDetail || initialData;
      if (activeData) {
        const pId = activeData.parent_id ?? initialData?.parent_id;
        const pName = activeData.parent_name ?? initialData?.parent_name;
        const resolvedParentId = resolveParentUUID(pId, pName, stockGroups);

        // If form is already modified by the user, only update parentId if currently empty
        if (form.formState.isDirty) {
          const currentParentId = form.getValues('parentId');
          if (!currentParentId && resolvedParentId) {
            form.setValue('parentId', resolvedParentId, { shouldDirty: false });
          }
          return;
        }

        form.reset({
          name: activeData.name || '',
          alias: activeData.alias || '',
          parentId: resolvedParentId,
          localInterstateSales: activeData.local_sales_ledger_id || '',
          exportSales: activeData.global_sales_ledger_id || '',
          localInterstatePurchase: activeData.local_purchase_ledger_id || '',
          exportPurchase: activeData.global_purchase_ledger_id || '',
        });
      }
    } else {
      form.reset({
        name: '',
        alias: '',
        parentId: '',
        localInterstateSales: '',
        exportSales: '',
        localInterstatePurchase: '',
        exportPurchase: '',
      });
    }
  }, [mode, initialData, stockGroupDetail, stockGroups, form]);

  useLeavePromptSlot({
    id: 'stock-group-form',
    isDirty: form.formState.isDirty && !form.formState.isSubmitSuccessful,
    priority: 10,
  });

  // Auto-clear submission error when user edits any field
  useEffect(() => {
    const subscription = form.watch(() => {
      if (submitError) {
        setSubmitError(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, submitError]);

  const onSubmit = async (data: StockGroupFormValues) => {
    try {
      setSubmitError(null);
      const activeData = stockGroupDetail || initialData;

      if (mode === 'edit' && initialData?.id) {
        await updateStockGroup({
          id: initialData.id,
          name: data.name,
          alias: data.alias || '',
          code: activeData?.code || '',
          parent_id: data.parentId || null,
          local_sales_ledger_id: data.localInterstateSales || null,
          global_sales_ledger_id: data.exportSales || null,
          local_purchase_ledger_id: data.localInterstatePurchase || null,
          global_purchase_ledger_id: data.exportPurchase || null,
        }).unwrap();
      } else {
        await createStockGroup({
          name: data.name,
          alias: data.alias || '',
          code: '',
          parent_id: data.parentId || null,
          local_sales_ledger_id: data.localInterstateSales || null,
          global_sales_ledger_id: data.exportSales || null,
          local_purchase_ledger_id: data.localInterstatePurchase || null,
          global_purchase_ledger_id: data.exportPurchase || null,
        }).unwrap();
      }
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save stock group:', err);
      const actionText = mode === 'edit' ? 'update' : 'create';
      const errMsg = getErrorMessage(err, `Failed to ${actionText} Stock Group. Please try again.`);
      setSubmitError(errMsg);
      onError?.('Error', errMsg);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: isCreating || isUpdating,
    isLoadingDetail,
    submitError,
    clearSubmitError: () => setSubmitError(null),
    isEditMode: mode === 'edit',
  };
}
