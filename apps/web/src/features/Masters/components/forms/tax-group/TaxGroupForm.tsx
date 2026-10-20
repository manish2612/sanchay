import React, { useMemo } from 'react';
import { Form, Button, SheetFooter, TextInput, DropdownMenu } from '@prime/ui';
import { MasterNameField } from '@/components/shared-fields/MasterFields';
import { FormSubmissionError } from '@/components/FormSubmissionError';
import { useTaxGroupForm } from './useTaxGroupForm';
import { TaxComponentsTable } from './components/TaxComponentsTable';
import { useGetTaxTypesQuery } from '@/features/Masters/api/taxGroupsApi';
import type { TaxGroupFormProps } from './types';

export function TaxGroupForm({ mode = 'create', initialData, onCancel, onSuccess, onError }: TaxGroupFormProps) {
  const { form, onSubmit, isSubmitting, submitError, clearSubmitError } = useTaxGroupForm(
    onSuccess || onCancel,
    onError,
    mode,
    initialData
  );
  const { data: taxTypes = [], isLoading: isLoadingTaxTypes } = useGetTaxTypesQuery();

  const taxTypeOptions = useMemo(() => {
    return taxTypes.map((t) => ({
      label: t.name,
      value: t.id,
    }));
  }, [taxTypes]);

  const combinedRateValue = form.watch('combined_rate');
  const combinedRateNum = typeof combinedRateValue === 'number'
    ? combinedRateValue
    : parseFloat(String(combinedRateValue || '').replace(/[^0-9.-]+/g, ''));
  const isCombinedRateValid = !isNaN(combinedRateNum) && combinedRateNum > 0;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit as any)}
        className="flex flex-col h-full overflow-hidden flex-1"
      >
        <div className="flex-1 overflow-y-auto py-4 px-4 sm:px-6 space-y-4">
          <FormSubmissionError error={submitError} onDismiss={clearSubmitError} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 1: Code (Optional) */}
            <Form.Field
              control={form.control}
              name="code"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>
                    Code <span className="text-[11px] font-normal text-muted-foreground ml-1">(Optional)</span>
                  </Form.Label>
                  <Form.Control>
                    <TextInput placeholder="Enter code (optional)" {...field} value={field.value ?? ''} />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            {/* Field 2: Name (Required) via MasterNameField */}
            <MasterNameField />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Field 3: Tax Type (Required, Dynamic from GET /accounting/taxtypes) */}
            <Form.Field
              control={form.control}
              name="tax_type_id"
              render={({ field }) => {
                const selected = taxTypeOptions.find((t) => t.value === field.value);
                return (
                  <Form.Item>
                    <Form.Label>
                      Tax Type <span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control>
                      <DropdownMenu
                        triggerLabel={
                          selected
                            ? selected.label
                            : isLoadingTaxTypes
                              ? 'Loading Tax Types...'
                              : 'Select Tax Type...'
                        }
                        items={taxTypeOptions.map((type) => ({
                          id: type.value,
                          label: type.label,
                          onSelect: () => field.onChange(type.value),
                        }))}
                        disabled={isLoadingTaxTypes}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                );
              }}
            />

            {/* Field 4: Combined Rate (Required Numeric Text Field) */}
            <Form.Field
              control={form.control}
              name="combined_rate"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>
                    Combined Rate <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control>
                    <TextInput
                      type="number"
                      step="any"
                      min={0}
                      placeholder="0.00"
                      rightSlot={<span className="text-xs text-muted-foreground font-medium pr-1">%</span>}
                      {...field}
                      value={field.value ?? ''}
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </div>

          {/* Conditional Editable Table when Combined Rate is a valid positive number */}
          {isCombinedRateValid && <TaxComponentsTable form={form} />}
        </div>

        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 flex-shrink-0">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
            {isSubmitting
              ? mode === 'edit'
                ? 'Updating...'
                : 'Creating...'
              : mode === 'edit'
                ? 'Update Tax Group'
                : 'Create Tax Group'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
