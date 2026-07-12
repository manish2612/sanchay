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

    if (rows.length === 0) {
      return (
        <div
          className={cn(
            "flex-1 w-full min-h-[200px] flex items-center justify-center text-muted-foreground border border-dashed rounded-md m-2",
            className
          )}
          {...props}
        >
          No Data Available
        </div>
      );
    }

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
              {/* Animated Highlight Row */}
              {(() => {
                const virtualRows = virtualizer.getVirtualItems();
                const focusedVirtualRow = virtualRows.find(
                  (row: any) => row.index === focusedRowIndex
                );

                if (!focusedVirtualRow) return null;

                const scrollOffset = virtualizer.scrollOffset ?? 0;
                const viewportHeight = scrollRef.current?.clientHeight ?? 0;

                // Visual Position relative to viewport top
                const rowTop = focusedVirtualRow.start - scrollOffset;
                const rowBottom = focusedVirtualRow.end - scrollOffset;

                // Check if row is physically at the edges of the viewport
                // Use a threshold (e.g., 5px or 1/2 row height)
                const isAtTopEdge = rowTop < 10;
                const isAtBottomEdge = rowBottom > viewportHeight - 10;

                const isAtEdge = isAtTopEdge || isAtBottomEdge;
                
                const successRowIndex = table.options.meta?.successRowIndex;
                const isSuccess = successRowIndex === focusedVirtualRow.index;

                return (
                  <div
                    className={cn(
                      "absolute left-0 w-full rounded-sm pointer-events-none border will-change-transform",
                      isSuccess 
                        ? "bg-green-500/20 border-green-500/30 transition-colors duration-300"
                        : "bg-primary/10 border-primary/20",
                      !isAtEdge &&
                        "transition-transform duration-200 ease-in-out"
                    )}
                    style={{
                      height: `${focusedVirtualRow.size}px`,
                      transform: `translateY(${focusedVirtualRow.start}px)`,
                      zIndex: 0,
                    }}
                  />
                );
              })()}

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
                      zIndex: 1, // Ensure row content (text/clicks) is above highlight
                    }}
                    onClick={(e) => handleRowClick(virtualRow.index, e)}
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
