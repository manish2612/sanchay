import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { groupSchema, GroupFormValues } from './schema';
import { useCreateGroupMutation } from '@/features/Masters/api/groupsApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useGroupForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createGroup, { isLoading }] = useCreateGroupMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  useLeavePromptSlot({
    id: 'group-form',
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

  const onSubmit = async (data: GroupFormValues) => {
    try {
      setSubmitError(null);
      await createGroup({
        alias: data.alias || '',
        code: '',
        name: data.name,
        parent_id: data.parentId,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save group:', err);
      const errMsg = getErrorMessage(err, 'Failed to create Group. Please try again.');
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
