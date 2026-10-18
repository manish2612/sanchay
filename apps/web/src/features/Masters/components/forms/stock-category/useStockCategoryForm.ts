import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockCategorySchema, StockCategoryFormValues } from './schema';
import { useCreateStockCategoryMutation } from '@/features/Masters/api/stockCategoriesApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useStockCategoryForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createStockCategory, { isLoading }] = useCreateStockCategoryMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<StockCategoryFormValues>({
    resolver: zodResolver(stockCategorySchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

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
      await createStockCategory({
        alias: data.alias || '',
        code: '',
        name: data.name,
        parent_id: data.parentId || null,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save stock category:', err);
      const errMsg = getErrorMessage(err, 'Failed to create Stock Category. Please try again.');
      setSubmitError(errMsg);
      onError?.('Error', errMsg);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: isLoading,
    submitError,
    clearSubmitError: () => setSubmitError(null),
  };
}
