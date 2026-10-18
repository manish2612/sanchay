import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { godownSchema, GodownFormValues } from './schema';
import { useCreateGodownMutation } from '@/features/Masters/api/godownsApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useGodownForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createGodown, { isLoading }] = useCreateGodownMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<GodownFormValues>({
    resolver: zodResolver(godownSchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  useLeavePromptSlot({
    id: 'godown-form',
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

  const onSubmit = async (data: GodownFormValues) => {
    try {
      setSubmitError(null);
      await createGodown({
        alias: data.alias || '',
        code: '',
        name: data.name,
        parent_id: data.parentId || null,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save godown:', err);
      const errMsg = getErrorMessage(err, 'Failed to create Godown. Please try again.');
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
