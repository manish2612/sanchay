import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { SelectCell } from '@/components/TableCells/SelectCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { ActionCell } from '@/components/TableCells/ActionCell';

const multiUnitColumnHelper = createColumnHelper<any>();

export const columns: ColumnDef<any, any>[] = [
  multiUnitColumnHelper.accessor('unit', {
    header: 'Unit',
    cell: SelectCell,
    size: 200,
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
