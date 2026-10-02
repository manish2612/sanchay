import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { useCostCategoryForm } from './useCostCategoryForm';

export function CostCategoryForm({ onCancel, onSuccess, onError }: { onCancel: () => void, onSuccess?: () => void; onError?: (title: string, desc: string) => void }) {
  const { form, onSubmit, isLoading } = useCostCategoryForm(onSuccess || onCancel, onError);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <MasterNameField />
          <MasterAliasField />
          
          
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isLoading}>Cancel</Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Create Cost Category'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
