import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockCategorySchema, StockCategoryFormValues } from './schema';
import {
  useCreateStockCategoryMutation,
  useUpdateStockCategoryMutation,
  useGetStockCategoriesQuery,
  useGetStockCategoryByIdQuery,
  StockCategory,
} from '@/features/Masters/api/stockCategoriesApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useStockCategoryForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
  mode: 'create' | 'edit' = 'create',
  initialData?: StockCategory
) {
  const [createStockCategory, { isLoading: isCreating }] = useCreateStockCategoryMutation();
  const [updateStockCategory, { isLoading: isUpdating }] = useUpdateStockCategoryMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Available categories to resolve parent UUID from name or vice-versa
  const { data: stockCategories = [], isLoading: isLoadingCategories } = useGetStockCategoriesQuery();

  // Fetch full details when in edit mode
  const { data: categoryDetail, isLoading: isLoadingDetail } = useGetStockCategoryByIdQuery(
    initialData?.id || '',
    { skip: mode !== 'edit' || !initialData?.id }
  );

  const form = useForm<StockCategoryFormValues>({
    resolver: zodResolver(stockCategorySchema),
    defaultValues: {
      name: initialData?.name || '',
      alias: initialData?.alias || '',
      parentId: initialData?.parent_id || '',
    },
  });

  // Re-populate form when initialData, categoryDetail, or stockCategories list loads
  useEffect(() => {
    if (mode === 'edit') {
      // Don't overwrite form values if the user has already made modifications
      if (form.formState.isDirty) return;

      const activeData = categoryDetail || initialData;
      if (activeData) {
        let resolvedParentId = activeData.parent_id || '';

        // If parent_name is provided in response, resolve the parent's UUID from the categories list
        if (activeData.parent_name) {
          const matchedParentByName = stockCategories.find(
            (c) => c.name.trim().toLowerCase() === activeData.parent_name?.trim().toLowerCase()
          );
          if (matchedParentByName) {
            resolvedParentId = matchedParentByName.id;
          }
        } else if (resolvedParentId) {
          // If parent_id is provided, verify it exists in categories
          const matchedParentById = stockCategories.find((c) => c.id === resolvedParentId);
          if (matchedParentById) {
            resolvedParentId = matchedParentById.id;
          }
        }

        form.reset({
          name: activeData.name || '',
          alias: activeData.alias || '',
          parentId: resolvedParentId,
        });
      }
    } else {
      form.reset({
        name: '',
        alias: '',
        parentId: '',
      });
    }
  }, [mode, initialData, categoryDetail, stockCategories, form]);

  useLeavePromptSlot({
    id: 'stock-category-form',
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

  const onSubmit = async (data: StockCategoryFormValues) => {
    try {
      setSubmitError(null);
      if (mode === 'edit' && initialData?.id) {
        await updateStockCategory({
          id: initialData.id,
          name: data.name,
          alias: data.alias || null,
          code: categoryDetail?.code || initialData?.code || null,
          parent_id: data.parentId || null,
        }).unwrap();
      } else {
        await createStockCategory({
          alias: data.alias || '',
          code: '',
          name: data.name,
          parent_id: data.parentId || null,
        }).unwrap();
      }
      onSuccess();
    } catch (err: unknown) {
      console.error('Failed to save stock category:', err);
      const actionText = mode === 'edit' ? 'update' : 'create';
      const errMsg = getErrorMessage(err, `Failed to ${actionText} Stock Category. Please try again.`);
      setSubmitError(errMsg);
      onError?.(mode === 'edit' ? 'Update Failed' : 'Creation Failed', errMsg);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: isCreating || isUpdating,
    isLoadingCategories,
    isLoadingDetail,
    submitError,
    clearSubmitError: () => setSubmitError(null),
    isEditMode: mode === 'edit',
  };
}
