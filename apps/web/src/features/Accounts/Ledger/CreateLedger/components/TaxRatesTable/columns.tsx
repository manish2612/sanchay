import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { DateCell } from '@/components/TableCells/DateCell';
import { SelectCell } from '@/components/TableCells/SelectCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { ActionCell } from '@/components/TableCells/ActionCell';
import type { TaxRateRow } from './types';

const columnHelper = createColumnHelper<TaxRateRow>();

export const getColumns = (): ColumnDef<TaxRateRow, any>[] => [
  columnHelper.accessor('effective_from', {
    header: 'Effective From',
    cell: DateCell,
    size: 150,
  }),
  columnHelper.accessor('tax_group_id', {
    header: 'Tax Group',
    cell: SelectCell,
    size: 180,
  }),
  columnHelper.accessor('excise_tax_group_id', {
    header: 'Excise Tax Group',
    cell: SelectCell,
    size: 180,
  }),
  columnHelper.accessor('applicability', {
    header: 'Applicability',
    cell: SelectCell,
    size: 130,
  }),
  columnHelper.accessor('tax_rate', {
    header: 'Tax Rate (%)',
    cell: NumericCell,
    size: 110,
    meta: {
      inputConfig: {
        type: 'number',
        allowNegative: false,
        min: 0,
        max: 100,
        step: 'any',
        placeholder: '0.00',
      },
    },
  }),
  columnHelper.display({
    id: 'actions',
    header: '',
    cell: ActionCell,
    size: 80,
  }),
];
