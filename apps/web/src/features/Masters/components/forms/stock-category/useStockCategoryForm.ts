import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockCategorySchema, StockCategoryFormValues } from './schema';

export function useStockCategoryForm(onSuccess: () => void) {
  const form = useForm<StockCategoryFormValues>({
    resolver: zodResolver(stockCategorySchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = (data: StockCategoryFormValues) => {
    console.log('StockCategory Data:', data);
    onSuccess();
  };

  return { form, onSubmit };
}
