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

const columnPaddingX2 = {
  meta: { layout: { cellClassName: "px-2" } }
};

import { ReadOnlyNumericCell } from "../../../../components/TableCells/ReadOnlyNumericCell";
import { SmartDiscountCell } from "../../../../components/TableCells/SmartDiscountCell";

export const editableColumns: ColumnDef<VoucherRow>[] = [
  { 
    accessorKey: "item", 
    header: "Name of Item", 
    size: 180, 
    minSize: 150,
    cell: AutoSuggestCell,
    meta: { layout: { fluid: true } }
  },
  { accessorKey: "qty", header: "Qty", size: 105, cell: NumericCell, ...columnPaddingX2 },
  { accessorKey: "freeQty", header: "Free Qty", size: 90, cell: NumericCell, ...columnPaddingX2 },
  { accessorKey: "altQty", header: "Alt. Qty", size: 90, cell: NumericCell, ...columnPaddingX2 },
  { accessorKey: "netRate", header: "Net Rate", size: 100, cell: NumericCell , ...columnPaddingX2 },
  { accessorKey: "rate", header: "Rate", size: 100, cell: NumericCell , ...columnPaddingX2 },
  { accessorKey: "per", header: "Per Unit", size: 70, cell: TextCell , ...columnPaddingX2 },
  { id: "discount", header: "Discount", size: 160, cell: SmartDiscountCell , ...columnPaddingX2 },
  { accessorKey: "amount", header: "Amount", size: 130, cell: ReadOnlyNumericCell, ...columnPaddingX2 },
  { accessorKey: "vatAmt", header: "VAT Amt", size: 110, cell: ReadOnlyNumericCell , ...columnPaddingX2 },
];
