import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { TextInput } from '@prime/ui';
import { useStockGroupForm } from './useStockGroupForm';

export function StockGroupForm({ onCancel, onSuccess }: { onCancel: () => void, onSuccess?: () => void }) {
  const { form, onSubmit } = useStockGroupForm(onSuccess || onCancel);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <MasterNameField control={form.control} />
          <MasterAliasField control={form.control} />
          <MasterParentField control={form.control} label="Parent Group" />
          
      <Form.Field control={form.control} name="localInterstateSales" render={({ field }) => (
        <Form.Item><Form.Label>Local/Interstate Sales</Form.Label><Form.Control><TextInput {...field} value={field.value ?? ''} /></Form.Control></Form.Item>
      )} />
      <Form.Field control={form.control} name="exportSales" render={({ field }) => (
        <Form.Item><Form.Label>Export Sales</Form.Label><Form.Control><TextInput {...field} value={field.value ?? ''} /></Form.Control></Form.Item>
      )} />
      <Form.Field control={form.control} name="localInterstatePurchase" render={({ field }) => (
        <Form.Item><Form.Label>Local/Interstate Purchase</Form.Label><Form.Control><TextInput {...field} value={field.value ?? ''} /></Form.Control></Form.Item>
      )} />
      <Form.Field control={form.control} name="exportPurchase" render={({ field }) => (
        <Form.Item><Form.Label>Export Purchase</Form.Label><Form.Control><TextInput {...field} value={field.value ?? ''} /></Form.Control></Form.Item>
      )} />
      
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Create Stock Group</Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
