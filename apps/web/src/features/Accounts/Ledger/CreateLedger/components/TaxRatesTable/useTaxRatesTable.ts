import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { LEDGER_FORM_FIELDS } from '../../constants';
import type { LedgerFormValues } from '../../schema';
import type { TaxRateRow } from './types';
import { useGetTaxGroupsQuery } from '@/features/Masters/api/taxGroupsApi';

export const createDefaultPhantomRow = (): TaxRateRow => ({
  id: crypto.randomUUID(),
  effective_from: new Date().toISOString(),
  effective_to: new Date().toISOString(),
  tax_group_id: '',
  excise_tax_group_id: '',
  applicability: 'BOTH',
  tax_rate: '',
  isPhantom: true,
});

export const useTaxRatesTable = (form: UseFormReturn<LedgerFormValues>) => {
  const { data: taxGroups = [] } = useGetTaxGroupsQuery();

  const { fields, replace, update } = useFieldArray({
    control: form.control,
    name: LEDGER_FORM_FIELDS.TAX_RATES as any,
  });

  const [localRowErrors, setLocalRowErrors] = useState<Record<number, boolean>>({});

  // Ensure there is always a phantom row for adding new items
  useEffect(() => {
    const currentRows = (form.getValues(LEDGER_FORM_FIELDS.TAX_RATES as any) || []) as TaxRateRow[];
    const hasPhantom = currentRows.some((row) => row.isPhantom);

    if (!hasPhantom) {
      const newRows = [...currentRows, createDefaultPhantomRow()];
      replace(newRows);
    }
  }, [fields.length, form, replace]);

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      const currentRows = (form.getValues(LEDGER_FORM_FIELDS.TAX_RATES as any) || []) as TaxRateRow[];
      const row = currentRows[rowIndex];
      if (row) {
        let updatedRow = { ...row, [columnId]: value };

        // If tax_group_id selected and tax_rate is currently empty, auto-populate combined_rate
        if (columnId === 'tax_group_id' && value) {
          const selectedTg = taxGroups.find((tg) => tg.id === value);
          if (
            selectedTg &&
            (row.tax_rate === '' || row.tax_rate === undefined || row.tax_rate === 0)
          ) {
            updatedRow = { ...updatedRow, tax_rate: selectedTg.combined_rate };
          }
        }

        update(rowIndex, updatedRow);
        form.clearErrors(`${LEDGER_FORM_FIELDS.TAX_RATES}.${rowIndex}` as any);
      }
    },
    [form, update, taxGroups]
  );

  const removeRow = useCallback(
    (rowIndex: number) => {
      const currentRows = (form.getValues(LEDGER_FORM_FIELDS.TAX_RATES as any) || []) as TaxRateRow[];
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
    (rowIndex: number, columnId?: string, cellValue?: unknown): 'ADVANCE' | 'EXIT' | 'STAY' => {
      const currentRows = (form.getValues(LEDGER_FORM_FIELDS.TAX_RATES as any) || []) as TaxRateRow[];
      let row = currentRows[rowIndex];
      if (!row) return 'EXIT';

      // Rule 1: Prevent React Async Stale State on Rapid Commits
      if (columnId && cellValue !== undefined) {
        row = { ...row, [columnId]: cellValue };
        updateData(rowIndex, columnId, cellValue);
      }

      const hasEffectiveFrom = Boolean(row.effective_from);
      const hasTaxGroup = Boolean(row.tax_group_id && row.tax_group_id.trim() !== '');

      const isValid = hasEffectiveFrom && hasTaxGroup;

      if (!isValid) {
        setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: true }));
        setTimeout(() => {
          setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: false }));
        }, 800);
        return 'STAY';
      }

      // Rule 8: Atomic Batching with replace()
      if (row.isPhantom) {
        const rowsToReplace = [...currentRows];
        rowsToReplace[rowIndex] = { ...row, isPhantom: false };
        rowsToReplace.push(createDefaultPhantomRow());
        replace(rowsToReplace);
        return 'ADVANCE';
      }

      return 'ADVANCE';
    },
    [form, replace, updateData]
  );

  const isRowEmpty = useCallback((row: any) => {
    const data = row.original;
    return (
      !data.tax_group_id &&
      !data.excise_tax_group_id &&
      (!data.tax_rate || data.tax_rate === '0.00' || data.tax_rate === 0 || data.tax_rate === '')
    );
  }, []);

  return {
    fields,
    taxGroups,
    updateData,
    removeRow,
    onRowCommit,
    isRowEmpty,
    localRowErrors,
  };
};
