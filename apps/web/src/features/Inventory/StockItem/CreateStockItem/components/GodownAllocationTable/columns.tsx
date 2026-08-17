import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { AutoSuggestCell } from '@/components/TableCells/AutoSuggestCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { ActionCell } from '@/components/TableCells/ActionCell';
import { AnimatedNumber } from '@prime/ui';

const columnHelper = createColumnHelper<any>();

export const getColumns = (maxQty: number): ColumnDef<any, any>[] => [
  columnHelper.accessor('godown', {
    header: 'Godown',
    cell: AutoSuggestCell,
    size: 250,
    meta: {
      inputConfig: {
        placeholder: 'Select Godown...',
      },
    },
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: NumericCell,
    size: 150,
    meta: {
      inputConfig: {
        type: 'number',
      },
    },
  }),
  columnHelper.accessor('rate', {
    header: 'Rate',
    cell: NumericCell,
    size: 150,
  }),
  columnHelper.display({
    id: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      // Calculate Amount = quantity * rate dynamically
      const qty = Number(row.original.quantity) || 0;
      const rate = Number(row.original.rate) || 0;
      const amount = qty * rate;

      return (
        <div className="flex h-full w-full items-center justify-end px-2 text-sm text-foreground my-auto tabular-nums">
          <AnimatedNumber
            value={amount}
            formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
          />
        </div>
      );
    },
    size: 120,
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: ActionCell,
    size: 50,
  }),
];
