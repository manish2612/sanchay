import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taxGroupSchema } from './schema';
import type { TaxGroupFormValues, TaxComponentRow } from './types';
import {
  useCreateTaxGroupMutation,
  useUpdateTaxGroupMutation,
  useGetTaxTypesQuery,
} from '@/features/Masters/api/taxGroupsApi';
import type { CreateTaxGroupRequest, TaxGroupResponse } from '@/features/Masters/types/taxGroup';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';
import { getErrorMessage } from '@/utils/errorUtils';

export function useTaxGroupForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void,
  mode: 'create' | 'edit' = 'create',
  initialData?: TaxGroupResponse | null,
) {
  const [createTaxGroup, { isLoading: isCreating }] = useCreateTaxGroupMutation();
  const [updateTaxGroup, { isLoading: isUpdating }] = useUpdateTaxGroupMutation();
  const { data: taxTypes = [] } = useGetTaxTypesQuery();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<TaxGroupFormValues>({
    resolver: zodResolver(taxGroupSchema) as any,
    defaultValues: {
      code: '',
      name: '',
      tax_type_id: '',
      combined_rate: '' as any,
      components: [],
    },
  });

  const { reset } = form;

  // Re-populate form when initialData or mode changes
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      const matchedTaxType = taxTypes.find(
        (t) => t.id === initialData.tax_type_id || t.name === initialData.tax_type_name
      );

      const mappedComponents: TaxComponentRow[] = (initialData.components || []).map((c: any) => ({
        component_name: c.taxgroup_component_name || c.component_name || '',
        scope: c.taxgroup_component_scope || c.scope || 'ALL',
        compute_method: c.taxgroup_component_compute_method || c.compute_method || 'PCT_BASE',
        rate: c.taxgroup_component_rate !== undefined ? c.taxgroup_component_rate : c.rate,
        input_ledger_id: c.input_ledger_id || '',
        output_ledger_id: c.output_ledger_id || '',
        isPhantom: false,
      }));

      reset({
        name: initialData.name || '',
        code: initialData.code || '',
        tax_type_id: matchedTaxType?.id || initialData.tax_type_id || '',
        combined_rate: initialData.combined_rate !== undefined ? initialData.combined_rate : '',
        components: mappedComponents,
      });
    } else if (mode === 'create') {
      reset({
        name: '',
        code: '',
        tax_type_id: '',
        combined_rate: '' as any,
        components: [],
      });
    }
  }, [mode, initialData?.id, initialData, taxTypes, reset]);

  useLeavePromptSlot({
    id: 'tax-group-form',
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

  const onSubmit = async (data: TaxGroupFormValues) => {
    try {
      setSubmitError(null);
      const activeComponents = (data.components || [])
        .filter((c) => !c.isPhantom && c.component_name && c.component_name.trim() !== '')
        .map((c) => ({
          component_name: c.component_name,
          compute_method: c.compute_method,
          input_ledger_id: c.input_ledger_id || '',
          output_ledger_id: c.output_ledger_id || '',
          rate: typeof c.rate === 'number' ? c.rate : parseFloat(String(c.rate) || '0'),
          scope: c.scope,
        }));

      const payload: CreateTaxGroupRequest = {
        code: data.code || '',
        combined_rate:
          typeof data.combined_rate === 'number'
            ? data.combined_rate
            : parseFloat(String(data.combined_rate) || '0'),
        components: activeComponents,
        is_predefined: false,
        name: data.name,
        tax_type_id: data.tax_type_id,
      };

      if (mode === 'edit' && initialData?.id) {
        await updateTaxGroup({
          id: initialData.id,
          ...payload,
        }).unwrap();
      } else {
        await createTaxGroup(payload).unwrap();
      }

      onSuccess();
    } catch (err: any) {
      console.error('Failed to save tax group:', err);
      const errMsg = getErrorMessage(
        err,
        mode === 'edit'
          ? 'Failed to update Tax Group. Please try again.'
          : 'Failed to create Tax Group. Please try again.'
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
  };
}
