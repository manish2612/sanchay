import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { OpeningBalanceField } from '@/components/shared-fields/AccountingFields';
import { useCostCenterForm } from './useCostCenterForm';
import { LedgerAllocationTable } from './components/LedgerAllocationTable';

export function CostCenterForm({ onCancel, onSuccess, onError }: { onCancel: () => void, onSuccess?: () => void; onError?: (title: string, desc: string) => void }) {
  const { form, onSubmit } = useCostCenterForm(onSuccess || onCancel, onError);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <MasterNameField control={form.control as any} />
          <MasterAliasField control={form.control as any} />
          <MasterParentField control={form.control as any} label="Parent Cost Category" />
          <OpeningBalanceField control={form.control as any} />
          <LedgerAllocationTable form={form} />
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2 flex-shrink-0">
          <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Create Cost Center</Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
