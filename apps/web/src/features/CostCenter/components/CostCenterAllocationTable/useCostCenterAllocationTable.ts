import { useState, useCallback, useMemo, useRef } from "react";
import { type CostCenterAllocationRow } from "./columns";

const generateEmptyRow = (id: string): CostCenterAllocationRow => ({
  id,
  costCategory: "",
  costCenter: "",
  amount: "",
  isPhantom: true,
});

export function useCostCenterAllocationTable(
  initialAllocations: CostCenterAllocationRow[] = [],
  onChange?: (allocations: CostCenterAllocationRow[]) => void,
  targetAmount: number = 0
) {
  const [data, setData] = useState<CostCenterAllocationRow[]>(() => {
    const initial = initialAllocations.length > 0 ? initialAllocations : [];
    if (initial.length === 0 || !initial[initial.length - 1].isPhantom) {
      return [...initial, generateEmptyRow(`cc-row-${initial.length + 1}`)];
    }
    return initial;
  });

  const dataRef = useRef(data);
  dataRef.current = data;

  const [localRowErrors, setLocalRowErrors] = useState<Record<number, Record<string, boolean>>>({});

  const totalAllocatedAmount = useMemo(() => {
    return data.reduce((sum, row) => {
      if (row.isPhantom) return sum;
      const amtString = typeof row.amount === 'string' ? row.amount : String(row.amount || "");
      const amt = parseFloat(amtString.replace(/[^0-9.-]+/g, "")) || 0;
      return sum + amt;
    }, 0);
  }, [data]);

  const isFullyAllocated = Math.abs(totalAllocatedAmount - targetAmount) < 0.001 && targetAmount > 0;
  const isOverAllocated = totalAllocatedAmount > targetAmount;

  const rowErrors = useMemo(() => {
    const errs = { ...localRowErrors };
    if (isOverAllocated) {
      data.forEach((_: any, idx: number) => {
        errs[idx] = { ...(errs[idx] || {}), amount: true };
      });
    }
    return errs;
  }, [isOverAllocated, data, localRowErrors]);

  const notifyChange = (newData: CostCenterAllocationRow[]) => {
    if (onChange) {
      const validAllocations = newData.filter((r) => !r.isPhantom);
      onChange(validAllocations);
    }
  };

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    // Synchronously mutate ref for immediate intra-tick reads by onRowCommit
    dataRef.current = dataRef.current.map((row, index) => {
      if (index === rowIndex) {
        const newRow = { ...row, [columnId]: value };
        if (columnId === "costCategory" && value !== row.costCategory) {
          newRow.costCenter = "";
          newRow.costCenterId = "";
        }
        return newRow;
      }
      return row;
    });

    setData((old) => {
      const newData = [...old];
      const updatedRow = { ...newData[rowIndex]!, [columnId]: value };
      
      if (columnId === "costCategory" && value !== old[rowIndex]?.costCategory) {
        updatedRow.costCenter = "";
        updatedRow.costCenterId = "";
      }
      
      newData[rowIndex] = updatedRow;
      setTimeout(() => notifyChange(newData), 0);
      return newData;
    });
  }, [onChange]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    let isValid = true;
    const rowErrors: any = {};
    
    // Always read from ref to get intra-tick fresh data
    let row = dataRef.current[rowIndex];
    if (!row) return "STAY";

    // Merge the real-time DOM value to guarantee we have the absolute latest input
    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue } as any;
    }

    // Validation
    if (!row.costCategory || row.costCategory.trim() === "") {
      isValid = false;
      rowErrors.costCategory = true;
    }
    if (!row.costCenter || row.costCenter.trim() === "") {
      isValid = false;
      rowErrors.costCenter = true;
    }
    
    const amtString = typeof row.amount === 'string' ? row.amount : String(row.amount || "");
    const amt = parseFloat(amtString.replace(/[^0-9.-]+/g, ""));
    
    if (isNaN(amt) || amt <= 0) {
      isValid = false;
      rowErrors.amount = true;
    }

    if (!isValid) {
      setLocalRowErrors((prev) => ({ ...prev, [rowIndex]: rowErrors }));
      setTimeout(() => {
        setLocalRowErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[rowIndex];
          return newErrors;
        });
      }, 1000);
      return "STAY";
    }

    // Atomic mutation
    if (row.isPhantom) {
      setData((old) => {
        const newData = [...old];
        const committedRow = { ...newData[rowIndex]!, isPhantom: false };
        
        newData[rowIndex] = committedRow;
        newData.push(generateEmptyRow(`cc-row-${newData.length + 1}`));
        
        setTimeout(() => notifyChange(newData), 0);
        return newData;
      });
      return "ADVANCE";
    }

    return "EXIT";
  }, [updateData]);

  const removeRow = useCallback((rowIndex: number) => {
    setData((old) => {
      const newData = old.filter((_, index) => index !== rowIndex);
      if (newData.length === 0 || !newData[newData.length - 1].isPhantom) {
        newData.push(generateEmptyRow(`cc-row-${newData.length + 1}`));
      }
      setTimeout(() => notifyChange(newData), 0);
      return newData;
    });
  }, []);

  return {
    data,
    updateData,
    onRowCommit,
    removeRow,
    rowErrors,
    totalAllocatedAmount,
    isFullyAllocated,
    isOverAllocated,
  };
}
