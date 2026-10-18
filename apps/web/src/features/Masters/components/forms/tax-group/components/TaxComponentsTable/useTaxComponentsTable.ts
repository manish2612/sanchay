import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import type { TaxGroupFormValues, TaxComponentRow } from '../../types';

const createDefaultPhantomRow = (): TaxComponentRow => ({
  component_name: '',
  scope: 'ALL',
  compute_method: 'PCT_BASE',
  rate: '',
  input_ledger_id: '',
  output_ledger_id: '',
  isPhantom: true,
});

export const useTaxComponentsTable = (form: UseFormReturn<TaxGroupFormValues>) => {
  const { fields, replace, update, remove } = useFieldArray({
    control: form.control,
    name: 'components',
  });

  const [localRowErrors, setLocalRowErrors] = useState<Record<number, boolean>>({});

  // Ensure there is always a phantom row for adding new items
  useEffect(() => {
    const currentRows = form.getValues('components') || [];
    const hasPhantom = currentRows.some((row) => row.isPhantom);

    if (!hasPhantom) {
      const newRows = [...currentRows, createDefaultPhantomRow()];
      replace(newRows);
    }
  }, [fields.length, form, replace]);

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      const row = form.getValues(`components.${rowIndex}`);
      if (row) {
        update(rowIndex, { ...row, [columnId]: value });
        form.clearErrors(`components.${rowIndex}` as any);
      }
    },
    [form, update]
  );

  const removeRow = useCallback(
    (rowIndex: number) => {
      const currentRows = form.getValues('components') || [];
      const updated = currentRows.filter((_, idx) => idx !== rowIndex);
      // Ensure at least one phantom row always exists
      if (!updated.some((r) => r.isPhantom)) {
        updated.push(createDefaultPhantomRow());
      }
      replace(updated);
    },
    [form, replace]
  );

  const onRowCommit = useCallback(
    (rowIndex: number, columnId?: string, cellValue?: string): 'ADVANCE' | 'EXIT' | 'STAY' => {
      let row = form.getValues(`components.${rowIndex}`);
      if (!row) return 'EXIT';

      // Rule 1: Prevent React Async Stale State on Rapid Commits
      if (columnId && cellValue !== undefined) {
        row = { ...row, [columnId]: cellValue };
        updateData(rowIndex, columnId, cellValue);
      }

      const rateNum = typeof row.rate === 'number' ? row.rate : parseFloat(String(row.rate || '0'));
      const hasName = Boolean(row.component_name && row.component_name.trim() !== '');
      const hasRate = !isNaN(rateNum) && rateNum > 0;
      const hasInputLedger = Boolean(row.input_ledger_id && row.input_ledger_id.trim() !== '');
      const hasOutputLedger = Boolean(row.output_ledger_id && row.output_ledger_id.trim() !== '');

      const isValid = hasName && hasRate && hasInputLedger && hasOutputLedger;

      if (!isValid) {
        setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: true }));
        setTimeout(() => {
          setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: false }));
        }, 800);
        return 'STAY';
      }

      // Rule 8: Atomic Batching with replace()
      if (row.isPhantom) {
        const currentRows = [...(form.getValues('components') || [])];
        currentRows[rowIndex] = { ...row, isPhantom: false };
        currentRows.push(createDefaultPhantomRow());
        replace(currentRows);
        return 'ADVANCE';
      }

      return 'ADVANCE';
    },
    [form, replace, updateData]
  );

  const isRowEmpty = useCallback((row: any) => {
    const data = row.original;
    return (
      !data.component_name &&
      (!data.rate || data.rate === '0.00' || data.rate === 0) &&
      !data.input_ledger_id &&
      !data.output_ledger_id
    );
  }, []);

  return {
    fields,
    updateData,
    removeRow,
    onRowCommit,
    isRowEmpty,
    localRowErrors,
  };
};
