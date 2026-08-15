import { useCallback, useEffect } from 'react';
import { useFieldArray } from 'react-hook-form';
import { STOCK_ITEM_FORM_FIELDS } from '../../constants';

export const useMultiUnitTable = (form: any) => {
  const enableMultiUnit = form.watch(STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT);

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: STOCK_ITEM_FORM_FIELDS.MULTI_UNITS,
  });

  useEffect(() => {
    if (enableMultiUnit && fields.length === 0) {
      append({ unit: '', quantity: 0, isPhantom: true });
    }
  }, [enableMultiUnit, fields.length, append]);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    const row = fields[rowIndex];
    if (row) {
      update(rowIndex, { ...row, [columnId]: value });
    }
  }, [fields, update]);

  const removeRow = useCallback((rowIndex: number) => {
    remove(rowIndex);
    // If we removed the last row, turn off the switch to clear validation errors
    if (fields.length <= 1 || (fields[rowIndex] as any)?.isPhantom) {
      form.setValue(STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT, false);
      remove(); // clear all remaining fields
    }
  }, [fields, remove, form]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    const row = fields[rowIndex];
    if (row && (row as any).isPhantom) {
      const committedRow = columnId && cellValue !== undefined
        ? { ...row, [columnId]: cellValue, isPhantom: false }
        : { ...row, isPhantom: false };
      
      update(rowIndex, committedRow);
      append({ unit: '', quantity: 0, isPhantom: true });
      return "ADVANCE";
    }
    return "EXIT";
  }, [fields, update, append]);

  return {
    enableMultiUnit,
    fields,
    updateData,
    removeRow,
    onRowCommit,
  };
};
