"use client";

import * as React from "react";
import { Table as TanStackTable } from "@tanstack/react-table";

// --- Types ---
export interface TableContextValue<TData> {
  table: TanStackTable<TData>;
  data: TData[];
  virtualizer: any;
  scrollRef: React.RefObject<HTMLDivElement>;
  focusedRowIndex: number;
  handleRowClick: (index: number) => void;
  rootRef: React.RefObject<HTMLDivElement>;
}

export const TableContext = React.createContext<TableContextValue<any> | null>(
  null
);

export function useTableContext() {
  const context = React.useContext(TableContext);
  if (!context) {
    throw new Error("Table components must be used within a Table.Root");
  }
  return context;
}
