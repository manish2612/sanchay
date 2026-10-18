import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taxGroupSchema } from './schema';
import type { TaxGroupFormValues } from './types';
import { useCreateTaxGroupMutation } from '@/features/Masters/api/taxGroupsApi';
import type { CreateTaxGroupRequest } from '@/features/Masters/types/taxGroup';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export function useTaxGroupForm(
  onSuccess: () => void,
  onError?: (title: string, desc: string) => void
) {
  const [createTaxGroup, { isLoading }] = useCreateTaxGroupMutation();

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

  useLeavePromptSlot({
    id: 'tax-group-form',
    isDirty: form.formState.isDirty && !form.formState.isSubmitSuccessful,
    priority: 10,
  });

  const onSubmit = async (data: TaxGroupFormValues) => {
    try {
      const activeComponents = (data.components || [])
        .filter((c) => !c.isPhantom && c.component_name && c.component_name.trim() !== '')
        .map((c) => ({
          component_name: c.component_name,
          compute_method: c.compute_method,
          input_ledger_id: c.input_ledger_id || '',
          output_ledger_id: c.output_ledger_id || '',
          rate: typeof c.rate === 'number' ? c.rate : parseFloat(String(c.rate) || '0'),
          scope: c.scope,
          tax_group_id: '',
        }));

      const payload: CreateTaxGroupRequest = {
        code: data.code || '',
        combined_rate: typeof data.combined_rate === 'number' ? data.combined_rate : parseFloat(String(data.combined_rate) || '0'),
        components: activeComponents,
        is_predefined: false,
        name: data.name,
        tax_type_id: data.tax_type_id,
      };

      await createTaxGroup(payload).unwrap();
      onSuccess();
    } catch (err: any) {
      console.error('Failed to save tax group:', err);
      const errMsg = err?.data?.message || err?.message || 'Failed to create Tax Group. Please try again.';
      onError?.('Error', errMsg);
    }
  };

  return { form, onSubmit, isSubmitting: isLoading };
}
