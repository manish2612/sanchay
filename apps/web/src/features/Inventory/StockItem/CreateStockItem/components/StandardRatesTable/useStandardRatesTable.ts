import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { STOCK_ITEM_FORM_FIELDS } from '../../constants';

export const useStandardRatesTable = (form: any) => {
  const enableStandardRates = form.watch(STOCK_ITEM_FORM_FIELDS.ENABLE_STANDARD_RATES);

  const { fields, append, update, remove, replace } = useFieldArray({
    control: form.control,
    name: STOCK_ITEM_FORM_FIELDS.STANDARD_RATES,
  });

  const [clearedRowErrors, setClearedRowErrors] = useState<Record<number, Record<string, boolean>>>({});

  // Reset locally cleared errors when fresh validation is triggered on submit
  const submitCount = form.formState.submitCount;
  useEffect(() => {
    setClearedRowErrors({});
  }, [submitCount]);

  // Extract RHF errors
  const formErrors = form.formState.errors?.[STOCK_ITEM_FORM_FIELDS.STANDARD_RATES];

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
    if (enableStandardRates && fields.length === 0) {
      append({ fromDate: new Date(), toDate: null, mrp: 0, netRate: 0, minSellingRate: 0, isPhantom: true });
    } else if (!enableStandardRates && fields.length > 0) {
      replace([]);
      form.clearErrors(STOCK_ITEM_FORM_FIELDS.STANDARD_RATES);
    }
  }, [enableStandardRates, fields.length, append, replace, form]);

  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      const row =
        form.getValues(`${STOCK_ITEM_FORM_FIELDS.STANDARD_RATES}.${rowIndex}`) || fields[rowIndex];
      if (row) {
        update(rowIndex, { ...row, [columnId]: value });
        setClearedRowErrors((prev) => ({
          ...prev,
          [rowIndex]: {
            ...(prev[rowIndex] || {}),
            [columnId]: true,
          },
        }));
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.STANDARD_RATES}.${rowIndex}.${columnId}`);
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.STANDARD_RATES}.${rowIndex}`);
        form.clearErrors(STOCK_ITEM_FORM_FIELDS.STANDARD_RATES);
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
        form.setValue(STOCK_ITEM_FORM_FIELDS.ENABLE_STANDARD_RATES, false);
        replace([]);
        form.clearErrors(STOCK_ITEM_FORM_FIELDS.STANDARD_RATES);
      } else {
        remove(rowIndex);
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.STANDARD_RATES}.${rowIndex}`);
      }
    },
    [fields, remove, replace, form]
  );

  const onRowCommit = useCallback(
    (rowIndex: number, columnId?: string, cellValue?: string) => {
      let row =
        form.getValues(`${STOCK_ITEM_FORM_FIELDS.STANDARD_RATES}.${rowIndex}`) || fields[rowIndex];
      if (!row) return 'EXIT';

      // Merge current cell value synchronously to prevent stale state issues
      if (columnId && cellValue !== undefined) {
        row = { ...row, [columnId]: cellValue };
      }

      if ((row as any).isPhantom) {
        // Pre-commit validation: at least one rate or price must be entered
        const mrp = Number(row.mrp) || 0;
        const netRate = Number(row.netRate) || 0;
        const minSellingRate = Number(row.minSellingRate) || 0;

        if (mrp === 0 && netRate === 0 && minSellingRate === 0) {
          return 'STAY';
        }

        const committedRow = { ...row, isPhantom: false };
        const currentRows = form.getValues(STOCK_ITEM_FORM_FIELDS.STANDARD_RATES) || [...fields];
        const newFields = [...currentRows];
        newFields[rowIndex] = committedRow;
        newFields.push({ fromDate: new Date(), toDate: null, mrp: 0, netRate: 0, minSellingRate: 0, isPhantom: true });

        // Atomic replace to avoid RHF state-batching race conditions
        replace(newFields);
        form.clearErrors(STOCK_ITEM_FORM_FIELDS.STANDARD_RATES);
        return 'ADVANCE';
      }

      return 'EXIT';
    },
    [fields, form, replace]
  );

  return {
    enableStandardRates,
    fields,
    rowErrors,
    errorSummary,
    updateData,
    removeRow,
    onRowCommit,
  };
};
