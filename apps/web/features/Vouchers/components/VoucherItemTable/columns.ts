import { type ColumnDef } from "@tanstack/react-table";
import { AutoSuggestCell } from "../../../../components/TableCells/AutoSuggestCell";
import { NumericCell } from "../../../../components/TableCells/NumericCell";
import { TextCell } from "../../../../components/TableCells/TextCell";

export type VoucherRow = {
  id: string;
  item: string;
  qty: string;
  freeQty: string;
  altQty: string;
  netRate: string;
  rate: string;
  per: string;
  discPer: string;
  discAmt: string;
  amount: string;
  vatAmt: string;
  isPhantom?: boolean;
};

const columnPaddingX2={
  meta: { cellClassName: "px-2" }
}

import { ReadOnlyNumericCell } from "../../../../components/TableCells/ReadOnlyNumericCell";

export const editableColumns: ColumnDef<VoucherRow>[] = [
  { accessorKey: "item", header: "Name of Item", size: 300, cell: AutoSuggestCell },
  { accessorKey: "qty", header: "Qty", size: 80, cell: NumericCell, ...columnPaddingX2 },
  { accessorKey: "freeQty", header: "Free Qty", size: 90, cell: NumericCell, ...columnPaddingX2 },
  { accessorKey: "altQty", header: "Alt. Qty", size: 90, cell: NumericCell, ...columnPaddingX2 },
  { accessorKey: "netRate", header: "Net Rate", size: 90, cell: NumericCell , ...columnPaddingX2 },
  { accessorKey: "rate", header: "Rate", size: 100, cell: NumericCell , ...columnPaddingX2 },
  { accessorKey: "per", header: "Per", size: 70, cell: TextCell , ...columnPaddingX2 },
  { accessorKey: "discPer", header: "Disc. %", size: 80, cell: NumericCell , ...columnPaddingX2 },
  { accessorKey: "discAmt", header: "Disc. Amt", size: 100, cell: NumericCell , ...columnPaddingX2 },
  { accessorKey: "amount", header: "Amount", size: 120, cell: ReadOnlyNumericCell, ...columnPaddingX2 },
  { accessorKey: "vatAmt", header: "VAT Amt", size: 100, cell: ReadOnlyNumericCell , ...columnPaddingX2 },
];
