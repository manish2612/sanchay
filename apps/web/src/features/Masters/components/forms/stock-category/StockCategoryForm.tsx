import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import {
  MasterNameField,
  MasterAliasField,
  MasterParentField,
} from '@/components/shared-fields/MasterFields';
import { FormSubmissionError } from '@/components/FormSubmissionError';
import { useStockCategoryForm } from './useStockCategoryForm';
import {
  useGetStockCategoriesQuery,
  StockCategory,
} from '@/features/Masters/api/stockCategoriesApi';

export interface StockCategoryFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (title: string, desc: string) => void;
  mode?: 'create' | 'edit';
  initialData?: StockCategory;
}

export function StockCategoryForm({
  onCancel,
  onSuccess,
  onError,
  mode = 'create',
  initialData,
}: StockCategoryFormProps) {
  const {
    form,
    onSubmit,
    isSubmitting,
    isLoadingDetail,
    submitError,
    clearSubmitError,
    isEditMode,
  } = useStockCategoryForm(onSuccess || onCancel, onError, mode, initialData);

  const { data: stockCategories = [], isLoading: isLoadingCategories } =
    useGetStockCategoriesQuery();

  const categoryOptions = [...stockCategories]
    .filter((c) => !initialData?.id || c.id !== initialData.id)
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .map((c) => ({
      label: c.name,
      value: c.id,
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
            label="Parent Category"
            placeholder="Select parent category (optional)..."
            options={categoryOptions}
            isLoading={isLoadingCategories || isLoadingDetail}
          />
        </div>

        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Stock Category'
                : 'Create Stock Category'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
