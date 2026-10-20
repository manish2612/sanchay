import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import {
  MasterNameField,
  MasterAliasField,
  MasterParentField,
} from '@/components/shared-fields/MasterFields';
import { OpeningBalanceField } from '@/components/shared-fields/AccountingFields';
import { FormSubmissionError } from '@/components/FormSubmissionError';
import { useCostCenterForm } from './useCostCenterForm';
import { LedgerAllocationTable } from './components/LedgerAllocationTable';
import { useGetCostCategoriesQuery } from '@/features/Masters/api/costCategoriesApi';
import type { CostCenterListItem, CostCenterDetail } from '@/features/Masters/api/costCentersApi';

export interface CostCenterFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (title: string, desc: string) => void;
  mode?: 'create' | 'edit';
  initialData?: CostCenterListItem | CostCenterDetail;
}

export function CostCenterForm({
  onCancel,
  onSuccess,
  onError,
  mode = 'create',
  initialData,
}: CostCenterFormProps) {
  const {
    form,
    onSubmit,
    isSubmitting,
    isLoadingDetail,
    submitError,
    clearSubmitError,
    isEditMode,
  } = useCostCenterForm(onSuccess || onCancel, onError, mode, initialData);

  const { data: categories = [], isLoading: isLoadingCategories } = useGetCostCategoriesQuery();

  const categoryOptions = [...categories]
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .map((c) => ({
      label: c.name,
      value: c.id,
    }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit as any)}
        className="flex flex-col h-full overflow-hidden flex-1"
      >
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <FormSubmissionError error={submitError} onDismiss={clearSubmitError} />
          <MasterNameField />
          <MasterAliasField />
          <MasterParentField
            name="costCategoryId"
            label="Parent Cost Category"
            options={categoryOptions}
            isLoading={isLoadingCategories || isLoadingDetail}
            required
          />
          <OpeningBalanceField control={form.control as any} />
          <LedgerAllocationTable form={form} />
        </div>

        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2 flex-shrink-0">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isLoadingDetail}>
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Cost Centre'
                : 'Create Cost Centre'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
