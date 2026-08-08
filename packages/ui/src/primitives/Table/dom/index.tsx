'use client';

import { TableRoot } from './Root';
import { TableHeader } from './Header';
import { TableHeaderRow } from './HeaderRow';
import { TableHead } from './Head';
import { TableRow } from './Row';
import { TableCell } from './Cell';
import { TableBody } from './Body';
import { TableFooter } from './Footer';
import { TableStatusPosition } from './StatusPosition';
import { useTableContext } from './Context';

export const Table = {
  Root: TableRoot,
  Header: TableHeader,
  HeaderRow: TableHeaderRow,
  Head: TableHead,
  Body: TableBody,
  Row: TableRow,
  Cell: TableCell,
  StatusPosition: TableStatusPosition,
  Footer: TableFooter,
  useTableContext,
};

export { useTableContext };
