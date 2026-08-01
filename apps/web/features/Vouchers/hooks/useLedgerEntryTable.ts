import { useState, useCallback } from "react";
import { type LedgerEntryRow } from "../components/LedgerEntryTable/columns";

const generateEmptyRow = (id: string): LedgerEntryRow => ({
  id,
  name: "",
  amount: "",
  vatAmt: "",
  isPhantom: true,
});

export function useLedgerEntryTable() {
  const [data, setData] = useState<LedgerEntryRow[]>([generateEmptyRow("row-1")]);
  const [rowErrors, setRowErrors] = useState<Record<number, boolean>>({});

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
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

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    let row = data[rowIndex];

    // Immediately sync the currently typing value before committing
    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue };
      updateData(rowIndex, columnId, cellValue);
    }

    // Validation: Name must be selected
    const isValid = row.name.trim() !== "";

    if (!isValid) {
      setRowErrors((prev) => ({ ...prev, [rowIndex]: true }));
      setTimeout(() => {
        setRowErrors((prev) => ({ ...prev, [rowIndex]: false }));
      }, 800);
      return "STAY";
    }

    if (row.isPhantom) {
      setData((old) => {
        const newData = [...old];
        const committedRow = columnId && cellValue !== undefined
          ? { ...newData[rowIndex]!, [columnId]: cellValue, isPhantom: false }
          : { ...newData[rowIndex]!, isPhantom: false };

        newData[rowIndex] = committedRow;

        newData.push(generateEmptyRow(`row-${newData.length + 1}`));
        return newData;
      });
      return "ADVANCE";
    }
    
    return "EXIT";
  }, [data, updateData]);

  return {
    data,
    rowErrors,
    updateData,
    onRowCommit,
  };
}
