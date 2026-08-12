import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { godownSchema, GodownFormValues } from './schema';

export function useGodownForm(onSuccess: () => void) {
  const form = useForm<GodownFormValues>({
    resolver: zodResolver(godownSchema),
    defaultValues: { name: '', alias: '', parentId: ''  }
  });

  const onSubmit = (data: GodownFormValues) => {
    console.log('Godown Data:', data);
    onSuccess();
  };

  return { form, onSubmit };
}
