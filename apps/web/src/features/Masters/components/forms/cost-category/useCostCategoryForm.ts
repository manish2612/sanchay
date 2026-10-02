import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { costCategorySchema, CostCategoryFormValues } from './schema';
import { useCreateCostCategoryMutation } from '../../../api/costCategoriesApi';

export function useCostCategoryForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const form = useForm<CostCategoryFormValues>({
    resolver: zodResolver(costCategorySchema),
    defaultValues: { name: '', alias: '', parentId: '' }
  });

  const [createCostCategory, { isLoading }] = useCreateCostCategoryMutation();

  const onSubmit = async (data: CostCategoryFormValues) => {
    try {
      await createCostCategory({
        name: data.name,
        alias: data.alias || '',
        allocate_non_revenue: false,
        allocate_revenue: false,
        code: ''
      }).unwrap();
      
      onSuccess();
    } catch (err: any) {
      if (onError) {
        onError('Creation Failed', err?.data?.message || 'Failed to create cost category. Please try again.');
      }
    }
  };

  return { form, onSubmit, isLoading };
}
