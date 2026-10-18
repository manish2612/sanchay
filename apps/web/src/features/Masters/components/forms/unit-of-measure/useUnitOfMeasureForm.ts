import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { unitOfMeasureSchema, UnitOfMeasureFormValues } from './schema';
import { useCreateStockUnitMutation } from '@/features/Masters/api/stockUnitsApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useUnitOfMeasureForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createStockUnit, { isLoading }] = useCreateStockUnitMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<UnitOfMeasureFormValues>({
    resolver: zodResolver(unitOfMeasureSchema),
    defaultValues: { name: '', alias: '', parentId: '', symbol: '', decimalPlaces: 0, uqcCode: ''  }
  });

  useLeavePromptSlot({
    id: 'unit-of-measure-form',
    isDirty: form.formState.isDirty && !form.formState.isSubmitSuccessful,
    priority: 10,
  });

  // Auto-clear submission error when user edits any field
  useEffect(() => {
    const subscription = form.watch(() => {
      if (submitError) {
        setSubmitError(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, submitError]);

  const onSubmit = async (data: UnitOfMeasureFormValues) => {
    try {
      setSubmitError(null);
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
      const errMsg = getErrorMessage(err, 'Failed to create Unit of Measure. Please try again.');
      setSubmitError(errMsg);
      onError?.('Error', errMsg);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: isLoading,
    submitError,
    clearSubmitError: () => setSubmitError(null),
  };
}
