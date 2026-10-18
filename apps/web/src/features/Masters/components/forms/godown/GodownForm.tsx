import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { FormSubmissionError } from '@/components/FormSubmissionError';
import { useGodownForm } from './useGodownForm';
import { useGodownOptions } from '@/features/Masters/hooks/useGodownOptions';

export function GodownForm({ onCancel, onSuccess, onError }: { onCancel: () => void, onSuccess?: () => void; onError?: (title: string, desc: string) => void }) {
  const { form, onSubmit, isSubmitting, submitError, clearSubmitError } = useGodownForm(onSuccess || onCancel, onError);
  
  const { options: godownOptions, isLoading: isLoadingGodowns } = useGodownOptions();

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <FormSubmissionError error={submitError} onDismiss={clearSubmitError} />
          <MasterNameField />
          <MasterAliasField />
          <MasterParentField 
            label="Parent Godown" 
            options={godownOptions}
            isLoading={isLoadingGodowns}
            required
          />
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Godown'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
