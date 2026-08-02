import { type ColumnDef } from "@tanstack/react-table";
import { AutoSuggestCell } from "../../../../components/TableCells/AutoSuggestCell";
import { NumericCell } from "../../../../components/TableCells/NumericCell";

export type LedgerEntryRow = {
  id: string;
  name: string;
  amount: string;
  vatAmt: string;
  isPhantom?: boolean;
};

const columnPaddingX2 = {
  meta: { cellClassName: "px-2" },
};

export const ledgerColumns: ColumnDef<LedgerEntryRow>[] = [
  { accessorKey: "name", header: "Ledger Name", size: 300, cell: AutoSuggestCell },
  { accessorKey: "amount", header: "Amount", size: 142, cell: NumericCell, meta: { cellClassName: "px-2", headerClassName: "text-right", allowNegative: true } },
  // { accessorKey: "vatAmt", header: "VAT Amt", size: 118, cell: NumericCell,  meta: { cellClassName: "px-2" } },
];
