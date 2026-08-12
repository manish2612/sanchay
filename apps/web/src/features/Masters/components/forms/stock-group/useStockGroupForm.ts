import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockGroupSchema, StockGroupFormValues } from './schema';

export function useStockGroupForm(onSuccess: () => void) {
  const form = useForm<StockGroupFormValues>({
    resolver: zodResolver(stockGroupSchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = (data: StockGroupFormValues) => {
    console.log('StockGroup Data:', data);
    onSuccess();
  };

  return { form, onSubmit };
}
