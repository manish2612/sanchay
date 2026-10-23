import { useCallback, useEffect, useState } from 'react';
import { useFieldArray, UseFormReturn } from 'react-hook-form';
import { LEDGER_FORM_FIELDS } from '../../constants';
import { type LedgerFormValues, isTaxRateRowEmpty } from '../../schema';
import type { TaxRateRow } from './types';
import { useGetTaxGroupsQuery } from '@/features/Masters/api/taxGroupsApi';
import { useTableRowErrors } from '@/components/EditableTable';

export const createDefaultPhantomRow = (): TaxRateRow => ({
  id: crypto.randomUUID(),
  effective_from: '',
  effective_to: '',
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

  // Reusable hook for extracting and synchronizing row-level errors
  const {
    rowErrors,
    errorsList,
    hasErrors,
    totalErrorCount,
    tableRootError,
    clearRowErrors,
  } = useTableRowErrors(form, LEDGER_FORM_FIELDS.TAX_RATES, {
    fields,
    isRowEmpty: isTaxRateRowEmpty,
    isPhantom: (row) => Boolean((row as any)?.isPhantom),
    columnLabels: {
      effective_from: 'Effective Date',
      tax_group_id: 'Tax Group',
      excise_tax_group_id: 'Excise Tax Group',
      applicability: 'Applicability',
      tax_rate: 'Tax Rate',
    },
  });

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

        // Immediate stale-error clearing on user input
        clearRowErrors(rowIndex, columnId);

        // Auto-revert: If the row is emptied back to default, clear errors immediately
        if (isTaxRateRowEmpty(updatedRow)) {
          form.clearErrors(`${LEDGER_FORM_FIELDS.TAX_RATES}.${rowIndex}` as any);
          clearRowErrors(rowIndex);
        }
      }
    },
    [form, update, taxGroups, clearRowErrors]
  );

  const resetRow = useCallback(
    (rowIndex: number) => {
      const currentRows = (form.getValues(LEDGER_FORM_FIELDS.TAX_RATES as any) || []) as TaxRateRow[];
      const row = currentRows[rowIndex];
      if (!row) return;

      if (row.isPhantom) {
        // Revert phantom row back to clean pristine defaults
        const newRows = [...currentRows];
        newRows[rowIndex] = createDefaultPhantomRow();
        replace(newRows);
      } else {
        // Remove committed row, ensuring at least one phantom row remains
        const updated = currentRows.filter((_, idx) => idx !== rowIndex);
        if (!updated.some((r) => r.isPhantom)) {
          updated.push(createDefaultPhantomRow());
        }
        replace(updated);
      }

      // Clear validation errors for this row
      form.clearErrors(`${LEDGER_FORM_FIELDS.TAX_RATES}.${rowIndex}` as any);
      clearRowErrors(rowIndex);
      setLocalRowErrors((prev) => {
        const next = { ...prev };
        delete next[rowIndex];
        return next;
      });
    },
    [form, replace, clearRowErrors]
  );

  const removeRow = useCallback(
    (rowIndex: number) => {
      const currentRows = (form.getValues(LEDGER_FORM_FIELDS.TAX_RATES as any) || []) as TaxRateRow[];
      const updated = currentRows.filter((_, idx) => idx !== rowIndex);
      if (!updated.some((r) => r.isPhantom)) {
        updated.push(createDefaultPhantomRow());
      }
      replace(updated);
      form.clearErrors(`${LEDGER_FORM_FIELDS.TAX_RATES}.${rowIndex}` as any);
      clearRowErrors(rowIndex);
    },
    [form, replace, clearRowErrors]
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

      // If effective_from is not set, default to today's ISO date upon commit
      if (!row.effective_from || String(row.effective_from).trim() === '') {
        row = { ...row, effective_from: new Date().toISOString() };
      }

      const hasTaxGroup = Boolean(row.tax_group_id && row.tax_group_id.trim() !== '');

      if (!hasTaxGroup) {
        form.trigger(`${LEDGER_FORM_FIELDS.TAX_RATES}.${rowIndex}` as any);
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

        // Clear RHF and local errors for this row upon successful commit
        form.clearErrors(`${LEDGER_FORM_FIELDS.TAX_RATES}.${rowIndex}` as any);
        form.clearErrors(LEDGER_FORM_FIELDS.TAX_RATES as any);
        clearRowErrors(rowIndex);
        setLocalRowErrors((prev) => {
          const next = { ...prev };
          delete next[rowIndex];
          return next;
        });
        return 'ADVANCE';
      }

      return 'ADVANCE';
    },
    [form, replace, updateData, clearRowErrors]
  );

  return {
    fields,
    taxGroups,
    updateData,
    removeRow,
    resetRow,
    onRowCommit,
    isRowEmpty: isTaxRateRowEmpty,
    localRowErrors,
    rowErrors,
    errorsList,
    hasErrors,
    totalErrorCount,
    tableRootError,
  };
};
