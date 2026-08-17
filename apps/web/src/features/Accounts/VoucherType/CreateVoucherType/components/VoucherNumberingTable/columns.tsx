import React from 'react';
import { createColumnHelper, type ColumnDef } from '@tanstack/react-table';
import { TextCell } from '@/components/TableCells/TextCell';
import { NumericCell } from '@/components/TableCells/NumericCell';
import { DateCell } from '@/components/TableCells/DateCell';
import { SelectCell } from '@/components/TableCells/SelectCell';
import { ActionCell } from '@/components/TableCells/ActionCell';
import { NUMBERING_TYPE_OPTIONS, RESET_OPTIONS } from '../../constants';

const numberingColumnHelper = createColumnHelper<any>();

export const columns: ColumnDef<any, any>[] = [
  numberingColumnHelper.accessor('type', {
    header: 'Type',
    cell: (props) => <SelectCell {...props} options={NUMBERING_TYPE_OPTIONS} />,
    size: 150,
  }),
  numberingColumnHelper.accessor('fromDate', {
    header: 'From Date',
    cell: DateCell,
    size: 150,
  }),
  numberingColumnHelper.accessor('reset', {
    header: 'Reset',
    cell: (props) => <SelectCell {...props} options={RESET_OPTIONS} />,
    size: 150,
  }),
  numberingColumnHelper.accessor('prefix', {
    header: 'Prefix',
    cell: TextCell,
    size: 120,
  }),
  numberingColumnHelper.accessor('startingNo', {
    header: 'Starting No',
    cell: NumericCell,
    size: 100,
  }),
  numberingColumnHelper.accessor('suffix', {
    header: 'Suffix',
    cell: TextCell,
    size: 120,
  }),
  numberingColumnHelper.accessor('prefillWidth', {
    header: 'Prefill Width',
    cell: NumericCell,
    size: 100,
  }),
  numberingColumnHelper.display({
    id: 'actions',
    header: '',
    cell: ActionCell,
    size: 50,
  }),
];
