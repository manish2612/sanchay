import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockCategorySchema, StockCategoryFormValues } from './schema';
import { useCreateStockCategoryMutation } from '@/features/Masters/api/stockCategoriesApi';

export function useStockCategoryForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createStockCategory, { isLoading }] = useCreateStockCategoryMutation();

  const form = useForm<StockCategoryFormValues>({
    resolver: zodResolver(stockCategorySchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = async (data: StockCategoryFormValues) => {
    try {
      await createStockCategory({
        alias: data.alias || '',
        code: '',
        name: data.name,
        parent_id: data.parentId || null,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save stock category:', err);
      const errMsg = err?.data?.message || 'Failed to create Stock Category. Please try again.';
      onError?.('Error', errMsg);
    }
  };

  return { form, onSubmit, isSubmitting: isLoading };
}
