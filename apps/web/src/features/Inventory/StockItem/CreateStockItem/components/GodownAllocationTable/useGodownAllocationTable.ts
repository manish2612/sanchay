import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';
import { STOCK_ITEM_FORM_FIELDS } from '../../constants';
import { useGodownOptions } from '@/features/Masters/hooks/useGodownOptions';

export const useGodownAllocationTable = (form: any) => {
  const enableGodownAllocation = form.watch(STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION);
  const maintainBatches = form.watch(STOCK_ITEM_FORM_FIELDS.MAINTAIN_BATCHES);
  const trackMfgDate = form.watch(STOCK_ITEM_FORM_FIELDS.TRACK_MFG_DATE);
  const trackExpiryDate = form.watch(STOCK_ITEM_FORM_FIELDS.TRACK_EXPIRY_DATE);
  const openingQuantity = Number(form.watch(STOCK_ITEM_FORM_FIELDS.OPENING_QUANTITY)) || 0;
  const openingRate = Number(form.watch(STOCK_ITEM_FORM_FIELDS.OPENING_RATE)) || 0;

  const { options: godownOptions, isLoading: isLoadingGodowns } = useGodownOptions();

  // Watch the actual data array so we know exactly when to add/remove phantom row
  const godownAllocations = form.watch(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS) || [];

  const { fields, append, update, remove, replace } = useFieldArray({
    control: form.control,
    name: STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS,
  });

  const [clearedRowErrors, setClearedRowErrors] = useState<Record<number, Record<string, boolean>>>({});
  const [localRowErrors, setLocalRowErrors] = useState<Record<number, boolean>>({});

  // Reset locally cleared errors when fresh validation is triggered on submit
  const submitCount = form.formState.submitCount;
  useEffect(() => {
    setClearedRowErrors({});
  }, [submitCount]);

  // Clear batchNumber errors if maintainBatches is switched off
  useEffect(() => {
    if (!maintainBatches) {
      fields.forEach((_, idx) => {
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${idx}.batchNumber`);
      });
    }
  }, [maintainBatches, fields, form]);

  // Clear mfgDate errors if trackMfgDate is switched off
  useEffect(() => {
    if (!trackMfgDate) {
      fields.forEach((_, idx) => {
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${idx}.mfgDate`);
      });
    }
  }, [trackMfgDate, fields, form]);

  // Clear expiryDate errors if trackExpiryDate is switched off
  useEffect(() => {
    if (!trackExpiryDate) {
      fields.forEach((_, idx) => {
        form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${idx}.expiryDate`);
      });
    }
  }, [trackExpiryDate, fields, form]);

  // Extract RHF errors for godownAllocations
  const formErrors = form.formState.errors?.[STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS];

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
        if ((fields[idx] as any)?.isPhantom) return;

        const rowCols: Record<string, string> = {};
        Object.keys(rowErr).forEach((colId) => {
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
    if (tableError) {
      return tableError;
    }
    return undefined;
  }, [tableError, rowErrors]);

  // Calculate sum of allocated quantities (INCLUDING phantom rows so real-time validation works)
  const totalAllocatedQuantity = useMemo(() => {
    return godownAllocations.reduce((sum: number, row: any) => {
      return sum + (Number(row.quantity) || 0);
    }, 0);
  }, [godownAllocations]);

  const canAddMore = openingQuantity > 0 && totalAllocatedQuantity < openingQuantity;

  // Cleanup allocations and errors if switch is toggled off
  useEffect(() => {
    if (!enableGodownAllocation && fields.length > 0) {
      replace([]);
      form.clearErrors(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS);
    }
  }, [enableGodownAllocation, fields.length, replace, form]);

  // Manage Phantom Row Presence (Runs whenever allocations or quantity limits change)
  useEffect(() => {
    if (!enableGodownAllocation || openingQuantity <= 0) return;

    // Use getValues to avoid relying on stale closures if useMemo hasn't fired
    const currentRows = form.getValues(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS) || [];
    const hasPhantom = currentRows.some((row: any) => row.isPhantom);
    
    // We calculate sum manually here again just to be absolutely synchronous with getValues
    const currentSum = currentRows.reduce((acc: number, row: any) => acc + (row.isPhantom ? 0 : (Number(row.quantity) || 0)), 0);
    const hasRoom = currentSum < openingQuantity;

    if (hasRoom && !hasPhantom) {
      append({ godown: '', godownId: '', batchNumber: '', mfgDate: null, expiryDate: null, quantity: 0, rate: openingRate, isPhantom: true });
    } else if (!hasRoom && hasPhantom) {
      const phantomIndex = currentRows.findIndex((row: any) => row.isPhantom);
      if (phantomIndex !== -1) {
        remove(phantomIndex);
      }
    }
  }, [enableGodownAllocation, openingQuantity, openingRate, totalAllocatedQuantity, append, remove, form]);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    const row = form.getValues(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}`) || fields[rowIndex];
    if (row) {
      update(rowIndex, { ...row, [columnId]: value });
      setClearedRowErrors((prev) => ({
        ...prev,
        [rowIndex]: {
          ...(prev[rowIndex] || {}),
          [columnId]: true,
        },
      }));
      form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}.${columnId}`);
      form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}`);
      form.clearErrors(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS);
    }
  }, [fields, form, update]);

  const removeRow = useCallback((rowIndex: number) => {
    setClearedRowErrors((prev) => {
      const next = { ...prev };
      delete next[rowIndex];
      return next;
    });
    remove(rowIndex);
    form.clearErrors(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}`);
    form.clearErrors(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS);
  }, [remove, form]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    let row = form.getValues(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}`) || fields[rowIndex];
    if (!row) return 'EXIT';
    
    // Immediately sync the currently typing value before committing
    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue };
      updateData(rowIndex, columnId, cellValue);
    }

    // Validation: Godown must be selected, Qty must be valid, Rate must be valid
    const qty = Number(row.quantity) || 0;
    const rate = Number(row.rate) || 0;
    const isBatchesEnabled = Boolean(form.getValues(STOCK_ITEM_FORM_FIELDS.MAINTAIN_BATCHES));
    const batchNum = row.batchNumber ? String(row.batchNumber).trim() : '';
    const isBatchValid = !isBatchesEnabled || (Boolean(batchNum) && /^\d+$/.test(batchNum));

    const isMfgEnabled = Boolean(form.getValues(STOCK_ITEM_FORM_FIELDS.TRACK_MFG_DATE));
    const isMfgValid =
      !isMfgEnabled ||
      Boolean(row.mfgDate && (typeof row.mfgDate !== 'string' || row.mfgDate.trim() !== ''));

    const isExpiryEnabled = Boolean(form.getValues(STOCK_ITEM_FORM_FIELDS.TRACK_EXPIRY_DATE));
    const isExpiryValid =
      !isExpiryEnabled ||
      Boolean(row.expiryDate && (typeof row.expiryDate !== 'string' || row.expiryDate.trim() !== ''));

    const isValid =
      Boolean(row.godown && row.godown.trim() !== '') &&
      qty > 0 &&
      rate > 0 &&
      isBatchValid &&
      isMfgValid &&
      isExpiryValid;

    if (!isValid) {
      if (isBatchesEnabled && !isBatchValid) {
        form.setError(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}.batchNumber`, {
          type: 'custom',
          message: !batchNum ? 'Batch Number is required' : 'Batch Number must contain only numbers',
        });
      }
      if (isMfgEnabled && !isMfgValid) {
        form.setError(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}.mfgDate`, {
          type: 'custom',
          message: 'Manufacturing Date is required',
        });
      }
      if (isExpiryEnabled && !isExpiryValid) {
        form.setError(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}.expiryDate`, {
          type: 'custom',
          message: 'Expiry Date is required',
        });
      }
      setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: true }));
      setTimeout(() => {
        setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: false }));
      }, 800);
      return "STAY";
    }

    if (row && (row as any).isPhantom) {
      const committedRow = { ...row, isPhantom: false };
      update(rowIndex, committedRow);
      
      // Calculate hasRoom synchronously
      const currentRows = form.getValues(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS) || [];
      currentRows[rowIndex] = committedRow;
      
      const currentSum = currentRows.reduce((acc: number, r: any) => acc + (r.isPhantom ? 0 : (Number(r.quantity) || 0)), 0);
      const hasRoom = currentSum < openingQuantity;

      if (hasRoom) {
        append({ godown: '', godownId: '', batchNumber: '', mfgDate: null, expiryDate: null, quantity: 0, rate: openingRate, isPhantom: true });
      }
      
      form.clearErrors(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS);
      return "ADVANCE";
    }
    return "EXIT";
  }, [fields, form, update, updateData, append, openingQuantity, openingRate, maintainBatches, trackMfgDate, trackExpiryDate]);

  // Sync Godown allocations to outside Rate and Amount
  useEffect(() => {
    if (!enableGodownAllocation) return;

    let totalRate = 0;
    let totalAmount = 0;

    godownAllocations.forEach((row: any) => {
      if (row.isPhantom) return;
      const qty = Number(row.quantity) || 0;
      const rate = Number(row.rate) || 0;
      totalRate += rate;
      totalAmount += (qty * rate);
    });

    // Update main form fields safely without triggering unnecessary re-renders loop
    form.setValue(STOCK_ITEM_FORM_FIELDS.OPENING_RATE, totalRate > 0 ? totalRate.toFixed(2) : '');
    form.setValue(STOCK_ITEM_FORM_FIELDS.OPENING_AMOUNT, totalAmount > 0 ? totalAmount.toFixed(2) : '');
  }, [enableGodownAllocation, godownAllocations, form]);

  return {
    enableGodownAllocation,
    fields,
    updateData,
    removeRow,
    onRowCommit,
    openingQuantity,
    totalAllocatedQuantity,
    localRowErrors,
    rowErrors,
    errorSummary,
    tableError,
    godownOptions,
    isLoadingGodowns,
  };
};
