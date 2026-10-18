import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockGroupSchema, StockGroupFormValues } from './schema';
import { useCreateStockGroupMutation } from '@/features/Masters/api/stockGroupsApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useStockGroupForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
) {
  const [createStockGroup, { isLoading }] = useCreateStockGroupMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<StockGroupFormValues>({
    resolver: zodResolver(stockGroupSchema),
    defaultValues: {
      name: '',
      alias: '',
      parentId: '',
      localInterstateSales: '',
      exportSales: '',
      localInterstatePurchase: '',
      exportPurchase: '',
    },
  });

  useLeavePromptSlot({
    id: 'stock-group-form',
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

  const onSubmit = async (data: StockGroupFormValues) => {
    try {
      setSubmitError(null);
      await createStockGroup({
        alias: data.alias || '',
        code: '',
        export_sales_ledger_id: data.exportSales || null,
        import_purchase_ledger_id: data.exportPurchase || null,
        is_taxable: true,
        local_purchase_ledger_id: data.localInterstatePurchase || null,
        local_sales_ledger_id: data.localInterstateSales || null,
        name: data.name,
        parent_id: data.parentId || null,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save stock group:', err);
      const errMsg = getErrorMessage(err, 'Failed to create Stock Group. Please try again.');
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
