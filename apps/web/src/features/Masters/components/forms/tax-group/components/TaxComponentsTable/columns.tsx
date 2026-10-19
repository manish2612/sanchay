import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { TextCell } from '@/components/TableCells/TextCell';
import { SelectCell } from '@/components/TableCells/SelectCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { AutoSuggestCell } from '@/components/TableCells/AutoSuggestCell';
import { ActionCell } from '@/components/TableCells/ActionCell';
import type { TaxComponentRow } from '../../types';

const columnHelper = createColumnHelper<TaxComponentRow>();

export const getColumns = (onCreateLedger?: () => void): ColumnDef<TaxComponentRow, any>[] => [
  columnHelper.accessor('component_name', {
    header: 'Component Name',
    cell: TextCell,
    size: 160,
    meta: {
      inputConfig: {
        placeholder: 'e.g. CGST, SGST',
      },
    },
  }),
  columnHelper.accessor('scope', {
    header: 'Scope',
    cell: SelectCell,
    size: 130,
  }),
  columnHelper.accessor('compute_method', {
    header: 'Compute Method',
    cell: SelectCell,
    size: 140,
  }),
  columnHelper.accessor('rate', {
    header: 'Rate (%)',
    cell: NumericCell,
    size: 100,
    meta: {
      inputConfig: {
        type: 'number',
        allowNegative: false,
        min: 1,
        max: 100,
        step: 'any',
      },
    },
  }),
  columnHelper.accessor('input_ledger_id', {
    header: 'Input Tax Ledger',
    cell: AutoSuggestCell,
    size: 180,
    meta: {
      inputConfig: {
        placeholder: 'Select Input Ledger...',
        onCreate: onCreateLedger,
        optionsKey: 'taxLedgers',
      },
    },
  }),
  columnHelper.accessor('output_ledger_id', {
    header: 'Output Tax Ledger',
    cell: AutoSuggestCell,
    size: 180,
    meta: {
      inputConfig: {
        placeholder: 'Select Output Ledger...',
        onCreate: onCreateLedger,
        optionsKey: 'taxLedgers',
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
