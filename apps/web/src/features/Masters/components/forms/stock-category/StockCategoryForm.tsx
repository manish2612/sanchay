import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { useStockCategoryForm } from './useStockCategoryForm';

export function StockCategoryForm({ onCancel, onSuccess }: { onCancel: () => void, onSuccess?: () => void }) {
  const { form, onSubmit } = useStockCategoryForm(onSuccess || onCancel);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <MasterNameField control={form.control} />
          <MasterAliasField control={form.control} />
          <MasterParentField control={form.control} label="Parent Category" />
          
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Create Stock Category</Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
