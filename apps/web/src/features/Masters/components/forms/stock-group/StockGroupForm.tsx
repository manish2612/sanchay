import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import {
  MasterNameField,
  MasterAliasField,
  MasterParentField,
} from '@/components/shared-fields/MasterFields';
import {
  LocalSalesTaxField,
  ExportSalesTaxField,
  LocalPurchaseTaxField,
  ExportPurchaseTaxField,
} from '@/components/shared-fields/AccountingFields';
import { FormSubmissionError } from '@/components/FormSubmissionError';
import { useStockGroupForm } from './useStockGroupForm';
import { useGetStockGroupsQuery, StockGroupItem } from '@/features/Masters/api/stockGroupsApi';

export interface StockGroupFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (title: string, desc: string) => void;
  mode?: 'create' | 'edit';
  initialData?: StockGroupItem;
}

export function StockGroupForm({
  onCancel,
  onSuccess,
  onError,
  mode = 'create',
  initialData,
}: StockGroupFormProps) {
  const {
    form,
    onSubmit,
    isSubmitting,
    isLoadingDetail,
    submitError,
    clearSubmitError,
    isEditMode,
  } = useStockGroupForm(onSuccess || onCancel, onError, mode, initialData);

  const { data: stockGroups = [], isLoading: isLoadingGroups } = useGetStockGroupsQuery();

  // Exclude current group from parent options to prevent cyclical hierarchy loops
  const groupOptions = [...stockGroups]
    .filter((g) => !initialData?.id || g.id !== initialData.id)
    .map((g) => ({
      label: g.name,
      value: g.id,
    }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full overflow-hidden flex-1"
      >
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <FormSubmissionError error={submitError} onDismiss={clearSubmitError} />
          <MasterNameField />
          <MasterAliasField />
          <MasterParentField
            label="Parent Group"
            options={groupOptions}
            isLoading={isLoadingGroups || isLoadingDetail}
            required
          />

          <LocalSalesTaxField control={form.control as any} />
          <ExportSalesTaxField control={form.control as any} />
          <LocalPurchaseTaxField control={form.control as any} />
          <ExportPurchaseTaxField control={form.control as any} />
        </div>

        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isLoadingDetail}>
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Stock Group'
                : 'Create Stock Group'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
