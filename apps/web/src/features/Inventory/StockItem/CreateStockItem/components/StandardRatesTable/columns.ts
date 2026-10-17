import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { DateCell } from '@/components/TableCells/DateCell';
import { ActionCell } from '@/components/TableCells/ActionCell';

const standardRatesColumnHelper = createColumnHelper<any>();

export const columns: ColumnDef<any, any>[] = [
  standardRatesColumnHelper.accessor('fromDate', {
    header: 'From Date',
    cell: DateCell,
    size: 140,
  }),
  standardRatesColumnHelper.accessor('toDate', {
    header: 'To Date',
    cell: DateCell,
    size: 140,
  }),
  standardRatesColumnHelper.accessor('mrp', {
    header: 'MRP',
    cell: NumericCell,
    size: 120,
  }),
  standardRatesColumnHelper.accessor('netRate', {
    header: 'Net Rate',
    cell: NumericCell,
    size: 120,
  }),
  standardRatesColumnHelper.accessor('minSellingRate', {
    header: 'Min Selling Rate',
    cell: NumericCell,
    size: 140,
  }),
  standardRatesColumnHelper.display({
    id: 'actions',
    header: '',
    cell: ActionCell,
    size: 50,
  }),
];
