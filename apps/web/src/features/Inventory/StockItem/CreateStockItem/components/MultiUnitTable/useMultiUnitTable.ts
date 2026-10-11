import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { STOCK_ITEM_FORM_FIELDS } from '../../constants';
import { useStockUnitOptions } from '@/features/Masters/hooks/useStockUnitOptions';

export const useMultiUnitTable = (form: any) => {
  const enableMultiUnit = form.watch(STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT);
  const { options: unitOptions, isLoading: isLoadingUnits } = useStockUnitOptions();

  const { fields, append, update, remove, replace } = useFieldArray({
    control: form.control,
    name: STOCK_ITEM_FORM_FIELDS.MULTI_UNITS,
  });

  const [clearedRowErrors, setClearedRowErrors] = useState<Record<number, Record<string, boolean>>>({});

  // Reset locally cleared errors when fresh validation is triggered on submit
  const submitCount = form.formState.submitCount;
  useEffect(() => {
    setClearedRowErrors({});
  }, [submitCount]);

  // Extract RHF errors
  const formErrors = form.formState.errors?.[STOCK_ITEM_FORM_FIELDS.MULTI_UNITS];

  const tableError = useMemo<string | undefined>(() => {
    if (!formErrors) return undefined;
    if (formErrors.root?.message) return formErrors.root.message;
    if (typeof (formErrors as any).message === 'string') return (formErrors as any).message;
    return undefined;
  }, [formErrors]);

  const rowErrors = useMemo<Record<number, Record<string, string>>>(() => {
    const errorMap: Record<number, Record<string, string>> = {};

    if (Array.isArray(formErrors)) {
      formErrors.forEach((rowErr: any, idx: number) => {
        if (!rowErr) return;
        // Never report errors on phantom rows
        if ((fields[idx] as any)?.isPhantom) return;

        const rowCols: Record<string, string> = {};
        Object.keys(rowErr).forEach((colId) => {
          // If the user modified this cell since validation, suppress the stale error immediately
          if (clearedRowErrors[idx]?.[colId]) return;

          const errObj = rowErr[colId];
          const msg = errObj?.message || (typeof errObj === 'string' ? errObj : undefined);
          if (msg) {
            rowCols[colId] = msg;
          }
        });

        if (Object.keys(rowCols).length > 0) {
          errorMap[idx] = rowCols;
        }
      });
    }

    return errorMap;
  }, [formErrors, fields, clearedRowErrors]);

  const errorSummary = useMemo(() => {
    const firstRowIndex = Object.keys(rowErrors)[0];
    if (firstRowIndex !== undefined) {
      const firstColError = Object.values(rowErrors[Number(firstRowIndex)] || {})[0];
      if (firstColError) {
        return `Row ${Number(firstRowIndex) + 1}: ${firstColError}`;
      }
    }
    if (tableError && fields.filter((f: any) => !f.isPhantom).length === 0) {
      return tableError;
    }
    return undefined;
  }, [tableError, rowErrors, fields]);

  // Manage initial phantom row and cleanup on switch toggle
  useEffect(() => {
    if (enableMultiUnit && fields.length === 0) {
      append({ unit: '', quantity: 0, isPhantom: true });
    } else if (!enableMultiUnit && fields.length > 0) {
      replace([]);
      form.clearErrors(STOCK_ITEM_FORM_FIELDS.MULTI_UNITS);
    }
  }, [enableMultiUnit, fields.length, append, replace, form]);

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      const row =
        form.getValues(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}`) || fields[rowIndex];
      if (row) {
        update(rowIndex, { ...row, [columnId]: value });
        setClearedRowErrors((prev) => ({
          ...prev,
          [rowIndex]: {
            ...(prev[rowIndex] || {}),
            [columnId]: true,
          },
        }));
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}.${columnId}`);
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}`);
        form.clearErrors(STOCK_ITEM_FORM_FIELDS.MULTI_UNITS);
      }
    },
    [fields, form, update]
  );

  const removeRow = useCallback(
    (rowIndex: number) => {
      setClearedRowErrors((prev) => {
        const next = { ...prev };
        delete next[rowIndex];
        return next;
      });
      const remainingCommittedRows = fields.filter(
        (r: any, idx: number) => idx !== rowIndex && !r.isPhantom
      );
      if (remainingCommittedRows.length === 0) {
        // If all committed rows are removed, turn off switch and clear all
        form.setValue(STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT, false);
        replace([]);
        form.clearErrors(STOCK_ITEM_FORM_FIELDS.MULTI_UNITS);
      } else {
        remove(rowIndex);
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}`);
      }
    },
    [fields, remove, replace, form]
  );

  const onRowCommit = useCallback(
    (rowIndex: number, columnId?: string, cellValue?: string) => {
      let row =
        form.getValues(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}`) || fields[rowIndex];
      if (!row) return 'EXIT';

      // Merge current cell value synchronously to prevent stale state issues
      if (columnId && cellValue !== undefined) {
        row = { ...row, [columnId]: cellValue };
      }

      if ((row as any).isPhantom) {
        // Pre-commit validation: unit is required
        if (!row.unit || String(row.unit).trim() === '') {
          return 'STAY';
        }

        const committedRow = { ...row, isPhantom: false };
        const currentRows = form.getValues(STOCK_ITEM_FORM_FIELDS.MULTI_UNITS) || [...fields];
        const newFields = [...currentRows];
        newFields[rowIndex] = committedRow;
        newFields.push({ unit: '', quantity: 0, isPhantom: true });

        // Atomic replace to avoid RHF state-batching race conditions
        replace(newFields);
        form.clearErrors(STOCK_ITEM_FORM_FIELDS.MULTI_UNITS);
        return 'ADVANCE';
      }

      return 'EXIT';
    },
    [fields, form, replace]
  );

  return {
    enableMultiUnit,
    fields,
    unitOptions,
    isLoadingUnits,
    rowErrors,
    errorSummary,
    updateData,
    removeRow,
    onRowCommit,
  };
};
