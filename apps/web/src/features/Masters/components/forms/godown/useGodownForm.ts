import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { godownSchema, GodownFormValues } from './schema';
import { useCreateGodownMutation } from '@/features/Masters/api/godownsApi';

export function useGodownForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createGodown, { isLoading }] = useCreateGodownMutation();

  const form = useForm<GodownFormValues>({
    resolver: zodResolver(godownSchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = async (data: GodownFormValues) => {
    try {
      await createGodown({
        alias: data.alias || '',
        code: '',
        name: data.name,
        parent_id: data.parentId || null,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save godown:', err);
      const errMsg = err?.data?.message || 'Failed to create Godown. Please try again.';
      onError?.('Error', errMsg);
    }
  };

  return { form, onSubmit, isSubmitting: isLoading };
}
