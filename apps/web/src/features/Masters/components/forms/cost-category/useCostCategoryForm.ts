import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { costCategorySchema, CostCategoryFormValues } from './schema';
import {
  useCreateCostCategoryMutation,
  useUpdateCostCategoryMutation,
  CostCategory,
} from '../../../api/costCategoriesApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useCostCategoryForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
  mode: 'create' | 'edit' = 'create',
  initialData?: CostCategory,
) {
  const [createCostCategory, { isLoading: isCreating }] = useCreateCostCategoryMutation();
  const [updateCostCategory, { isLoading: isUpdating }] = useUpdateCostCategoryMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CostCategoryFormValues>({
    resolver: zodResolver(costCategorySchema),
    defaultValues: {
      name: initialData?.name || '',
      alias: initialData?.alias || '',
      parentId: '',
      allocate_revenue:
        initialData?.allocate_revenue !== undefined
          ? Boolean(initialData.allocate_revenue)
          : true,
      allocate_non_revenue:
        initialData?.allocate_non_revenue !== undefined
          ? Boolean(initialData.allocate_non_revenue)
          : false,
    },
  });

  const { reset } = form;

  // Re-populate form only when initialData ID or mode changes
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      reset({
        name: initialData.name || '',
        alias: initialData.alias || '',
        parentId: '',
        allocate_revenue: Boolean(initialData.allocate_revenue),
        allocate_non_revenue: Boolean(initialData.allocate_non_revenue),
      });
    } else if (mode === 'create') {
      reset({
        name: '',
        alias: '',
        parentId: '',
        allocate_revenue: true,
        allocate_non_revenue: false,
      });
    }
  }, [mode, initialData?.id, reset]);

  useLeavePromptSlot({
    id: 'cost-category-form',
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

  const onSubmit = async (data: CostCategoryFormValues) => {
    try {
      setSubmitError(null);

      const allocateRevenue = Boolean(data.allocate_revenue);
      const allocateNonRevenue = Boolean(data.allocate_non_revenue);

      if (mode === 'edit' && initialData?.id) {
        await updateCostCategory({
          id: initialData.id,
          name: data.name,
          alias: data.alias || null,
          code: initialData.code || null,
          allocate_revenue: allocateRevenue,
          allocate_non_revenue: allocateNonRevenue,
        }).unwrap();
      } else {
        await createCostCategory({
          name: data.name,
          alias: data.alias || '',
          code: '',
          allocate_revenue: allocateRevenue,
          allocate_non_revenue: allocateNonRevenue,
        }).unwrap();
      }

      onSuccess();
    } catch (err: unknown) {
      console.error('Failed to save cost category:', err);
      const actionText = mode === 'edit' ? 'update' : 'create';
      const errMsg = getErrorMessage(err, `Failed to ${actionText} Cost Category. Please try again.`);
      setSubmitError(errMsg);
      if (onError) {
        onError(mode === 'edit' ? 'Update Failed' : 'Creation Failed', errMsg);
      }
    }
  };

  return {
    form,
    onSubmit,
    isLoading: isCreating || isUpdating,
    isSubmitting: isCreating || isUpdating,
    submitError,
    clearSubmitError: () => setSubmitError(null),
    isEditMode: mode === 'edit',
  };
}
