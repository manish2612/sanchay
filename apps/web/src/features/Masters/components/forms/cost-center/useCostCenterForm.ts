import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { selectActiveFinancialYearId } from '@/store/authSlice';
import { costCenterSchema, CostCenterFormValues } from './schema';
import {
  useCreateCostCenterMutation,
  CostCenterOpeningBalance,
  CreateCostCenterRequest,
} from '@/features/Masters/api/costCentersApi';

export function useCostCenterForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
) {
  const [createCostCenter, { isLoading }] = useCreateCostCenterMutation();
  const financialYearId = useSelector(selectActiveFinancialYearId);

  const form = useForm<CostCenterFormValues>({
    resolver: zodResolver(costCenterSchema) as any,
    defaultValues: {
      name: '',
      alias: '',
      code: '',
      parentId: '',
      costCategoryId: '',
      openingBalance: '',
      openingBalanceType: 'Dr',
      ledgerAllocations: [],
    },
  });

  const onSubmit = async (data: CostCenterFormValues) => {
    try {
      const openingAmtStr =
        typeof data.openingBalance === 'string'
          ? data.openingBalance
          : String(data.openingBalance || '');
      const openingAmount = Math.max(0, parseFloat(openingAmtStr.replace(/[^0-9.-]+/g, '')) || 0);

      const openingBalances: CostCenterOpeningBalance[] =
        openingAmount > 0
          ? (data.ledgerAllocations || [])
              .filter((alloc) => {
                const hasLedger = Boolean(alloc.ledger && typeof alloc.ledger === 'string' && alloc.ledger.trim() !== '');
                const amt = typeof alloc.amount === 'number' ? alloc.amount : parseFloat(String(alloc.amount || '0')) || 0;
                return hasLedger && amt > 0;
              })
              .map((alloc) => ({
                amount:
                  typeof alloc.amount === 'number'
                    ? alloc.amount
                    : parseFloat(String(alloc.amount) || '0'),
                cost_centre_id: '',
                financial_year_id: financialYearId || '',
                ledger_id: alloc.ledger!,
              }))
          : [];

      const payload: CreateCostCenterRequest = {
        alias: data.alias || '',
        code: data.code || '',
        cost_category_id: data.costCategoryId,
        name: data.name,
        opening_balances: openingBalances,
        ...(data.parentId ? { parent_id: data.parentId } : {}),
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
