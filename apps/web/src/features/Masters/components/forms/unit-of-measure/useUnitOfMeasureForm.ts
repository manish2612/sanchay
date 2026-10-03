import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { unitOfMeasureSchema, UnitOfMeasureFormValues } from './schema';
import { useCreateStockUnitMutation } from '@/features/Masters/api/stockUnitsApi';

export function useUnitOfMeasureForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createStockUnit, { isLoading }] = useCreateStockUnitMutation();

  const form = useForm<UnitOfMeasureFormValues>({
    resolver: zodResolver(unitOfMeasureSchema),
    defaultValues: { name: '', alias: '', parentId: '', symbol: '', decimalPlaces: 0, uqcCode: ''  }
  });

  const onSubmit = async (data: UnitOfMeasureFormValues) => {
    try {
      await createStockUnit({
        code: '',
        decimal_places: data.decimalPlaces || 0,
        name: data.name,
        symbol: data.symbol || '',
        uqc_code: data.uqcCode,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save unit of measure:', err);
      const errMsg = err?.data?.message || 'Failed to create Unit of Measure. Please try again.';
      onError?.('Error', errMsg);
    }
  };

  return { form, onSubmit, isSubmitting: isLoading };
}
