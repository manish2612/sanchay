import { useState, useCallback, useMemo } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { type LedgerEntryRow, ledgerColumns } from "../components/LedgerEntryTable/columns";
import { VOUCHER_FIELDS } from "../constants/voucherFields";
import { VoucherFormValues } from "../schema/voucherSchema";
import { type Ledger } from "@/features/Accounts/Ledger/types";

const generateEmptyRow = (id: string): LedgerEntryRow => ({
  id,
  name: "",
  amount: "",
  debitAmount: "",
  creditAmount: "",
  vatAmt: "",
  isPhantom: true,
});

export function useLedgerEntryTable(applyMode: string = "Item Mode", ledgers: Ledger[] = []) {
  const { control } = useFormContext<VoucherFormValues>();

  const { fields, append, update } = useFieldArray({
    control,
    name: VOUCHER_FIELDS.LEDGER_ENTRIES,
  });

  const [rowErrors, setRowErrors] = useState<Record<number, boolean>>({});
  const [activeDetailsRowIndex, setActiveDetailsRowIndex] = useState<number | null>(null);
  const [activeCostCenterRowIndex, setActiveCostCenterRowIndex] = useState<number | null>(null);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    update(rowIndex, { ...fields[rowIndex]!, [columnId]: value });
  }, [update, fields]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string) => {
    let row = fields[rowIndex];
    if (!row) return "STAY";

    let isValid = row.name.trim() !== "";
    let amtValue = 0;

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
      setTimeout(() => setRowErrors((prev) => ({ ...prev, [rowIndex]: false })), 800);
      return "STAY";
    }

    const isAmountColumn = !columnId || columnId === "debitAmount" || columnId === "creditAmount" || columnId === "amount";
    if (isAmountColumn && amtValue > 0) {
      const selectedLedger = ledgers.find((l) => l.name === row?.name);
      if (selectedLedger?.is_cost_entre_enabled) {
        setTimeout(() => setActiveCostCenterRowIndex(rowIndex), 0);
      }
    }

    if (row.isPhantom) {
      update(rowIndex, { ...row, isPhantom: false });
      append(generateEmptyRow(`ledger-row-${fields.length + 1}`));
      return "ADVANCE";
    }
    
    return "EXIT";
  }, [fields, update, append, applyMode, ledgers]);

  const activeCostCenterRow = activeCostCenterRowIndex !== null ? fields[activeCostCenterRowIndex] : null;
  
  let activeCostCenterTargetAmount = 0;
  if (activeCostCenterRow) {
    if (applyMode === "Account Mode") {
      const debit = parseFloat((activeCostCenterRow as any).debitAmount?.replace(/[^0-9.-]+/g, "") || "0");
      const credit = parseFloat((activeCostCenterRow as any).creditAmount?.replace(/[^0-9.-]+/g, "") || "0");
      activeCostCenterTargetAmount = isNaN(debit) || debit === 0 ? (isNaN(credit) ? 0 : credit) : debit;
    } else {
      activeCostCenterTargetAmount = parseFloat((activeCostCenterRow as any).amount?.replace(/[^0-9.-]+/g, "") || "0") || 0;
    }
  }

  // ─── View Model Logic (Derived State & Configurations) ─────────────

  const ledgerOptions = useMemo(() => {
    return ledgers.map((ledger) => ({
      id: ledger.id,
      label: ledger.name,
      value: ledger.name
    }));
  }, [ledgers]);

  const activeColumns = useMemo(() => {
    if (applyMode === "Account Mode") {
      return ledgerColumns.filter(col => 
        (col as any).accessorKey !== "amount" && (col as any).accessorKey !== "vatAmt"
      );
    }
    return ledgerColumns.filter(col => 
      (col as any).accessorKey !== "debitAmount" && (col as any).accessorKey !== "creditAmount"
    );
  }, [applyMode]);

  const totalDebit = useMemo(() => {
    return fields.reduce((sum, row) => sum + (parseFloat((row as any).debitAmount) || 0), 0).toFixed(2);
  }, [fields]);

  const totalCredit = useMemo(() => {
    return fields.reduce((sum, row) => sum + (parseFloat((row as any).creditAmount) || 0), 0).toFixed(2);
  }, [fields]);

  const isRowEmpty = useCallback((row: any) => row.original.name.trim() === "", []);
  const isPhantom = useCallback((row: any) => !!row.original.isPhantom, []);

  const tableOptions: any = useMemo(() => ({
    meta: {
      actions: {
        updateData,
        onRowCommit,
        openLineDetails: setActiveDetailsRowIndex,
      },
      state: {
        rowErrors,
        isRowEmpty,
      },
      options: {
        ledgers: ledgerOptions,
      },
      phantomRowConfig: {
        isPhantom,
        actionText: "Add New Entry",
      },
    },
  }), [updateData, onRowCommit, setActiveDetailsRowIndex, rowErrors, isRowEmpty, ledgerOptions, isPhantom]);

  const handleDetailsClose = useCallback((open: boolean) => {
    if (!open) setActiveDetailsRowIndex(null);
  }, []);

  const handleCostCenterClose = useCallback((open: boolean) => {
    if (!open) setActiveCostCenterRowIndex(null);
  }, []);

  const handleCostCenterSave = useCallback((allocations: any) => {
    if (activeCostCenterRowIndex !== null) {
      updateData(activeCostCenterRowIndex, 'costCenterAllocations', allocations);
    }
  }, [activeCostCenterRowIndex, updateData]);

  return {
    data: fields as LedgerEntryRow[],
    activeColumns,
    totalDebit,
    totalCredit,
    tableOptions,
    handleDetailsClose,
    handleCostCenterClose,
    handleCostCenterSave,
    activeDetailsRowIndex,
    activeCostCenterRowIndex,
    activeCostCenterRow,
    activeCostCenterTargetAmount,
    updateData, // Still returned just in case the view needs it explicitly
  };
}
