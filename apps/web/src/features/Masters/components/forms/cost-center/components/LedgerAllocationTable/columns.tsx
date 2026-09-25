import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { AutoSuggestCell } from '@/components/TableCells/AutoSuggestCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { ActionCell } from '@/components/TableCells/ActionCell';

const columnHelper = createColumnHelper<any>();

export const getColumns = (onCreateLedger?: () => void): ColumnDef<any, any>[] => [
  columnHelper.accessor('ledger', {
    header: 'Ledger',
    cell: AutoSuggestCell,
    size: 250,
    meta: {
      inputConfig: {
        placeholder: 'Select Ledger...',
        onCreate: onCreateLedger,
      },
    },
  }),
  columnHelper.accessor('amount', {
    header: 'Amount',
    cell: NumericCell,
    size: 150,
    meta: {
      inputConfig: {
        type: 'number',
      },
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: ActionCell,
    size: 50,
  }),
];
