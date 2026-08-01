"use client";

import * as React from "react";
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  Row,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import { cn } from "../../../utils";
import { tableStyles } from "../styles";
import { TableContext } from "./Context";
import { useTableNavigation } from "./useTableNavigation";

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
  const [focusedRowIndex, setFocusedRowIndex] = React.useState(-1);
  const [lastFocusedRowIndex, setLastFocusedRowIndex] = React.useState(-1);
  const [editingRowIndex, setEditingRowIndex] = React.useState<number | null>(-1);
  const [successRowIndex, setSuccessRowIndex] = React.useState<number | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Keep track of the last focused row whenever it's valid
  React.useEffect(() => {
    if (focusedRowIndex >= 0) {
      setLastFocusedRowIndex(focusedRowIndex);
    }
  }, [focusedRowIndex]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    ...tableOptions,
    meta: {
      ...tableOptions?.meta,
      focusedRowIndex,
      editingRowIndex,
      successRowIndex,
    },
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => rowHeight, 
    overscan: 20,
  });

  const totalWidth = table.getTotalSize();

  /* 
     Sync Virtualizer scroll with focused row.
     This effect ensures consistent auto-scrolling when the focused row changes,
     keeping the active row in view even during rapid keyboard navigation.
  */
  React.useEffect(() => {
    if (focusedRowIndex >= 0) {
      virtualizer.scrollToIndex(focusedRowIndex, { align: "auto" });
    }
  }, [focusedRowIndex, virtualizer]);

  const { handleKeyDown, handleRowClick } = useTableNavigation({
    table,
    rows,
    focusedRowIndex,
    lastFocusedRowIndex,
    setFocusedRowIndex,
    setEditingRowIndex,
    setSuccessRowIndex,
    scrollRef,
    rootRef,
    onRowClick,
  });

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
        role="grid"
        {...props}
      >
        <div className="flex flex-col h-full" style={{ minWidth: totalWidth }}>
          {children}
        </div>
      </div>
    </TableContext.Provider>
  );
}
