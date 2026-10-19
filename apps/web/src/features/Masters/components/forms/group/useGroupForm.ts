import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { groupSchema, GroupFormValues } from './schema';
import {
  useCreateGroupMutation,
  useUpdateGroupMutation,
  useGetGroupsQuery,
  useGetGroupByIdQuery,
  Group,
} from '@/features/Masters/api/groupsApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useGroupForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
  mode: 'create' | 'edit' = 'create',
  initialData?: Group
) {
  const [createGroup, { isLoading: isCreating }] = useCreateGroupMutation();
  const [updateGroup, { isLoading: isUpdating }] = useUpdateGroupMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Available groups for parent lookup
  const { data: groups = [] } = useGetGroupsQuery();

  // Fetch full details (returns parent_name) when in edit mode
  const { data: groupDetail, isLoading: isLoadingDetail } = useGetGroupByIdQuery(
    initialData?.id || '',
    { skip: mode !== 'edit' || !initialData?.id }
  );

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      name: initialData?.name || '',
      alias: initialData?.alias || '',
      parentId: '',
    },
  });

  // Re-populate or reset form when initialData, groupDetail, or mode changes
  useEffect(() => {
    if (mode === 'edit') {
      if (groupDetail) {
        // Resolve parent_id from parent_name returned by GET /accounting/groups/{id}
        const matchedParent = groupDetail.parent_name
          ? groups.find((g) => g.name === groupDetail.parent_name)
          : undefined;

        form.reset({
          name: groupDetail.name || '',
          alias: groupDetail.alias || '',
          parentId: matchedParent ? matchedParent.id : '',
        });
      } else if (initialData) {
        form.reset({
          name: initialData.name || '',
          alias: initialData.alias || '',
          parentId: '',
        });
      }
    } else {
      form.reset({
        name: '',
        alias: '',
        parentId: '',
      });
    }
  }, [mode, initialData, groupDetail, groups, form]);

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
      if (mode === 'edit' && initialData?.id) {
        await updateGroup({
          id: initialData.id,
          name: data.name,
          alias: data.alias || '',
          parent_id: data.parentId || null,
          code: groupDetail?.code || '',
        }).unwrap();
      } else {
        await createGroup({
          alias: data.alias || '',
          code: '',
          name: data.name,
          parent_id: data.parentId,
        }).unwrap();
      }
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save group:', err);
      const actionText = mode === 'edit' ? 'update' : 'create';
      const errMsg = getErrorMessage(err, `Failed to ${actionText} Group. Please try again.`);
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
