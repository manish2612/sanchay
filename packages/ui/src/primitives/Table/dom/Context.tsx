'use client';

import * as React from 'react';
import { Table as TanStackTable, RowData, Row, TableState } from '@tanstack/react-table';
import { Virtualizer } from '@tanstack/react-virtual';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    focusedRowIndex?: number;
    editingRowIndex?: number | null;
    successRowIndex?: number | null;
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    state?: TableState;
    features?: unknown[];
    onRowCommit?: (
      rowIndex: number,
      columnId?: string,
      cellValue?: string,
    ) => 'ADVANCE' | 'STAY' | 'EXIT';
    rowErrors?: Record<number, boolean>;
    phantomRowConfig?: {
      isPhantom: (row: Row<TData>) => boolean;
      actionText?: string;
      actionIcon?: React.ReactNode;
      renderRestState?: (row: Row<TData>) => React.ReactNode;
    };
    isRowEmpty?: (row: Row<TData>) => boolean;
  }
}

// --- Types ---
export interface TableContextValue<TData> {
  table: TanStackTable<TData>;
  data: TData[];
  virtualizer: Virtualizer<HTMLDivElement, Element>;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  focusedRowIndex: number;
  handleRowClick: (index: number, e?: React.MouseEvent) => void;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

export const TableContext = React.createContext<TableContextValue<any> | null>(null);

export function useTableContext() {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error('Table components must be used within a Table.Root');
  }
  return context;
}
