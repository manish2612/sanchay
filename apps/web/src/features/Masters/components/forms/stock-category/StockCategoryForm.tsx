import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { useStockCategoryForm } from './useStockCategoryForm';
import { useGetStockCategoriesQuery } from '@/features/Masters/api/stockCategoriesApi';

export function StockCategoryForm({ onCancel, onSuccess, onError }: { onCancel: () => void, onSuccess?: () => void; onError?: (title: string, desc: string) => void }) {
  const { form, onSubmit, isSubmitting } = useStockCategoryForm(onSuccess || onCancel, onError);
  
  const { data: stockCategories = [], isLoading: isLoadingCategories } = useGetStockCategoriesQuery();
  
  const categoryOptions = [...stockCategories].map(c => ({
    label: c.name,
    value: c.id
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <MasterNameField />
          <MasterAliasField />
          <MasterParentField 
            label="Parent Category" 
            options={categoryOptions}
            isLoading={isLoadingCategories}
          />
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Stock Category'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
