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

interface TableRootProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onRowClick?: (row: Row<TData>) => void;
}

export function TableRoot<TData>({
  data,
  columns,
  onRowClick,
  className,
  children,
  ...props
}: TableRootProps<TData>) {
  const [focusedRowIndex, setFocusedRowIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => scrollRef.current,
    estimateSize: () => 35,
    overscan: 5,
  });

  const totalWidth = table.getTotalSize();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (rows.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedRowIndex((prev) => {
        const next = Math.min(prev + 1, rows.length - 1);
        virtualizer.scrollToIndex(next);
        return next;
      });
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedRowIndex((prev) => {
        const next = Math.max(prev - 1, 0);
        virtualizer.scrollToIndex(next);
        return next;
      });
    } else if (e.key === "Enter") {
      e.preventDefault();
      onRowClick?.(rows[focusedRowIndex]);
    }
  };

  const handleRowClick = (index: number) => {
    setFocusedRowIndex(index);
    onRowClick?.(rows[index]);
    rootRef.current?.focus();
  };

  return (
    <TableContext.Provider
      value={{
        table,
        data,
        virtualizer,
        scrollRef: scrollRef as React.RefObject<HTMLDivElement>,
        focusedRowIndex,
        handleRowClick,
        rootRef,
      }}
    >
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
