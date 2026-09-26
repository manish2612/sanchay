import { type ColumnDef } from "@tanstack/react-table";
import { AutoSuggestCell } from "@/components/TableCells/AutoSuggestCell";
import { NumericCell } from "@/components/TableCells/NumericCell";
import { ActionCell } from "@/components/TableCells/ActionCell";

export type CostCenterAllocationRow = {
  id: string;
  costCategoryId?: string;
  costCategory: string;
  costCenterId?: string;
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
      inputConfig: { placeholder: "Search Category...", optionsKey: "costCategories", idKey: "costCategoryId" },
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
      inputConfig: { 
        placeholder: "Search Cost Centre...", 
        optionsKey: "costCenters", 
        idKey: "costCenterId",
        disabled: (row: any) => !row.original.costCategory || row.original.costCategory.trim() === "",
        optionsFilter: (opt: any, row: any) => opt.cost_category_name === row.costCategory
      },
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
