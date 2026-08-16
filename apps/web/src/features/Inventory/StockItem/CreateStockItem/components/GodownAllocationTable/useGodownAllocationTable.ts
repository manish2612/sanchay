import { useCallback, useEffect, useMemo } from 'react';
import { useFieldArray } from 'react-hook-form';
import { STOCK_ITEM_FORM_FIELDS } from '../../constants';

export const useGodownAllocationTable = (form: any) => {
  const enableGodownAllocation = form.watch(STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION);
  const openingQuantity = Number(form.watch(STOCK_ITEM_FORM_FIELDS.OPENING_QUANTITY)) || 0;
  const openingRate = Number(form.watch(STOCK_ITEM_FORM_FIELDS.OPENING_RATE)) || 0;

  // Watch the actual data array so we know exactly when to add/remove phantom row
  const godownAllocations = form.watch(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS) || [];

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS,
  });

  // Calculate sum of allocated quantities (excluding phantom rows)
  const totalAllocatedQuantity = useMemo(() => {
    return godownAllocations.reduce((sum: number, row: any) => {
      if (row.isPhantom) return sum;
      return sum + (Number(row.quantity) || 0);
    }, 0);
  }, [godownAllocations]);

  const canAddMore = openingQuantity > 0 && totalAllocatedQuantity < openingQuantity;

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
      append({ godown: '', quantity: 0, rate: openingRate, isPhantom: true });
    } else if (!hasRoom && hasPhantom) {
      const phantomIndex = currentRows.findIndex((row: any) => row.isPhantom);
      if (phantomIndex !== -1) {
        remove(phantomIndex);
      }
    }
  }, [enableGodownAllocation, openingQuantity, openingRate, totalAllocatedQuantity, append, remove, form]);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    const row = form.getValues(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}`);
    if (row) {
      update(rowIndex, { ...row, [columnId]: value });
    }
  }, [form, update]);

  const removeRow = useCallback((rowIndex: number) => {
    const currentRows = form.getValues(STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS) || [];
    
    // If we removed the last row, turn off the switch to clear validation errors
    if (currentRows.length <= 1 || (currentRows[rowIndex] as any)?.isPhantom) {
      form.setValue(STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION, false);
      remove(); // clear all remaining fields
    } else {
      remove(rowIndex);
    }
  }, [remove, form]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    const row = form.getValues(`${STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS}.${rowIndex}`);
    if (row && (row as any).isPhantom) {
      const committedRow = columnId && cellValue !== undefined
        ? { ...row, [columnId]: cellValue, isPhantom: false }
        : { ...row, isPhantom: false };
      
      update(rowIndex, committedRow);
      
      // We don't automatically append phantom here, the useEffect will do it if hasRoom is true
      return "ADVANCE";
    }
    return "EXIT";
  }, [form, update]);

  // Sync Godown allocations to outside Rate and Amount
  useEffect(() => {
    if (!enableGodownAllocation) return;

    let totalRate = 0;
    let totalAmount = 0;

    godownAllocations.forEach((row: any) => {
      if (!row.isPhantom) {
        const qty = Number(row.quantity) || 0;
        const rate = Number(row.rate) || 0;
        totalRate += rate;
        totalAmount += (qty * rate);
      }
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
  };
};
