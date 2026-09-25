import { useState, useCallback, useRef } from "react";
import { type LedgerEntryRow } from "../components/LedgerEntryTable/columns";

const generateEmptyRow = (id: string): LedgerEntryRow => ({
  id,
  name: "",
  amount: "",
  debitAmount: "",
  creditAmount: "",
  vatAmt: "",
  isPhantom: true,
});

export function useLedgerEntryTable(applyMode: string = "Item Mode") {
  const [data, setData] = useState<LedgerEntryRow[]>([generateEmptyRow("row-1")]);
  
  const dataRef = useRef(data);
  dataRef.current = data;

  const [rowErrors, setRowErrors] = useState<Record<number, boolean>>({});
  const [activeDetailsRowIndex, setActiveDetailsRowIndex] = useState<number | null>(null);
  const [activeCostCenterRowIndex, setActiveCostCenterRowIndex] = useState<number | null>(null);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    // Synchronously mutate ref for immediate intra-tick reads by onRowCommit
    dataRef.current = dataRef.current.map((row, index) =>
      index === rowIndex ? { ...row, [columnId]: value } : row
    );

    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex]!,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  }, []);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string) => {
    let row = dataRef.current[rowIndex];
    if (!row) return "STAY";

    // Validation: Name must be selected
    let isValid = row.name.trim() !== "";
    let amtValue = 0;

    // Amount validation based on mode
    if (applyMode === "Account Mode") {
      const debitString = typeof row.debitAmount === 'string' ? row.debitAmount : String(row.debitAmount || "");
      const creditString = typeof row.creditAmount === 'string' ? row.creditAmount : String(row.creditAmount || "");
      const debit = parseFloat(debitString.replace(/[^0-9.-]+/g, ""));
      const credit = parseFloat(creditString.replace(/[^0-9.-]+/g, ""));
      if (isNaN(debit) && isNaN(credit)) isValid = false;
      amtValue = isNaN(debit) ? (isNaN(credit) ? 0 : credit) : debit;
    } else {
      const amtString = typeof row.amount === 'string' ? row.amount : String(row.amount || "");
      const amt = parseFloat(amtString.replace(/[^0-9.-]+/g, ""));
      if (isNaN(amt) || amt <= 0) isValid = false;
      amtValue = isNaN(amt) ? 0 : amt;
    }

    if (!isValid) {
      setRowErrors((prev) => ({ ...prev, [rowIndex]: true }));
      setTimeout(() => {
        setRowErrors((prev) => ({ ...prev, [rowIndex]: false }));
      }, 800);
      return "STAY";
    }

    // Check if we need to open the Cost Center Allocation Sheet
    const isAmountColumn = !columnId || columnId === "debitAmount" || columnId === "creditAmount" || columnId === "amount";
    if (isAmountColumn && amtValue > 0) {
      setTimeout(() => setActiveCostCenterRowIndex(rowIndex), 0);
    }

    if (row.isPhantom) {
      setData((old) => {
        const newData = [...old];
        const committedRow = { ...newData[rowIndex]!, isPhantom: false };

        newData[rowIndex] = committedRow;
        newData.push(generateEmptyRow(`row-${newData.length + 1}`));
        return newData;
      });
      return "ADVANCE";
    }
    
    return "EXIT";
  }, [updateData, applyMode]);

  const activeCostCenterRow = activeCostCenterRowIndex !== null ? data[activeCostCenterRowIndex] : null;
  
  let activeCostCenterTargetAmount = 0;
  if (activeCostCenterRow) {
    if (applyMode === "Account Mode") {
      const debit = parseFloat(activeCostCenterRow.debitAmount.replace(/[^0-9.-]+/g, ""));
      const credit = parseFloat(activeCostCenterRow.creditAmount.replace(/[^0-9.-]+/g, ""));
      activeCostCenterTargetAmount = isNaN(debit) || debit === 0 ? (isNaN(credit) ? 0 : credit) : debit;
    } else {
      activeCostCenterTargetAmount = parseFloat(activeCostCenterRow.amount.replace(/[^0-9.-]+/g, "")) || 0;
    }
  }

  return {
    data,
    rowErrors,
    updateData,
    onRowCommit,
    activeDetailsRowIndex,
    setActiveDetailsRowIndex,
    activeCostCenterRowIndex,
    setActiveCostCenterRowIndex,
    activeCostCenterRow,
    activeCostCenterTargetAmount,
  };
}
