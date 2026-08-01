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
  tableOptions?: Partial<import("@tanstack/react-table").TableOptions<TData>>;
}

export function TableRoot<TData>({
  data,
  columns,
  onRowClick,
  className,
  children,
  tableOptions,
  ...props
}: TableRootProps<TData>) {
  const [focusedRowIndex, setFocusedRowIndex] = React.useState(0);
  const [lastFocusedRowIndex, setLastFocusedRowIndex] = React.useState(0);
  const [editingRowIndex, setEditingRowIndex] = React.useState<number | null>(0);
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
    estimateSize: () => 44, // Increased row height for better density and input sizing
    overscan: 20,
  });

  const totalWidth = table.getTotalSize();

  /* 
     Sync Virtualizer scroll with focused row.
     This ensures consistent scrolling even if key presses are rapid.
  */
  React.useEffect(() => {
    if (focusedRowIndex >= 0) {
      virtualizer.scrollToIndex(focusedRowIndex, { align: "auto" });
    }
  }, [focusedRowIndex, virtualizer]);

  const focusNewRowInput = React.useCallback((newIndex: number, colIndex: number = -1, retries = 5) => {
    setTimeout(() => {
      const newRowEl = scrollRef.current?.querySelector(
        `[data-index="${newIndex}"]`
      );
      if (newRowEl) {
        let elementToFocus: HTMLElement | null = null;
        
        if (colIndex !== -1) {
          const targetCell = newRowEl.children[colIndex];
          if (targetCell) {
            elementToFocus = targetCell.querySelector("input, select, button, [tabindex='0']");
          }
        }
        
        if (!elementToFocus) {
          elementToFocus = newRowEl.querySelector("input, select, button, [tabindex='0']");
        }
        
        if (elementToFocus) {
          elementToFocus.focus();
        }
      } else if (retries > 0) {
        // Virtualizer hasn't rendered it yet, retry
        focusNewRowInput(newIndex, colIndex, retries - 1);
      }
    }, 50);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (rows.length === 0) return;

    // Hotkey: CTRL+N to jump to Phantom Row
    if (e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "n") {
      e.preventDefault();
      
      const phantomIndex = rows.findIndex(r => (r.original as any).isPhantom);
      const targetIndex = phantomIndex !== -1 ? phantomIndex : rows.length - 1;
      
      if (targetIndex >= 0) {
        setFocusedRowIndex(targetIndex);
        setEditingRowIndex(targetIndex);
        focusNewRowInput(targetIndex, 0); 
      }
      return;
    }

    // Do not intercept keys if the user is interacting with an input or dropdown inside the table
    const target = e.target as HTMLElement;
    if (
      target.tagName === "SELECT" ||
      target.isContentEditable ||
      target.closest('[role="combobox"]') ||
      target.closest('[role="listbox"]') ||
      target.closest('[role="menu"]') ||
      target.closest('[role="dialog"]')
    ) {
      // Allow the dropdown/select to handle its own arrow keys/enter key
      return;
    }
    
    // Allow buttons to handle Enter/Space natively (like opening Popovers)
    if (target.closest('button') && (e.key === "Enter" || e.key === " ")) {
      return;
    }

    // Helper to extract the column index from the currently focused cell
    const getColIndex = () => {
      const cell = target.closest('td, [role="cell"], .table-cell') || target.closest('div[style*="width"]');
      if (cell && cell.parentElement) {
        const cells = Array.from(cell.parentElement.children);
        return cells.indexOf(cell as HTMLElement);
      }
      return -1;
    };

    if (e.key === "Tab" && target.tagName === "INPUT") {
      const rowEl = target.closest('[role="row"]');
      if (rowEl) {
        const inputs = Array.from(rowEl.querySelectorAll("input"));
        const colIndexForTab = inputs.indexOf(target as HTMLInputElement);

        // Forward wraparound
        if (!e.shiftKey && colIndexForTab === inputs.length - 1) {
          e.preventDefault();
          const currentIndex = focusedRowIndex >= 0 ? focusedRowIndex : lastFocusedRowIndex;
          const newIndex = Math.min(currentIndex + 1, rows.length - 1);
          if (newIndex !== focusedRowIndex) {
            setFocusedRowIndex(newIndex);
            setEditingRowIndex(newIndex);
            focusNewRowInput(newIndex, 0); // Focus first input of next row
          }
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const currentIndex = focusedRowIndex >= 0 ? focusedRowIndex : lastFocusedRowIndex;
      const newIndex = Math.min(currentIndex + 1, rows.length - 1);
      if (newIndex !== focusedRowIndex) {
        setFocusedRowIndex(newIndex);
        setEditingRowIndex(newIndex);
        focusNewRowInput(newIndex, getColIndex());
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      // If we are exiting a committed state, ArrowUp should just select the last edited row, or the one above it
      const currentIndex = focusedRowIndex >= 0 ? focusedRowIndex : lastFocusedRowIndex;
      const newIndex = Math.max(currentIndex - 1, 0);
      if (newIndex !== focusedRowIndex) {
        setFocusedRowIndex(newIndex);
        setEditingRowIndex(newIndex);
        focusNewRowInput(newIndex, getColIndex());
      }
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (target.tagName === "INPUT") {
        if (table.options.meta?.onRowCommit) {
          // Find the column index to pass to onRowCommit
          let colIndex = -1;
          const cell = target.closest('td, [role="cell"], .table-cell') || target.closest('div[style*="width"]');
          if (cell && cell.parentElement) {
             const cells = Array.from(cell.parentElement.children);
             colIndex = cells.indexOf(cell as HTMLElement);
          }
          
          const columnId = colIndex !== -1 ? table.getVisibleLeafColumns()[colIndex]?.id : undefined;
          const cellValue = target.tagName === "INPUT" ? (target as HTMLInputElement).value : undefined;

          // Delegate to consumer
          const action = table.options.meta.onRowCommit(focusedRowIndex, columnId, cellValue);
          
          if (action === "ADVANCE") {
            setSuccessRowIndex(focusedRowIndex);
            setTimeout(() => setSuccessRowIndex(null), 400);

            // Wait a tick for React state to process the new row appending
            setTimeout(() => {
              const newIndex = focusedRowIndex + 1;
              setFocusedRowIndex(newIndex);
              setEditingRowIndex(newIndex);
              focusNewRowInput(newIndex, colIndex);
            }, 0);
          } else if (action === "EXIT") {
            setEditingRowIndex(-1);
            setSuccessRowIndex(focusedRowIndex);
            setTimeout(() => setSuccessRowIndex(null), 400);
            rootRef.current?.focus(); // Return focus to the table grid
          } else if (action === "STAY") {
            // Do nothing, consumer handles error state
          }
        } else {
          // Default old behavior: Exit edit mode
          setEditingRowIndex(-1);
          setSuccessRowIndex(focusedRowIndex);
          setTimeout(() => setSuccessRowIndex(null), 400);
          rootRef.current?.focus(); // Return focus to the table grid
        }
      } else {
        // Toggle edit mode on Enter if not inside an input (e.g. focused on a standard cell)
        setEditingRowIndex(focusedRowIndex);
        onRowClick?.(rows[focusedRowIndex]);
      }
    }
  };

  const handleRowClick = (index: number, e?: React.MouseEvent) => {
    setFocusedRowIndex(index);
    setEditingRowIndex(index);
    onRowClick?.(rows[index]);
    
    let shouldFocusGrid = true;

    if (e) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.closest("button")
      ) {
        return; // Don't steal focus from interactive elements
      }

      // If they clicked a non-interactive part of the row, try to focus the corresponding input
      const cell = target.closest('td, [role="cell"], .table-cell') || target.closest('div[style*="width"]');
      if (cell) {
        const rowEl = cell.parentElement;
        if (rowEl) {
          const cells = Array.from(rowEl.children);
          const colIndex = cells.indexOf(cell as HTMLElement);
          
          if (colIndex !== -1) {
            shouldFocusGrid = false;
            setTimeout(() => {
              const newRowEl = scrollRef.current?.querySelector(
                `[data-index="${index}"]`
              );
              if (newRowEl) {
                const targetCell = newRowEl.children[colIndex];
                let focusable = targetCell?.querySelector("input, select, button, [tabindex='0']");
                
                // Fallback to first focusable element in the entire row if the clicked cell doesn't have one 
                // (e.g. clicking a read-only colSpan action row)
                if (!focusable) {
                  focusable = newRowEl.querySelector("input, select, button, [tabindex='0']");
                }
                
                if (focusable) {
                  (focusable as HTMLElement).focus();
                } else {
                  rootRef.current?.focus();
                }
              }
            }, 0);
          }
        }
      }
    }

    if (shouldFocusGrid) {
      rootRef.current?.focus();
    }
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
