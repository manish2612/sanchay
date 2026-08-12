import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { unitOfMeasureSchema, UnitOfMeasureFormValues } from './schema';

export function useUnitOfMeasureForm(onSuccess: () => void) {
  const form = useForm<UnitOfMeasureFormValues>({
    resolver: zodResolver(unitOfMeasureSchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = (data: UnitOfMeasureFormValues) => {
    console.log('UnitOfMeasure Data:', data);
    onSuccess();
  };

  return { form, onSubmit };
}
