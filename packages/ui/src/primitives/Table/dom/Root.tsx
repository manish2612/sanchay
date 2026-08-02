"use client";

import * as React from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { cn } from "../../../utils";
import { tableStyles } from "../styles";
import { TableContext } from "./Context";
import { useTableRoot } from "./useTableRoot";

interface TableRootProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onRowClick?: (row: Row<TData>) => void;
  tableOptions?: Partial<import("@tanstack/react-table").TableOptions<TData>>;
  rowHeight?: number; // Configurable density
}

export function TableRoot<TData>({
  data,
  columns,
  onRowClick,
  className,
  children,
  tableOptions,
  rowHeight = 44,
  ...props
}: TableRootProps<TData>) {
  const {
    table,
    virtualizer,
    scrollRef,
    rootRef,
    focusedRowIndex,
    handleRowClick,
    handleKeyDown,
    handleRootFocus,
    totalMinWidth,
  } = useTableRoot({ data, columns, onRowClick, tableOptions, rowHeight });

  // Do not memoize contextValue! useVirtualizer returns a stable class instance, 
  // so if we memoize this, Table.Body will completely fail to re-render on scroll or layout measurements.
  const contextValue = {
    table,
    data,
    virtualizer,
    scrollRef: scrollRef as React.RefObject<HTMLDivElement | null>,
    focusedRowIndex,
    handleRowClick,
    rootRef,
  };

  return (
    <TableContext.Provider value={contextValue}>
      <div
        ref={rootRef}
        className={cn(
          tableStyles.root(),
          "overflow-x-auto overflow-y-hidden",
          className
        )}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={handleRootFocus}
        role="grid"
        {...props}
      >
        <div className="flex flex-col h-full" style={{ minWidth: totalMinWidth }}>
          {children}
        </div>
      </div>
    </TableContext.Provider>
  );
}
