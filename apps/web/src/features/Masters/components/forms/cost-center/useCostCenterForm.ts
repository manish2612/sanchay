import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { costCenterSchema, CostCenterFormValues } from './schema';
import { useCreateCostCenterMutation } from '@/features/Masters/api/costCentersApi';

export function useCostCenterForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createCostCenter, { isLoading }] = useCreateCostCenterMutation();

  const form = useForm<CostCenterFormValues>({
    resolver: zodResolver(costCenterSchema) as any,
    defaultValues: { name: '', alias: '', parentId: '', costCategoryId: '', openingBalanceType: 'Dr' }
  });

  const onSubmit = async (data: CostCenterFormValues) => {
    try {
      await createCostCenter({
        alias: data.alias || '',
        code: '',
        cost_category_id: data.costCategoryId,
        name: data.name,
        parent_id: null,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save cost center:', err);
      const errMsg = err?.data?.message || 'Failed to create Cost Center. Please try again.';
      onError?.('Error', errMsg);
    }
  };

  return { form, onSubmit, isSubmitting: isLoading };
}
