import { useCallback, useMemo } from 'react';
import type { FieldValues, UseFormReturn } from 'react-hook-form';
import type {
  RowErrorInfo,
  UseTableRowErrorsOptions,
  UseTableRowErrorsReturn,
} from './types';

const formatColumnName = (colId: string): string => {
  return colId
    .replace(/_/g, ' ')
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

export const useTableRowErrors = <
  TData extends Record<string, unknown> = Record<string, unknown>,
  TFormValues extends FieldValues = FieldValues,
>(
  form: UseFormReturn<TFormValues>,
  fieldName: string,
  options: UseTableRowErrorsOptions<TData>
): UseTableRowErrorsReturn => {
  const { fields, isRowEmpty, isPhantom, columnLabels = {} } = options;

  // Extract raw RHF errors for the given field array
  const formFieldErrors = form.formState.errors?.[fieldName] as unknown;

  const tableRootError = useMemo<string | undefined>(() => {
    if (!formFieldErrors || typeof formFieldErrors !== 'object') return undefined;
    const errObj = formFieldErrors as Record<string, unknown>;
    let msg: string | undefined;
    if (errObj.root && typeof errObj.root === 'object') {
      const rootErr = errObj.root as { message?: string };
      if (rootErr.message) msg = rootErr.message;
    }
    if (!msg && typeof errObj.message === 'string') {
      msg = errObj.message;
    }
    if (!msg) return undefined;

    // Suppress root error if user has not interacted with the table yet and form is not submitted
    const isTablePristine =
      fields.length === 0 ||
      fields.every((row) => (isRowEmpty ? isRowEmpty(row) : false));

    const isSubmitted =
      Boolean(form.formState.isSubmitted) || form.formState.submitCount > 0;
    const isDirty = Boolean(form.formState.dirtyFields?.[fieldName]);
    const isTouched = Boolean(form.formState.touchedFields?.[fieldName]);

    if (isTablePristine && !isDirty && !isTouched && !isSubmitted) {
      return undefined;
    }

    return msg;
  }, [formFieldErrors, fields, isRowEmpty, form.formState, fieldName]);

  const rowErrors = useMemo<Record<number, Record<string, string>>>(() => {
    const errorMap: Record<number, Record<string, string>> = {};
    if (!formFieldErrors || !Array.isArray(formFieldErrors)) return errorMap;

    formFieldErrors.forEach((rowErr: unknown, idx: number) => {
      if (!rowErr || typeof rowErr !== 'object') return;

      const rowData = fields[idx];
      const isPhantomRow = isPhantom
        ? isPhantom(rowData)
        : Boolean((rowData as Record<string, unknown>)?.isPhantom);
      const isPristineRow = isRowEmpty ? isRowEmpty(rowData) : false;

      // Pristine untouched phantom rows should never display errors
      if (isPhantomRow && isPristineRow) return;

      const rowCols: Record<string, string> = {};
      const rowErrObj = rowErr as Record<string, unknown>;
      Object.keys(rowErrObj).forEach((colId) => {
        const errObj = rowErrObj[colId];
        const msg =
          typeof errObj === 'object' && errObj !== null
            ? (errObj as { message?: string })?.message
            : typeof errObj === 'string'
              ? errObj
              : undefined;
        if (msg) {
          rowCols[colId] = msg;
        }
      });

      if (Object.keys(rowCols).length > 0) {
        errorMap[idx] = rowCols;
      }
    });

    return errorMap;
  }, [formFieldErrors, fields, isPhantom, isRowEmpty]);

  const errorsList = useMemo<RowErrorInfo[]>(() => {
    return Object.entries(rowErrors).map(([idxStr, colErrors]) => {
      const idx = Number(idxStr);
      const rowData = fields[idx];
      const isPhantomRow = isPhantom
        ? isPhantom(rowData)
        : Boolean((rowData as Record<string, unknown>)?.isPhantom);

      const messages: string[] = [];
      Object.entries(colErrors).forEach(([colId, msg]) => {
        const friendlyCol = columnLabels[colId] || formatColumnName(colId);
        // If message already contains column name or starts with "row", use it; otherwise prefix
        if (
          msg.toLowerCase().includes(friendlyCol.toLowerCase()) ||
          msg.toLowerCase().startsWith('row ')
        ) {
          messages.push(msg);
        } else {
          messages.push(`${friendlyCol}: ${msg}`);
        }
      });

      return {
        rowIndex: idx,
        rowNumber: idx + 1,
        isPhantom: isPhantomRow,
        fieldErrors: colErrors,
        messages,
      };
    });
  }, [rowErrors, fields, isPhantom, columnLabels]);

  const clearRowErrors = useCallback(
    (rowIndex: number, columnId?: string) => {
      if (columnId) {
        form.clearErrors(`${fieldName}.${rowIndex}.${columnId}` as any);
      } else {
        form.clearErrors(`${fieldName}.${rowIndex}` as any);
      }
    },
    [form, fieldName]
  );

  const totalErrorCount = useMemo(() => {
    return errorsList.reduce((acc, row) => acc + row.messages.length, 0);
  }, [errorsList]);

  return {
    rowErrors,
    errorsList,
    hasErrors: errorsList.length > 0 || Boolean(tableRootError),
    totalErrorCount,
    tableRootError,
    clearRowErrors,
  };
};
