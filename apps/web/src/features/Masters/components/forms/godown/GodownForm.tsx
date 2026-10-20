import React, { useMemo } from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import {
  MasterNameField,
  MasterAliasField,
  MasterParentField,
} from '@/components/shared-fields/MasterFields';
import { FormSubmissionError } from '@/components/FormSubmissionError';
import { useGodownForm } from './useGodownForm';
import { useGodownOptions } from '@/features/Masters/hooks/useGodownOptions';
import type { GodownItem } from '@/features/Masters/api/godownsApi';

export interface GodownFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (title: string, desc: string) => void;
  mode?: 'create' | 'edit';
  initialData?: GodownItem;
}

export function GodownForm({
  onCancel,
  onSuccess,
  onError,
  mode = 'create',
  initialData,
}: GodownFormProps) {
  const {
    form,
    onSubmit,
    isSubmitting,
    isLoadingDetail,
    submitError,
    clearSubmitError,
    isEditMode,
  } = useGodownForm(onSuccess || onCancel, onError, mode, initialData);

  const { options: godownOptions, isLoading: isLoadingGodowns } = useGodownOptions();

  // Exclude current godown from parent options to prevent cyclical hierarchy loops
  const filteredOptions = useMemo(() => {
    return godownOptions.filter((opt) => !initialData?.id || opt.value !== initialData.id);
  }, [godownOptions, initialData?.id]);

  const isPredefined =
    isEditMode &&
    (initialData?.is_predefined === true ||
      (initialData?.is_predefined as unknown) === 'true' ||
      (initialData?.is_predefined as unknown) === 1);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full overflow-hidden flex-1"
      >
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <FormSubmissionError error={submitError} onDismiss={clearSubmitError} />
          {isPredefined && (
            <div className="rounded-md bg-muted/60 border border-border/80 px-3 py-2 text-xs text-muted-foreground">
              This is a predefined system godown and cannot be edited or modified.
            </div>
          )}
          <MasterNameField />
          <MasterAliasField />
          <MasterParentField
            label="Parent Godown"
            options={filteredOptions}
            isLoading={isLoadingGodowns || isLoadingDetail}
            required
          />
        </div>

        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting || isLoadingDetail || isPredefined}>
            {isSubmitting
              ? isEditMode
                ? 'Updating...'
                : 'Creating...'
              : isEditMode
                ? 'Update Godown'
                : 'Create Godown'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
