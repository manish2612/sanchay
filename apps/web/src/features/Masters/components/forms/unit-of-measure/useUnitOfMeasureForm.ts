import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { unitOfMeasureSchema, UnitOfMeasureFormValues } from './schema';
import {
  useCreateStockUnitMutation,
  useUpdateStockUnitMutation,
  StockUnit,
} from '@/features/Masters/api/stockUnitsApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useUnitOfMeasureForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
  mode: 'create' | 'edit' = 'create',
  initialData?: StockUnit,
) {
  const [createStockUnit, { isLoading: isCreating }] = useCreateStockUnitMutation();
  const [updateStockUnit, { isLoading: isUpdating }] = useUpdateStockUnitMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<UnitOfMeasureFormValues>({
    resolver: zodResolver(unitOfMeasureSchema),
    defaultValues: {
      name: initialData?.name || '',
      alias: '',
      parentId: '',
      symbol: initialData?.symbol || '',
      decimalPlaces: initialData?.decimal_places ?? 0,
      uqcCode: initialData?.uqc_code || '',
    },
  });

  const { reset } = form;

  // Reset/populate form values when mode or initialData changes
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      reset({
        name: initialData.name || '',
        alias: '',
        parentId: '',
        symbol: initialData.symbol || '',
        decimalPlaces: initialData.decimal_places ?? 0,
        uqcCode: initialData.uqc_code || '',
      });
    } else if (mode === 'create') {
      reset({
        name: '',
        alias: '',
        parentId: '',
        symbol: '',
        decimalPlaces: 0,
        uqcCode: '',
      });
    }
  }, [mode, initialData?.id, reset]);

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
      if (mode === 'edit' && initialData?.id) {
        await updateStockUnit({
          id: initialData.id,
          data: {
            code: '',
            decimal_places: data.decimalPlaces || 0,
            name: data.name,
            symbol: data.symbol,
            uqc_code: data.uqcCode || '',
          },
        }).unwrap();
      } else {
        await createStockUnit({
          code: '',
          decimal_places: data.decimalPlaces || 0,
          name: data.name,
          symbol: data.symbol,
          uqc_code: data.uqcCode || '',
        }).unwrap();
      }
      onSuccess();
    } catch (err: unknown) {
      console.error('Failed to save unit of measure:', err);
      const actionName = mode === 'edit' ? 'update' : 'create';
      const errMsg = getErrorMessage(
        err,
        `Failed to ${actionName} Unit of Measure. Please try again.`
      );
      setSubmitError(errMsg);
      onError?.('Error', errMsg);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: isCreating || isUpdating,
    submitError,
    clearSubmitError: () => setSubmitError(null),
    isEditMode: mode === 'edit',
  };
}
