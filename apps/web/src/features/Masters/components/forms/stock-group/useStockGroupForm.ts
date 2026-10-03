import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { stockGroupSchema, StockGroupFormValues } from './schema';
import { useCreateStockGroupMutation } from '@/features/Masters/api/stockGroupsApi';

export function useStockGroupForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createStockGroup, { isLoading }] = useCreateStockGroupMutation();

  const form = useForm<StockGroupFormValues>({
    resolver: zodResolver(stockGroupSchema),
    defaultValues: { name: '', alias: '', parentId: '', localInterstateSales: '', exportSales: '', localInterstatePurchase: '', exportPurchase: '' }
  });

  const onSubmit = async (data: StockGroupFormValues) => {
    try {
      await createStockGroup({
        alias: data.alias || '',
        code: '',
        export_sales_ledger_id: data.exportSales || '',
        import_purchase_ledger_id: data.exportPurchase || '',
        is_taxable: true,
        local_purchase_ledger_id: data.localInterstatePurchase || '',
        local_sales_ledger_id: data.localInterstateSales || '',
        name: data.name,
        parent_id: data.parentId || null,
      }).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save stock group:', err);
      const errMsg = err?.data?.message || 'Failed to create Stock Group. Please try again.';
      onError?.('Error', errMsg);
    }
  };

  return { form, onSubmit, isSubmitting: isLoading };
}
