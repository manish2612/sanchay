import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { TextCell } from '@/components/TableCells/TextCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { ActionCell } from '@/components/TableCells/ActionCell';

const multiUnitColumnHelper = createColumnHelper<any>();

export const columns: ColumnDef<any, any>[] = [
  multiUnitColumnHelper.accessor('unit', {
    header: 'Unit',
    cell: TextCell,
    size: 150,
  }),
  multiUnitColumnHelper.accessor('quantity', {
    header: 'Quantity',
    cell: NumericCell,
    size: 150,
  }),
  multiUnitColumnHelper.display({
    id: 'actions',
    header: '',
    cell: ActionCell,
    size: 50,
  }),
];
