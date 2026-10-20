import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { selectActiveFinancialYearId } from '@/store/authSlice';
import { costCenterSchema, CostCenterFormValues } from './schema';
import {
  useCreateCostCenterMutation,
  useUpdateCostCenterMutation,
  useGetCostCenterByIdQuery,
  CostCenterOpeningBalance,
  CreateCostCenterRequest,
  UpdateCostCenterRequest,
  CostCenterListItem,
  CostCenterDetail,
} from '@/features/Masters/api/costCentersApi';
import { useGetCostCategoriesQuery } from '@/features/Masters/api/costCategoriesApi';
import { getErrorMessage } from '@/utils/errorUtils';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useCostCenterForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
  mode: 'create' | 'edit' = 'create',
  initialData?: CostCenterListItem | CostCenterDetail,
) {
  const [createCostCenter, { isLoading: isCreating }] = useCreateCostCenterMutation();
  const [updateCostCenter, { isLoading: isUpdating }] = useUpdateCostCenterMutation();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const financialYearId = useSelector(selectActiveFinancialYearId);

  // Fetch full details if in edit mode
  const { data: costCenterDetail, isLoading: isLoadingDetail } = useGetCostCenterByIdQuery(
    initialData?.id || '',
    { skip: mode !== 'edit' || !initialData?.id },
  );

  const { data: categories = [] } = useGetCostCategoriesQuery();

  const form = useForm<CostCenterFormValues>({
    resolver: zodResolver(costCenterSchema) as any,
    defaultValues: {
      name: initialData?.name || '',
      alias: (initialData as CostCenterDetail)?.alias || '',
      code: (initialData as CostCenterDetail)?.code || '',
      parentId: (initialData as CostCenterDetail)?.parent_id || '',
      costCategoryId: (initialData as CostCenterDetail)?.cost_category_id || '',
      openingBalance: '',
      openingBalanceType: 'Dr',
      ledgerAllocations: [],
    },
  });

  // Re-populate form when in edit mode and details/categories arrive
  useEffect(() => {
    if (mode === 'edit') {
      const activeData = costCenterDetail || (initialData as CostCenterDetail);
      if (activeData) {
        // Resolve costCategoryId by direct id or matching category name
        const matchedCategory = categories.find(
          (c) => c.id === activeData.cost_category_id || c.name === activeData.cost_category_name,
        );

        const openingBalances = activeData.opening_balances || [];
        const totalAmount = openingBalances.reduce(
          (sum, item) => sum + (Number(item.amount) || 0),
          0,
        );

        const allocations = openingBalances.map((item) => ({
          ledger: item.ledger_id,
          amount: item.amount,
          isPhantom: false,
        }));

        form.reset({
          name: activeData.name || '',
          alias: activeData.alias || '',
          code: activeData.code || '',
          parentId: activeData.parent_id || '',
          costCategoryId: matchedCategory?.id || activeData.cost_category_id || '',
          openingBalance: totalAmount > 0 ? String(totalAmount) : '',
          openingBalanceType: 'Dr',
          ledgerAllocations: allocations,
        });
      }
    } else {
      form.reset({
        name: '',
        alias: '',
        code: '',
        parentId: '',
        costCategoryId: '',
        openingBalance: '',
        openingBalanceType: 'Dr',
        ledgerAllocations: [],
      });
    }
  }, [mode, initialData, costCenterDetail, categories, form]);

  useLeavePromptSlot({
    id: 'cost-center-form',
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

  const onSubmit = async (data: CostCenterFormValues) => {
    try {
      setSubmitError(null);
      const openingAmtStr =
        typeof data.openingBalance === 'string'
          ? data.openingBalance
          : String(data.openingBalance || '');
      const openingAmount = Math.max(0, parseFloat(openingAmtStr.replace(/[^0-9.-]+/g, '')) || 0);

      const openingBalances: CostCenterOpeningBalance[] =
        openingAmount > 0
          ? (data.ledgerAllocations || [])
              .filter((alloc) => {
                const hasLedger = Boolean(
                  alloc.ledger && typeof alloc.ledger === 'string' && alloc.ledger.trim() !== '',
                );
                const amt =
                  typeof alloc.amount === 'number'
                    ? alloc.amount
                    : parseFloat(String(alloc.amount || '0')) || 0;
                return hasLedger && amt > 0;
              })
              .map((alloc) => ({
                amount:
                  typeof alloc.amount === 'number'
                    ? alloc.amount
                    : parseFloat(String(alloc.amount) || '0'),
                cost_centre_id: initialData?.id || '',
                financial_year_id: financialYearId || '',
                ledger_id: alloc.ledger!,
              }))
          : [];

      if (mode === 'edit' && initialData?.id) {
        const updatePayload: UpdateCostCenterRequest = {
          id: initialData.id,
          name: data.name,
          alias: data.alias || '',
          code: data.code || '',
          cost_category_id: data.costCategoryId,
          parent_id: data.parentId || null,
          opening_balances: openingBalances,
        };

        await updateCostCenter(updatePayload).unwrap();
      } else {
        const createPayload: CreateCostCenterRequest = {
          alias: data.alias || '',
          code: data.code || '',
          cost_category_id: data.costCategoryId,
          name: data.name,
          opening_balances: openingBalances,
          parent_id: data.parentId || null,
        };

        await createCostCenter(createPayload).unwrap();
      }

      onSuccess();
    } catch (err: any) {
      console.error('Failed to save cost center:', err);
      const defaultMsg =
        mode === 'edit'
          ? 'Failed to update Cost Centre. Please try again.'
          : 'Failed to create Cost Centre. Please try again.';
      const errMsg = getErrorMessage(err, defaultMsg);
      setSubmitError(errMsg);
      onError?.('Error', errMsg);
    }
  };

  return {
    form,
    onSubmit,
    isSubmitting: isCreating || isUpdating,
    isLoadingDetail,
    submitError,
    clearSubmitError: () => setSubmitError(null),
    isEditMode: mode === 'edit',
  };
}
