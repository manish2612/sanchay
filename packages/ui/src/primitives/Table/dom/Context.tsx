'use client';

import * as React from 'react';
import { Table as TanStackTable, RowData, Row, TableState } from '@tanstack/react-table';
import { Virtualizer } from '@tanstack/react-virtual';
import { TableRowCommitAction } from './constants';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    focusedRowIndex?: number;
    editingRowIndex?: number | null;
    successRowIndex?: number | null;
    updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
    removeRow?: (rowIndex: number) => void;
    state?: Partial<TableState> & {
      rowErrors?: Record<number, any>;
      isRowEmpty?: (row: any) => boolean;
      [key: string]: any;
    };
    actions?: {
      updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
      onRowCommit?: (rowIndex: number, columnId?: string, cellValue?: string) => TableRowCommitAction;
      removeRow?: (rowIndex: number) => void;
      [key: string]: any;
    };
    options?: Record<string, any>;
    features?: unknown[];
    onRowCommit?: (rowIndex: number, columnId?: string, cellValue?: string) => TableRowCommitAction;
    rowErrors?: Record<number, any>;
    phantomRowConfig?: {
      isPhantom: (row: Row<TData>) => boolean;
      actionText?: string;
      actionIcon?: React.ReactNode;
      renderRestState?: (row: Row<TData>) => React.ReactNode;
    };
    isRowEmpty?: (row: any) => boolean;
    enableColumnFilter?: boolean;
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
