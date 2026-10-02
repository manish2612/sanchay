import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { OpeningBalanceField } from '@/components/shared-fields/AccountingFields';
import { useCostCenterForm } from './useCostCenterForm';
import { LedgerAllocationTable } from './components/LedgerAllocationTable';
import { useGetCostCategoriesQuery } from '@/features/Masters/api/costCategoriesApi';

export function CostCenterForm({ onCancel, onSuccess, onError }: { onCancel: () => void, onSuccess?: () => void; onError?: (title: string, desc: string) => void }) {
  const { form, onSubmit, isSubmitting } = useCostCenterForm(onSuccess || onCancel, onError);
  
  const { data: categories = [], isLoading: isLoadingCategories } = useGetCostCategoriesQuery();
  
  const categoryOptions = [...categories]
    .sort((a, b) => (a.display_order || 0) - (b.display_order || 0))
    .map(c => ({
      label: c.name,
      value: c.id
    }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <MasterNameField />
          <MasterAliasField />
          <MasterParentField 
            name="costCategoryId" 
            label="Parent Cost Category" 
            options={categoryOptions} 
            isLoading={isLoadingCategories} 
          />
          <OpeningBalanceField control={form.control as any} />
          <LedgerAllocationTable form={form} />
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2 flex-shrink-0">
          <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>Cancel</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Cost Center'}
          </Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
