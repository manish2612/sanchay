import { type ColumnDef } from "@tanstack/react-table";
import { AutoSuggestCell } from "@/components/TableCells/AutoSuggestCell";
import { NumericCell } from "@/components/TableCells/NumericCell";
import { ActionCell } from "@/components/TableCells/ActionCell";

export type CostCenterAllocationRow = {
  id: string;
  costCategory: string;
  costCenter: string;
  amount: string;
  isPhantom?: boolean;
};

export const getColumns = (): ColumnDef<CostCenterAllocationRow>[] => [
  {
    accessorKey: "costCategory",
    header: "Cost Category",
    size: 180,
    minSize: 150,
    cell: AutoSuggestCell,
    meta: {
      layout: { fluid: true },
      inputConfig: { placeholder: "Search Category..." },
    },
  },
  {
    accessorKey: "costCenter",
    header: "Cost Centre",
    size: 200,
    minSize: 150,
    cell: AutoSuggestCell,
    meta: {
      layout: { fluid: true },
      inputConfig: { placeholder: "Search Cost Centre..." },
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    size: 142,
    cell: NumericCell,
    meta: {
      layout: { cellClassName: "px-2", headerClassName: "text-right" },
      inputConfig: { allowNegative: true },
    },
  },
  {
    id: "actions",
    size: 48,
    cell: ActionCell,
    meta: { layout: { cellClassName: "px-2" } },
  },
];
