import { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { ArrayPath, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { useFieldArray } from 'react-hook-form';
import { type CostCenterAllocationRow } from './columns';
import { isCostCenterRowEmpty } from './schema';
import { useTableRowErrors } from '@/components/EditableTable';

export { isCostCenterRowEmpty };

export const createDefaultCostCenterPhantomRow = (id = crypto.randomUUID()): CostCenterAllocationRow => ({
  id,
  costCategoryId: '',
  costCategory: '',
  costCenterId: '',
  costCenter: '',
  amount: '',
  isPhantom: true,
});

export interface CostCenterAllocationTableOptions<TFormValues extends FieldValues = FieldValues> {
  form?: UseFormReturn<TFormValues>;
  name?: string;
  initialAllocations?: CostCenterAllocationRow[];
  onChange?: (allocations: CostCenterAllocationRow[]) => void;
  targetAmount?: number;
}

export function useCostCenterAllocationTable<TFormValues extends FieldValues = FieldValues>(
  optionsOrAllocations?: CostCenterAllocationTableOptions<TFormValues> | CostCenterAllocationRow[],
  legacyOnChange?: (allocations: CostCenterAllocationRow[]) => void,
  legacyTargetAmount: number = 0
) {
  const isOptionsObject =
    optionsOrAllocations &&
    !Array.isArray(optionsOrAllocations) &&
    typeof optionsOrAllocations === 'object';

  const form = isOptionsObject
    ? (optionsOrAllocations as CostCenterAllocationTableOptions<TFormValues>).form
    : undefined;
  const fieldName =
    (isOptionsObject &&
      (optionsOrAllocations as CostCenterAllocationTableOptions<TFormValues>).name) ||
    'costCenterAllocations';
  const initialAllocationsProp = isOptionsObject
    ? (optionsOrAllocations as CostCenterAllocationTableOptions<TFormValues>)
        .initialAllocations
    : Array.isArray(optionsOrAllocations)
      ? optionsOrAllocations
      : undefined;

  const initialAllocations = useMemo(
    () => initialAllocationsProp || [],
    [initialAllocationsProp]
  );
  const onChange = isOptionsObject
    ? (optionsOrAllocations as CostCenterAllocationTableOptions<TFormValues>).onChange
    : legacyOnChange;
  const targetAmount = isOptionsObject
    ? (optionsOrAllocations as CostCenterAllocationTableOptions<TFormValues>)
        .targetAmount || 0
    : legacyTargetAmount;

  // --- RHF Field Array Path ---
  const { fields: arrayFields, replace, update } = useFieldArray({
    control: form?.control,
    name: (form ? fieldName : '') as unknown as ArrayPath<TFormValues>,
  });

  // --- Local State Fallback (for Standalone / Sheet Mode) ---
  const [localData, setLocalData] = useState<CostCenterAllocationRow[]>(() => {
    const initial = initialAllocations.length > 0 ? initialAllocations : [];
    if (initial.length === 0 || !initial[initial.length - 1].isPhantom) {
      return [...initial, createDefaultCostCenterPhantomRow(`cc-row-${initial.length + 1}`)];
    }
    return initial;
  });

  const localDataRef = useRef(localData);
  localDataRef.current = localData;

  const [standaloneRowErrors, setStandaloneRowErrors] = useState<
    Record<number, Record<string, boolean>>
  >({});

  // --- Form Error Extraction via useTableRowErrors ---
  const tableRowErrorsResult = useTableRowErrors(
    form as UseFormReturn<TFormValues>,
    fieldName,
    {
      fields:
        (form
          ? (arrayFields as unknown as Record<string, unknown>[])
          : []) || [],
      isRowEmpty: isCostCenterRowEmpty,
      isPhantom: (row) => Boolean((row as Record<string, unknown>)?.isPhantom),
      columnLabels: {
        costCategory: 'Cost Category',
        costCenter: 'Cost Centre',
        amount: 'Amount',
      },
    }
  );

  const fields = form
    ? (arrayFields as unknown as CostCenterAllocationRow[])
    : localData;

  // Ensure there is always a phantom row when form is provided
  useEffect(() => {
    if (!form) return;
    const currentRows = (form.getValues(
      fieldName as unknown as Path<TFormValues>
    ) || []) as unknown as CostCenterAllocationRow[];
    const hasPhantom = currentRows.some((row) => row.isPhantom);

    if (!hasPhantom) {
      const newRows = [...currentRows, createDefaultCostCenterPhantomRow()];
      replace(
        newRows as unknown as Parameters<typeof replace>[0]
      );
    }
  }, [arrayFields.length, form, fieldName, replace]);

  // Sync initialAllocations if in local standalone mode
  useEffect(() => {
    if (form) return;
    if (initialAllocations && initialAllocations.length > 0) {
      const rowsWithoutPhantom = localDataRef.current.filter((r) => !r.isPhantom);
      const isSame =
        rowsWithoutPhantom.length === initialAllocations.length &&
        rowsWithoutPhantom.every(
          (r, i) =>
            r.costCenterId === initialAllocations[i].costCenterId &&
            r.amount === initialAllocations[i].amount
        );
      if (!isSame) {
        const next = [...initialAllocations];
        if (!next.some((r) => r.isPhantom)) {
          next.push(
            createDefaultCostCenterPhantomRow(`cc-row-${next.length + 1}`)
          );
        }
        setLocalData(next);
        localDataRef.current = next;
      }
    }
  }, [form, initialAllocations]);

  const notifyChange = useCallback(
    (newData: CostCenterAllocationRow[]) => {
      if (onChange) {
        const validAllocations = newData.filter((r) => !isCostCenterRowEmpty(r));
        onChange(validAllocations);
      }
    },
    [onChange]
  );

  // Total allocated amount calculation
  const totalAllocatedAmount = useMemo(() => {
    return fields.reduce((sum, row) => {
      if (isCostCenterRowEmpty(row)) return sum;
      const amtString =
        typeof row.amount === 'string' ? row.amount : String(row.amount || '');
      const amt = parseFloat(amtString.replace(/[^0-9.-]+/g, '')) || 0;
      return sum + amt;
    }, 0);
  }, [fields]);

  const isFullyAllocated =
    Math.abs(totalAllocatedAmount - targetAmount) < 0.001 && targetAmount > 0;
  const isOverAllocated = totalAllocatedAmount > targetAmount;

  // Update Data Handler
  const updateData = useCallback(
    (rowIndex: number, columnId: string, value: unknown) => {
      if (form) {
        const currentRows = (form.getValues(
          fieldName as unknown as Path<TFormValues>
        ) || []) as unknown as CostCenterAllocationRow[];
        const row = currentRows[rowIndex];
        if (row) {
          const updatedRow = {
            ...row,
            [columnId]: value,
            ...(columnId === 'costCategory' && value !== row.costCategory
              ? { costCenter: '', costCenterId: '' }
              : {}),
          };
          update(
            rowIndex,
            updatedRow as unknown as Parameters<typeof update>[1]
          );

          tableRowErrorsResult.clearRowErrors(rowIndex, columnId);

          // Auto-revert: If the row is emptied back to pristine, clear errors immediately
          if (isCostCenterRowEmpty(updatedRow)) {
            form.clearErrors(
              `${fieldName}.${rowIndex}` as unknown as Path<TFormValues>
            );
            tableRowErrorsResult.clearRowErrors(rowIndex);
          }

          const nextAll = [...currentRows];
          nextAll[rowIndex] = updatedRow;
          notifyChange(nextAll);
        }
      } else {
        localDataRef.current = localDataRef.current.map((row, index) => {
          if (index === rowIndex) {
            const newRow = { ...row, [columnId]: value };
            if (columnId === 'costCategory' && value !== row.costCategory) {
              newRow.costCenter = '';
              newRow.costCenterId = '';
            }
            return newRow;
          }
          return row;
        });

        setLocalData((old) => {
          const newData = [...old];
          const updatedRow = { ...newData[rowIndex]!, [columnId]: value };
          if (
            columnId === 'costCategory' &&
            value !== old[rowIndex]?.costCategory
          ) {
            updatedRow.costCenter = '';
            updatedRow.costCenterId = '';
          }
          newData[rowIndex] = updatedRow;
          setTimeout(() => notifyChange(newData), 0);
          return newData;
        });
      }
    },
    [form, fieldName, update, tableRowErrorsResult, notifyChange]
  );

  // Reset Row Handler (The Triple Escape Mechanism)
  const resetRow = useCallback(
    (rowIndex: number) => {
      if (form) {
        const currentRows = (form.getValues(
          fieldName as unknown as Path<TFormValues>
        ) || []) as unknown as CostCenterAllocationRow[];
        const row = currentRows[rowIndex];
        if (!row) return;

        if (row.isPhantom) {
          const newRows = [...currentRows];
          newRows[rowIndex] = createDefaultCostCenterPhantomRow(row.id);
          replace(
            newRows as unknown as Parameters<typeof replace>[0]
          );
        } else {
          const updated = currentRows.filter((_, idx) => idx !== rowIndex);
          if (!updated.some((r) => r.isPhantom)) {
            updated.push(createDefaultCostCenterPhantomRow());
          }
          replace(
            updated as unknown as Parameters<typeof replace>[0]
          );
        }

        form.clearErrors(
          `${fieldName}.${rowIndex}` as unknown as Path<TFormValues>
        );
        tableRowErrorsResult.clearRowErrors(rowIndex);
        notifyChange(
          form.getValues(
            fieldName as unknown as Path<TFormValues>
          ) as unknown as CostCenterAllocationRow[]
        );
      } else {
        setLocalData((old) => {
          const newData = [...old];
          const row = newData[rowIndex];
          if (!row) return old;

          if (row.isPhantom) {
            newData[rowIndex] = createDefaultCostCenterPhantomRow(
              row.id || `cc-row-${rowIndex + 1}`
            );
          } else {
            newData.splice(rowIndex, 1);
            if (newData.length === 0 || !newData[newData.length - 1].isPhantom) {
              newData.push(
                createDefaultCostCenterPhantomRow(`cc-row-${newData.length + 1}`)
              );
            }
          }
          localDataRef.current = newData;
          setTimeout(() => notifyChange(newData), 0);
          return newData;
        });
      }
    },
    [form, fieldName, replace, tableRowErrorsResult, notifyChange]
  );

  // Remove Row Handler
  const removeRow = useCallback(
    (rowIndex: number) => {
      if (form) {
        const currentRows = (form.getValues(
          fieldName as unknown as Path<TFormValues>
        ) || []) as unknown as CostCenterAllocationRow[];
        const updated = currentRows.filter((_, idx) => idx !== rowIndex);
        if (!updated.some((r) => r.isPhantom)) {
          updated.push(createDefaultCostCenterPhantomRow());
        }
        replace(
          updated as unknown as Parameters<typeof replace>[0]
        );
        form.clearErrors(
          `${fieldName}.${rowIndex}` as unknown as Path<TFormValues>
        );
        tableRowErrorsResult.clearRowErrors(rowIndex);
        notifyChange(updated);
      } else {
        setLocalData((old) => {
          const newData = old.filter((_, index) => index !== rowIndex);
          if (newData.length === 0 || !newData[newData.length - 1].isPhantom) {
            newData.push(
              createDefaultCostCenterPhantomRow(`cc-row-${newData.length + 1}`)
            );
          }
          localDataRef.current = newData;
          setTimeout(() => notifyChange(newData), 0);
          return newData;
        });
      }
    },
    [form, fieldName, replace, tableRowErrorsResult, notifyChange]
  );

  // onRowCommit Handler
  const onRowCommit = useCallback(
    (
      rowIndex: number,
      columnId?: string,
      cellValue?: string
    ): 'ADVANCE' | 'EXIT' | 'STAY' => {
      if (form) {
        const currentRows = (form.getValues(
          fieldName as unknown as Path<TFormValues>
        ) || []) as unknown as CostCenterAllocationRow[];
        let row = currentRows[rowIndex];
        if (!row) return 'EXIT';

        if (columnId && cellValue !== undefined) {
          row = { ...row, [columnId]: cellValue };
          updateData(rowIndex, columnId, cellValue);
        }

        const hasCategory = Boolean(
          row.costCategory && row.costCategory.trim() !== ''
        );
        const hasCenter = Boolean(
          row.costCenter && row.costCenter.trim() !== ''
        );
        const amtStr =
          typeof row.amount === 'string' ? row.amount : String(row.amount || '');
        const amt = parseFloat(amtStr.replace(/[^0-9.-]+/g, ''));
        const hasValidAmount = !isNaN(amt) && amt > 0;

        if (!hasCategory || !hasCenter || !hasValidAmount) {
          form.trigger(
            `${fieldName}.${rowIndex}` as unknown as Path<TFormValues>
          );
          return 'STAY';
        }

        // Commit phantom row
        if (row.isPhantom) {
          const rowsToReplace = [...currentRows];
          rowsToReplace[rowIndex] = { ...row, isPhantom: false };
          rowsToReplace.push(createDefaultCostCenterPhantomRow());
          replace(
            rowsToReplace as unknown as Parameters<typeof replace>[0]
          );

          form.clearErrors(
            `${fieldName}.${rowIndex}` as unknown as Path<TFormValues>
          );
          form.clearErrors(fieldName as unknown as Path<TFormValues>);
          tableRowErrorsResult.clearRowErrors(rowIndex);
          notifyChange(rowsToReplace);
          return 'ADVANCE';
        }

        return 'ADVANCE';
      } else {
        let isValid = true;
        const rowErrors: Record<string, boolean> = {};

        let row = localDataRef.current[rowIndex];
        if (!row) return 'STAY';

        if (columnId && cellValue !== undefined) {
          row = { ...row, [columnId]: cellValue } as unknown as CostCenterAllocationRow;
        }

        if (!row.costCategory || row.costCategory.trim() === '') {
          isValid = false;
          rowErrors.costCategory = true;
        }
        if (!row.costCenter || row.costCenter.trim() === '') {
          isValid = false;
          rowErrors.costCenter = true;
        }
        const amtString =
          typeof row.amount === 'string' ? row.amount : String(row.amount || '');
        const amt = parseFloat(amtString.replace(/[^0-9.-]+/g, ''));
        if (isNaN(amt) || amt <= 0) {
          isValid = false;
          rowErrors.amount = true;
        }

        if (!isValid) {
          setStandaloneRowErrors((prev) => ({ ...prev, [rowIndex]: rowErrors }));
          setTimeout(() => {
            setStandaloneRowErrors((prev) => {
              const next = { ...prev };
              delete next[rowIndex];
              return next;
            });
          }, 1000);
          return 'STAY';
        }

        if (row.isPhantom) {
          setLocalData((old) => {
            const newData = [...old];
            const committedRow = { ...row, isPhantom: false };
            newData[rowIndex] = committedRow;
            newData.push(
              createDefaultCostCenterPhantomRow(`cc-row-${newData.length + 1}`)
            );
            localDataRef.current = newData;
            setTimeout(() => notifyChange(newData), 0);
            return newData;
          });
          return 'ADVANCE';
        }

        return 'EXIT';
      }
    },
    [form, fieldName, replace, updateData, tableRowErrorsResult, notifyChange]
  );

  const rowErrors = form ? tableRowErrorsResult.rowErrors : standaloneRowErrors;
  const errorsList = form ? tableRowErrorsResult.errorsList : [];
  const tableRootError = form ? tableRowErrorsResult.tableRootError : undefined;

  return {
    data: fields,
    updateData,
    onRowCommit,
    resetRow,
    removeRow,
    rowErrors,
    errorsList,
    tableRootError,
    totalAllocatedAmount,
    isFullyAllocated,
    isOverAllocated,
    isRowEmpty: isCostCenterRowEmpty,
  };
}
