import { useCallback, useEffect, useMemo, useState } from 'react';
import { useFieldArray } from 'react-hook-form';

export const useLedgerAllocationTable = (form: any) => {
  const openingBalanceString = form.watch('openingBalance');
  // Opening balance might be a string with non-numeric chars depending on the input component.
  const openingAmount = parseFloat(typeof openingBalanceString === 'string' ? openingBalanceString.replace(/[^0-9.-]+/g, "") : (openingBalanceString || 0)) || 0;

  // Watch the actual data array so we know exactly when to add/remove phantom row
  const ledgerAllocations = form.watch('ledgerAllocations') || [];

  const { fields, append, update, remove } = useFieldArray({
    control: form.control,
    name: 'ledgerAllocations',
  });

  // Calculate sum of allocated amounts (INCLUDING phantom rows so real-time validation works)
  const totalAllocatedAmount = useMemo(() => {
    return ledgerAllocations.reduce((sum: number, row: any) => {
      const amtStr = typeof row.amount === 'string' ? row.amount : String(row.amount || '');
      const amt = parseFloat(amtStr.replace(/[^0-9.-]+/g, '')) || 0;
      return sum + amt;
    }, 0);
  }, [ledgerAllocations]);

  // Manage Phantom Row Presence
  useEffect(() => {
    if (openingAmount <= 0) return;

    const currentRows = form.getValues('ledgerAllocations') || [];
    const hasPhantom = currentRows.some((row: any) => row.isPhantom);
    
    const currentSum = currentRows.reduce((acc: number, row: any) => {
      if (row.isPhantom) return acc;
      const amtStr = typeof row.amount === 'string' ? row.amount : String(row.amount || '');
      const amt = parseFloat(amtStr.replace(/[^0-9.-]+/g, '')) || 0;
      return acc + amt;
    }, 0);
    
    // epsilon comparison
    const hasRoom = Math.abs(currentSum - openingAmount) >= 0.001 && currentSum < openingAmount;

    if (hasRoom && !hasPhantom) {
      append({ ledger: '', amount: 0, isPhantom: true });
    } else if (!hasRoom && hasPhantom) {
      const phantomIndex = currentRows.findIndex((row: any) => row.isPhantom);
      if (phantomIndex !== -1) {
        remove(phantomIndex);
      }
    }
  }, [openingAmount, totalAllocatedAmount, append, remove, form]);

  const [localRowErrors, setLocalRowErrors] = useState<Record<number, boolean>>({});

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    const row = form.getValues(`ledgerAllocations.${rowIndex}`);
    if (row) {
      update(rowIndex, { ...row, [columnId]: value });
      form.clearErrors(`ledgerAllocations.${rowIndex}`);
    }
  }, [form, update]);

  const removeRow = useCallback((rowIndex: number) => {
    remove(rowIndex);
  }, [remove]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    let row = form.getValues(`ledgerAllocations.${rowIndex}`);
    
    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue };
      updateData(rowIndex, columnId, cellValue);
    }

    const amtStr = typeof row.amount === 'string' ? row.amount : String(row.amount || '');
    const amt = parseFloat(amtStr.replace(/[^0-9.-]+/g, '')) || 0;
    const isValid = row.ledger && row.ledger.trim() !== '' && amt > 0;

    if (!isValid) {
      setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: true }));
      setTimeout(() => {
        setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: false }));
      }, 800);
      return "STAY";
    }

    if (row && (row as any).isPhantom) {
      const committedRow = { ...row, isPhantom: false };
      update(rowIndex, committedRow);
      
      const currentRows = form.getValues('ledgerAllocations') || [];
      currentRows[rowIndex] = committedRow;
      
      const currentSum = currentRows.reduce((acc: number, r: any) => {
        if (r.isPhantom) return acc;
        const aStr = typeof r.amount === 'string' ? r.amount : String(r.amount || '');
        const a = parseFloat(aStr.replace(/[^0-9.-]+/g, '')) || 0;
        return acc + a;
      }, 0);
      
      const hasRoom = Math.abs(currentSum - openingAmount) >= 0.001 && currentSum < openingAmount;

      if (hasRoom) {
        append({ ledger: '', amount: 0, isPhantom: true });
      }
      
      return "ADVANCE";
    }
    return "EXIT";
  }, [form, update, updateData, append, openingAmount]);

  return {
    fields,
    updateData,
    removeRow,
    onRowCommit,
    openingAmount,
    totalAllocatedAmount,
    localRowErrors,
  };
};
