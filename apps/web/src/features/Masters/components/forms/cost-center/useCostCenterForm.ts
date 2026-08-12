import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { costCenterSchema, CostCenterFormValues } from './schema';

export function useCostCenterForm(onSuccess: () => void) {
  const form = useForm<CostCenterFormValues>({
    resolver: zodResolver(costCenterSchema),
    defaultValues: { name: '', alias: '', parentId: '' , openingBalanceType: 'Dr' }
  });

  const onSubmit = (data: CostCenterFormValues) => {
    console.log('CostCenter Data:', data);
    onSuccess();
  };

  return { form, onSubmit };
}
