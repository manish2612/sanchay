"use client";

import * as React from "react";
import { Row } from "@tanstack/react-table";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "../../../utils";
import { tableStyles } from "../styles";
import { useTableContext } from "./Context";

interface TableBodyProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "children"
> {
  children: (row: Row<any>, isFocused: boolean) => React.ReactNode;
}

export const TableBody = React.forwardRef<HTMLDivElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    const { table, virtualizer, scrollRef, focusedRowIndex, handleRowClick } =
      useTableContext();
    const { rows } = table.getRowModel();

    return (
      <ScrollAreaPrimitive.Root
        className={cn("flex-1 w-full min-h-0", className)}
        type="always"
        {...props}
      >
        <ScrollAreaPrimitive.Viewport ref={scrollRef} className="w-full h-full">
          <div ref={ref} className={tableStyles.body()} role="rowgroup">
            <div
              style={{
                height: `${virtualizer.getTotalSize()}px`,
                width: "100%",
                position: "relative",
              }}
            >
              {virtualizer.getVirtualItems().map((virtualRow: any) => {
                const row = rows[virtualRow.index];
                const isFocused = virtualRow.index === focusedRowIndex;
                const renderedRow = children(row, isFocused);

                return (
                  <div
                    key={row.id}
                    data-index={virtualRow.index}
                    ref={virtualizer.measureElement}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                    onClick={() => handleRowClick(virtualRow.index)}
                  >
                    {renderedRow}
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
          orientation="vertical"
          className="flex select-none touch-none p-0.5 bg-secondary data-[orientation=vertical]:w-3 z-50"
        >
          <ScrollAreaPrimitive.Thumb className="flex-1 bg-primary/20 rounded relative" />
        </ScrollAreaPrimitive.Scrollbar>
      </ScrollAreaPrimitive.Root>
    );
  }
);
TableBody.displayName = "Table.Body";
