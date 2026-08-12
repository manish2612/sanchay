import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { costCategorySchema, CostCategoryFormValues } from './schema';

export function useCostCategoryForm(onSuccess: () => void) {
  const form = useForm<CostCategoryFormValues>({
    resolver: zodResolver(costCategorySchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = (data: CostCategoryFormValues) => {
    console.log('CostCategory Data:', data);
    onSuccess();
  };

  return { form, onSubmit };
}
