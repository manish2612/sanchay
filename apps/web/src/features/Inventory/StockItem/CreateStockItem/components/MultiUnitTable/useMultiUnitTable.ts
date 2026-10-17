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
  const [commitErrors, setCommitErrors] = useState<Record<number, Record<string, string>>>({});

  // Reset locally cleared and commit errors when fresh validation is triggered on submit
  const submitCount = form.formState.submitCount;
  useEffect(() => {
    setClearedRowErrors({});
    setCommitErrors({});
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
        // Never report errors on untouched phantom rows
        const isUntouchedPhantom =
          (fields[idx] as any)?.isPhantom && !(fields[idx] as any)?.unit;
        if (isUntouchedPhantom) return;

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

    // Merge pre-commit validation errors
    Object.entries(commitErrors).forEach(([idxStr, cols]) => {
      const idx = Number(idxStr);
      if (Object.keys(cols).length > 0) {
        errorMap[idx] = {
          ...(errorMap[idx] || {}),
          ...cols,
        };
      }
    });

    return errorMap;
  }, [formErrors, fields, clearedRowErrors, commitErrors]);

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

        // Immediately clear commit error for this specific column
        setCommitErrors((prev) => {
          if (!prev[rowIndex]?.[columnId]) return prev;
          const next = { ...prev };
          const rowCols = { ...next[rowIndex] };
          delete rowCols[columnId];
          if (Object.keys(rowCols).length === 0) {
            delete next[rowIndex];
          } else {
            next[rowIndex] = rowCols;
          }
          return next;
        });

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
      setCommitErrors((prev) => {
        const next = { ...prev };
        delete next[rowIndex];
        return next;
      });
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

      const hasUnit = Boolean(row.unit && String(row.unit).trim() !== '');
      const rawQty = row.quantity;
      const parsedQty = typeof rawQty === 'string' ? parseFloat(rawQty) : Number(rawQty);
      const hasValidQty = !isNaN(parsedQty) && parsedQty > 0;

      if ((row as any).isPhantom) {
        // If completely empty phantom row, ignore commit and stay quietly
        if (!hasUnit && (!rawQty || parsedQty === 0)) {
          return 'STAY';
        }

        // Validate unit
        if (!hasUnit) {
          setCommitErrors((prev) => ({
            ...prev,
            [rowIndex]: {
              ...(prev[rowIndex] || {}),
              unit: 'Unit is required',
            },
          }));
          form.setError(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}.unit`, {
            type: 'manual',
            message: 'Unit is required',
          });
          return 'STAY';
        }

        // Validate quantity (must be non-zero and positive)
        if (!hasValidQty) {
          setCommitErrors((prev) => ({
            ...prev,
            [rowIndex]: {
              ...(prev[rowIndex] || {}),
              quantity: 'Quantity must be greater than 0',
            },
          }));
          form.setError(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}.quantity`, {
            type: 'manual',
            message: 'Quantity must be greater than 0',
          });
          return 'STAY';
        }

        // Both unit and quantity are valid -> Commit row and advance
        const committedRow = {
          ...row,
          unit: String(row.unit).trim(),
          quantity: parsedQty,
          isPhantom: false,
        };

        const currentRows = form.getValues(STOCK_ITEM_FORM_FIELDS.MULTI_UNITS) || [...fields];
        const newFields = [...currentRows];
        newFields[rowIndex] = committedRow;
        newFields.push({ unit: '', quantity: 0, isPhantom: true });

        setCommitErrors((prev) => {
          const next = { ...prev };
          delete next[rowIndex];
          return next;
        });

        // Atomic replace to avoid RHF state-batching race conditions
        replace(newFields);
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}`);
        form.clearErrors(STOCK_ITEM_FORM_FIELDS.MULTI_UNITS);
        return 'ADVANCE';
      }

      // Existing committed row edit validation
      if (!hasUnit) {
        setCommitErrors((prev) => ({
          ...prev,
          [rowIndex]: {
            ...(prev[rowIndex] || {}),
            unit: 'Unit is required',
          },
        }));
        form.setError(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}.unit`, {
          type: 'manual',
          message: 'Unit is required',
        });
        return 'STAY';
      }

      if (!hasValidQty) {
        setCommitErrors((prev) => ({
          ...prev,
          [rowIndex]: {
            ...(prev[rowIndex] || {}),
            quantity: 'Quantity must be greater than 0',
          },
        }));
        form.setError(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}.quantity`, {
          type: 'manual',
          message: 'Quantity must be greater than 0',
        });
        return 'STAY';
      }

      setCommitErrors((prev) => {
        const next = { ...prev };
        delete next[rowIndex];
        return next;
      });
      form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.MULTI_UNITS}.${rowIndex}`);
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
