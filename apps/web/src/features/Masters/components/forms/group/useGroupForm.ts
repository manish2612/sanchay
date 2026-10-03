import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { groupSchema, GroupFormValues } from './schema';
import { useCreateGroupMutation } from '@/features/Masters/api/groupsApi';

export function useGroupForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createGroup, { isLoading }] = useCreateGroupMutation();

  const form = useForm<GroupFormValues>({
    resolver: zodResolver(groupSchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = async (data: GroupFormValues) => {
    try {
      await createGroup({
        alias: data.alias || '',
        code: '',
        name: data.name,
        parent_id: data.parentId || null,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save group:', err);
      const errMsg = err?.data?.message || 'Failed to create Group. Please try again.';
      onError?.('Error', errMsg);
    }
  };

  return { form, onSubmit, isSubmitting: isLoading };
}
