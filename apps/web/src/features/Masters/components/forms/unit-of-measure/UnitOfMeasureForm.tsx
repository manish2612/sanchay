import React from 'react';
import { Form, Button, SheetFooter } from '@prime/ui';
import { MasterNameField, MasterAliasField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { TextInput } from '@prime/ui';
import { useUnitOfMeasureForm } from './useUnitOfMeasureForm';

export function UnitOfMeasureForm({ onCancel, onSuccess }: { onCancel: () => void, onSuccess?: () => void }) {
  const { form, onSubmit } = useUnitOfMeasureForm(onSuccess || onCancel);
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col h-full overflow-hidden flex-1">
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          <MasterNameField control={form.control} />
          
          <MasterParentField control={form.control} label="Parent Unit" />
          
      <Form.Field control={form.control} name="symbol" render={({ field }) => (
        <Form.Item><Form.Label>Symbol</Form.Label><Form.Control><TextInput placeholder="e.g. kg" {...field} value={field.value ?? ''} /></Form.Control></Form.Item>
      )} />
      <Form.Field control={form.control} name="decimalPlaces" render={({ field }) => (
        <Form.Item><Form.Label>Decimal Places</Form.Label><Form.Control><TextInput type="number" min={0} max={5} {...field} onChange={e => field.onChange(parseInt(e.target.value) || 0)} value={field.value ?? 0} /></Form.Control></Form.Item>
      )} />
      
        </div>
        
        <SheetFooter className="mt-auto border-t border-border/30 p-4 bg-surface sticky bottom-0 flex justify-end gap-2">
          <Button variant="outline" type="button" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Create Unit of Measure</Button>
        </SheetFooter>
      </form>
    </Form>
  );
}
