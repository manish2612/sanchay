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
  const { control, formState: { errors, isSubmitted }, clearErrors } = useFormContext<VoucherFormValues>();

  const { fields, append, update } = useFieldArray({
    control,
    name: VOUCHER_FIELDS.LEDGER_ENTRIES,
  });

  const [activeDetailsRowIndex, setActiveDetailsRowIndex] = useState<number | null>(null);
  const [activeCostCenterRowIndex, setActiveCostCenterRowIndex] = useState<number | null>(null);

  const updateData = useCallback((rowIndex: number, columnId: string, value: unknown) => {
    update(rowIndex, { ...fields[rowIndex]!, [columnId]: value });
    // Manually clear field-level errors to prevent RHF useFieldArray cache bugs
    clearErrors(`${VOUCHER_FIELDS.LEDGER_ENTRIES}.${rowIndex}.${columnId}` as any);
  }, [update, fields, clearErrors]);

  // Derive row-level UI errors from Zod formState
  const formRowErrors = useMemo(() => {
    const errorMap: Record<number, Record<string, boolean>> = {};
    
    // 1. Highlight the phantom row if the user completely skipped entering data
    const rootMessage = errors.ledgerEntries?.root?.message || (errors.ledgerEntries as any)?.message;
    if (rootMessage === "At least one entry is required") {
      errorMap[0] = { name: true, amount: true, debitAmount: true, creditAmount: true };
    } else if (rootMessage && rootMessage.includes("must equal Total Credit")) {
      // Flag a root mismatch so the table footer can light up red
      errorMap[0] = errorMap[0] || {};
      errorMap[0].rootMismatch = true;
    }

    // 2. Map field-level errors (if any actual rows are invalid)
    if (errors.ledgerEntries && Array.isArray(errors.ledgerEntries)) {
      errors.ledgerEntries.forEach((err, idx) => {
        if (err) {
          const row = fields[idx] as any;
          // Suppress aggressive UI red borders on dirty phantom rows UNLESS the user tried to submit
          if (row?.isPhantom && !isSubmitted && rootMessage !== "At least one entry is required") {
             return;
          }

          errorMap[idx] = errorMap[idx] || {};
          if (err.ledgerId || err.name) errorMap[idx].name = true; // maps to AutoSuggestCell
          if (err.debitAmount) errorMap[idx].debitAmount = true;
          if (err.creditAmount) errorMap[idx].creditAmount = true;
          if (err.amount) errorMap[idx].amount = true;
        }
      });
    }
    return errorMap;
  }, [errors.ledgerEntries, isSubmitted, fields]);

  const onRowCommit = useCallback((rowIndex: number, columnId?: string, cellValue?: string) => {
    let row = fields[rowIndex];
    if (!row) return "STAY";

    // Merge the real-time DOM value to avoid React's async rendering making `fields` stale on rapid Enter presses
    if (columnId && cellValue !== undefined) {
      row = { ...row, [columnId]: cellValue } as any;
    }

    let isValid = row.name.trim() !== "";
    let amtValue = 0;

    if (applyMode === "Account Mode") {
      const debitString = typeof row.debitAmount === 'string' ? row.debitAmount : String(row.debitAmount || "");
      const creditString = typeof row.creditAmount === 'string' ? row.creditAmount : String(row.creditAmount || "");
      const debit = parseFloat(debitString.replace(/[^0-9.-]+/g, "")) || 0;
      const credit = parseFloat(creditString.replace(/[^0-9.-]+/g, "")) || 0;
      
      if (debit <= 0 && credit <= 0) isValid = false;
      amtValue = debit > 0 ? debit : credit;
    } else {
      const amtString = typeof row.amount === 'string' ? row.amount : String(row.amount || "");
      const amt = parseFloat(amtString.replace(/[^0-9.-]+/g, "")) || 0;
      if (amt <= 0) isValid = false;
      amtValue = amt;
    }

    if (!isValid) {
      // Just visually alert locally for a rapid typing mistake
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
        rowErrors: formRowErrors,
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
  }), [updateData, onRowCommit, setActiveDetailsRowIndex, formRowErrors, isRowEmpty, ledgerOptions, isPhantom]);

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
