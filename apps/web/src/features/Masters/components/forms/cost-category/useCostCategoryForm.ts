import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { costCategorySchema, CostCategoryFormValues } from './schema';
import { useCreateCostCategoryMutation } from '../../../api/costCategoriesApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useCostCategoryForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createCostCategory, { isLoading }] = useCreateCostCategoryMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<CostCategoryFormValues>({
    resolver: zodResolver(costCategorySchema),
    defaultValues: { name: '', alias: '', parentId: '' }
  });

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
      await createCostCategory({
        name: data.name,
        alias: data.alias || '',
        allocate_non_revenue: false,
        allocate_revenue: false,
        code: ''
      }).unwrap();
      
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save cost category:', err);
      const errMsg = getErrorMessage(err, 'Failed to create cost category. Please try again.');
      setSubmitError(errMsg);
      if (onError) {
        onError('Creation Failed', errMsg);
      }
    }
  };

  return {
    form,
    onSubmit,
    isLoading,
    isSubmitting: isLoading,
    submitError,
    clearSubmitError: () => setSubmitError(null),
  };
}
