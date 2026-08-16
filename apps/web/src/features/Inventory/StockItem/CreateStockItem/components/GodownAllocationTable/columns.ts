import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { AutoSuggestCell } from '@/components/TableCells/AutoSuggestCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { ReadOnlyNumericCell } from '@/components/TableCells/ReadOnlyNumericCell';
import { ActionCell } from '@/components/TableCells/ActionCell';

const columnHelper = createColumnHelper<any>();

export const getColumns = (maxQty: number): ColumnDef<any, any>[] => [
  columnHelper.accessor('godown', {
    header: 'Godown',
    cell: AutoSuggestCell,
    size: 250,
    meta: {
      inputConfig: {
        placeholder: 'Select Godown...',
      }
    }
  }),
  columnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: NumericCell,
    size: 150,
    meta: {
      inputConfig: {
        type: 'number',
      }
    }
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
      
      // Use ReadOnlyNumericCell by passing a mock getValue
      return ReadOnlyNumericCell({
        getValue: () => amount.toString(),
        column: {}
      });
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
