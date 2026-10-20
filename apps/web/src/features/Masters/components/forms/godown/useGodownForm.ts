import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { godownSchema, GodownFormValues } from './schema';
import {
  useCreateGodownMutation,
  useUpdateGodownMutation,
  useGetGodownByIdQuery,
  useGetGodownsQuery,
  GodownItem,
} from '@/features/Masters/api/godownsApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

/**
 * Resolves the parent godown's UUID from parent_id or parent_name.
 */
function resolveParentUUID(
  parentId?: string | null,
  parentName?: string | null,
  godowns: GodownItem[] = [],
): string {
  // 1. Direct UUID match in godowns list
  if (parentId && godowns.some((g) => g.id === parentId)) {
    return parentId;
  }

  // 2. Name match (case-insensitive, trimmed) against available godowns
  if (parentName && parentName.trim().toLowerCase() !== 'primary') {
    const cleanName = parentName.trim().toLowerCase();
    const matched = godowns.find((g) => g.name.trim().toLowerCase() === cleanName);
    if (matched) {
      return matched.id;
    }
  }

  // 3. Match code against available godowns
  if (parentId) {
    const matchedByCode = godowns.find((g) => g.code === parentId);
    if (matchedByCode) {
      return matchedByCode.id;
    }
  }

  // 4. Fallback to parentId if provided
  return parentId || '';
}

export function useGodownForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
  mode: 'create' | 'edit' = 'create',
  initialData?: GodownItem,
) {
  const [createGodown, { isLoading: isCreating }] = useCreateGodownMutation();
  const [updateGodown, { isLoading: isUpdating }] = useUpdateGodownMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Available godowns for parent lookup & UUID resolution
  const { data: godownsList = [] } = useGetGodownsQuery();

  // Fetch full details if in edit mode
  const { data: godownDetail, isLoading: isLoadingDetail } = useGetGodownByIdQuery(
    initialData?.id || '',
    { skip: mode !== 'edit' || !initialData?.id },
  );

  const form = useForm<GodownFormValues>({
    resolver: zodResolver(godownSchema),
    defaultValues: {
      name: initialData?.name || '',
      alias: initialData?.alias || '',
      parentId:
        mode === 'edit'
          ? resolveParentUUID(
              initialData?.parent_id,
              initialData?.parent_name,
              godownsList,
            )
          : '',
    },
  });

  // Re-populate form when edit data arrives, godowns list loads, or mode switches
  useEffect(() => {
    if (mode === 'edit') {
      const activeData = godownDetail || initialData;
      if (activeData) {
        const pId = activeData.parent_id ?? initialData?.parent_id;
        const pName = activeData.parent_name ?? initialData?.parent_name;
        const resolvedParentId = resolveParentUUID(pId, pName, godownsList);

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
  }, [mode, initialData, godownDetail, godownsList, form]);

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
      const activeData = godownDetail || initialData;
      if (mode === 'edit' && initialData?.id) {
        await updateGodown({
          id: initialData.id,
          name: data.name,
          alias: data.alias || '',
          code: activeData?.code || '',
          parent_id: data.parentId || null,
        }).unwrap();
      } else {
        await createGodown({
          name: data.name,
          alias: data.alias || '',
          code: '',
          parent_id: data.parentId || null,
        }).unwrap();
      }
      onSuccess();
    } catch (err: unknown) {
      console.error('Failed to save godown:', err);
      const actionText = mode === 'edit' ? 'update' : 'create';
      const errMsg = getErrorMessage(err, `Failed to ${actionText} Godown. Please try again.`);
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
