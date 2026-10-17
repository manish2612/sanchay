import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { selectActiveFinancialYearId } from '@/store/authSlice';
import { costCenterSchema, CostCenterFormValues } from './schema';
import { useCreateCostCenterMutation, CostCenterOpeningBalance, CreateCostCenterRequest } from '@/features/Masters/api/costCentersApi';

export function useCostCenterForm(onSuccess: () => void, onError?: (title: string, desc: string) => void) {
  const [createCostCenter, { isLoading }] = useCreateCostCenterMutation();
  const financialYearId = useSelector(selectActiveFinancialYearId);

  const form = useForm<CostCenterFormValues>({
    resolver: zodResolver(costCenterSchema) as any,
    defaultValues: { name: '', alias: '', code: '', parentId: '', costCategoryId: '', openingBalanceType: 'Dr' }
  });

  const onSubmit = async (data: CostCenterFormValues) => {
    try {
      const openingBalances: CostCenterOpeningBalance[] = (data.ledgerAllocations || [])
        .filter((alloc) => !alloc.isPhantom && (alloc.amount || 0) > 0)
        .map((alloc) => ({
          amount: typeof alloc.amount === 'number' ? alloc.amount : parseFloat(String(alloc.amount) || '0'),
          cost_centre_id: '',
          financial_year_id: financialYearId,
          ledger_id: alloc.ledger,
        }));

      const payload: CreateCostCenterRequest = {
        alias: data.alias || '',
        code: data.code || '',
        cost_category_id: data.costCategoryId,
        name: data.name,
        opening_balances: openingBalances,
        parent_id: data.parentId || '',
      };

      await createCostCenter(payload).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save cost center:', err);
      const errMsg = err?.data?.message || 'Failed to create Cost Center. Please try again.';
      onError?.('Error', errMsg);
    }
  };

  return { form, onSubmit, isSubmitting: isLoading };
}
