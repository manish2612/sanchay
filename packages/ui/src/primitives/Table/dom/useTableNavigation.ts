import * as React from "react";
import { Row, Table } from "@tanstack/react-table";

interface UseTableNavigationProps<TData> {
  table: Table<TData>;
  rows: Row<TData>[];
  focusedRowIndex: number;
  lastFocusedRowIndex: number;
  setFocusedRowIndex: (index: number) => void;
  setEditingRowIndex: (index: number | null) => void;
  setSuccessRowIndex: (index: number | null) => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  rootRef: React.RefObject<HTMLDivElement | null>;
  onRowClick?: (row: Row<TData>) => void;
}

export function useTableNavigation<TData>({
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
}: UseTableNavigationProps<TData>) {
  /**
   * focusNewRowInput:
   * A resilient helper to shift DOM focus into a specific input within a newly selected row.
   *
   * @param newIndex - The virtualized index of the row to focus.
   * @param colIndex - The specific column index to target (maintains horizontal position).
   * @param retries - Number of retry attempts for virtualization lag.
   *
   * Architecture Note: Because the table is virtualized, calling `virtualizer.scrollToIndex`
   * updates the DOM asynchronously. If we try to immediately focus the input, it might not exist yet.
   * We use a 50ms recursive retry loop to wait for the virtualizer to mount the row before snapping focus.
   */
  const focusNewRowInput = React.useCallback(
    (newIndex: number, colIndex: number = -1, retries = 5) => {
      setTimeout(() => {
        const newRowEl = scrollRef.current?.querySelector(`[data-index="${newIndex}"]`);
        if (newRowEl) {
          let elementToFocus: HTMLElement | null = null;

          if (colIndex !== -1) {
            const rowBody = newRowEl.firstElementChild || newRowEl;
            const targetCell = rowBody.children[colIndex];
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
    },
    [scrollRef]
  );

  /**
   * handleKeyDown:
   * The master keyboard navigation engine for the grid.
   * Handles hotkeys, grid traversal (Arrows, Tab), and edit commits (Enter).
   */
  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (rows.length === 0) return;

      // Global Table Hotkey: CTRL+N to spawn/jump to Phantom Row
      if (e.ctrlKey && !e.metaKey && e.key.toLowerCase() === "n") {
        e.preventDefault();

        // Attempt to find a designated phantom row, fallback to absolute bottom if none exists
        // Prefer the table meta config if provided, otherwise check original.isPhantom
        const isPhantomFn = table.options.meta?.phantomRowConfig?.isPhantom;
        const phantomIndex = rows.findIndex((r) =>
          isPhantomFn ? isPhantomFn(r) : (r.original as any).isPhantom
        );
        const targetIndex = phantomIndex !== -1 ? phantomIndex : rows.length - 1;

        if (targetIndex >= 0) {
          setFocusedRowIndex(targetIndex);
          setEditingRowIndex(targetIndex);
          focusNewRowInput(targetIndex, 0);
        }
        return;
      }

      // Escape Hatch: Do not intercept keys if the user is interacting with an internal component
      // that needs its own keyboard events (like a DropdownMenu, DatePicker, or Combobox).
      const target = e.target as HTMLElement;
      
      const isCombobox = target.closest('[role="combobox"]');
      const isComboboxExpanded = isCombobox?.hasAttribute("data-expanded") 
        ? isCombobox.getAttribute("data-expanded") === "true"
        : isCombobox?.getAttribute("aria-expanded") === "true";

      // If it's a closed combobox and the user is pressing ArrowUp/ArrowDown, 
      // bypass the escape hatch to allow the grid to move between rows!
      const isNavigatingClosedCombobox = 
        Boolean(isCombobox) && 
        !isComboboxExpanded && 
        (e.key === "ArrowDown" || e.key === "ArrowUp");

      if (!isNavigatingClosedCombobox) {
        if (
          target.tagName === "SELECT" ||
          target.isContentEditable ||
          isCombobox ||
          target.closest('[role="listbox"]') ||
          target.closest('[role="menu"]') ||
          target.closest('[role="dialog"]')
        ) {
          return; // Surrender control to the child component
        }
      }

      // Escape Hatch: Allow standard buttons to handle Enter/Space natively (e.g., triggering a popover)
      if (target.closest("button") && (e.key === "Enter" || e.key === " ")) {
        return;
      }

      /**
       * Helper to dynamically extract the current column index from the DOM.
       * Used to maintain the user's horizontal position when moving vertically.
       */
      const getColIndex = () => {
        const cell =
          target.closest('td, [role="cell"], .table-cell') ||
          target.closest('div[style*="width"]');
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

          // Forward Wraparound: If Tab is pressed on the very last input of a row,
          // intercept it and smoothly wrap focus to the very first input of the next row.
          if (!e.shiftKey && colIndexForTab === inputs.length - 1) {
            const currentIndex = focusedRowIndex >= 0 ? focusedRowIndex : lastFocusedRowIndex;
            const isLastRow = currentIndex === rows.length - 1;
            
            const isPhantomFn = table.options.meta?.phantomRowConfig?.isPhantom;
            const currentRow = rows[currentIndex];
            const isPhantom = currentRow ? (isPhantomFn ? isPhantomFn(currentRow) : (currentRow.original as any)?.isPhantom) : false;

            const isRowEmptyFn = (table.options.meta as any)?.isRowEmpty;
            const isRowEmpty = isRowEmptyFn && currentRow ? isRowEmptyFn(currentRow) : false;

            const shouldExitNatively = isLastRow && isPhantom && isRowEmpty;

            if (!shouldExitNatively) {
              e.preventDefault();

              if (table.options.meta?.onRowCommit) {
                const columnId = table.getVisibleLeafColumns()[colIndexForTab]?.id;
                const cellValue = target.value;

                const action = table.options.meta.onRowCommit(
                  currentIndex,
                  columnId,
                  cellValue
                );

                if (action === "ADVANCE") {
                  setSuccessRowIndex(currentIndex);
                  setTimeout(() => setSuccessRowIndex(null), 400);

                  setTimeout(() => {
                    const newIndex = currentIndex + 1;
                    setFocusedRowIndex(newIndex);
                    setEditingRowIndex(newIndex);
                    focusNewRowInput(newIndex, 0);
                  }, 0);
                } else if (action === "EXIT") {
                  setEditingRowIndex(-1);
                  setSuccessRowIndex(currentIndex);
                  setTimeout(() => setSuccessRowIndex(null), 400);
                  rootRef.current?.focus();
                }
              } else {
                const newIndex = Math.min(currentIndex + 1, rows.length - 1);
                if (newIndex !== focusedRowIndex) {
                  setFocusedRowIndex(newIndex);
                  setEditingRowIndex(newIndex);
                  focusNewRowInput(newIndex, 0); // Reset horizontal position to column 0
                }
              }
            }
          }

          // Backward Wraparound: If Shift+Tab is pressed on the very first input of a row
          if (e.shiftKey && colIndexForTab === 0) {
            const currentIndex = focusedRowIndex >= 0 ? focusedRowIndex : lastFocusedRowIndex;
            if (currentIndex > 0) {
              e.preventDefault();
              const newIndex = currentIndex - 1;
              setFocusedRowIndex(newIndex);
              setEditingRowIndex(newIndex);
              
              // Try to focus the last column of the previous row
              const lastColIndex = table.getVisibleLeafColumns().length - 1;
              focusNewRowInput(newIndex, lastColIndex);
            }
            // If currentIndex === 0, DO NOT preventDefault! Let the browser natively Shift+Tab out.
          }
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        // Navigate to the next row while maintaining the exact column index
        const currentIndex = focusedRowIndex >= 0 ? focusedRowIndex : lastFocusedRowIndex;
        const newIndex = Math.min(currentIndex + 1, rows.length - 1);
        if (newIndex !== focusedRowIndex) {
          setFocusedRowIndex(newIndex);
          setEditingRowIndex(newIndex);
          focusNewRowInput(newIndex, getColIndex());
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        // Navigate to the previous row while maintaining the exact column index
        const currentIndex = focusedRowIndex >= 0 ? focusedRowIndex : lastFocusedRowIndex;
        const newIndex = Math.max(currentIndex - 1, 0);
        if (newIndex !== focusedRowIndex) {
          setFocusedRowIndex(newIndex);
          setEditingRowIndex(newIndex);
          focusNewRowInput(newIndex, getColIndex());
        }
      } else if (e.key === "Enter") {
        e.preventDefault();

        // If we are actively editing an input, Enter signifies a "Commit" attempt
        if (target.tagName === "INPUT") {
          if (table.options.meta?.onRowCommit) {
            // Identify which column was committed and extract its raw value
            let colIndex = -1;
            const cell =
              target.closest('td, [role="cell"], .table-cell') ||
              target.closest('div[style*="width"]');
            if (cell && cell.parentElement) {
              const cells = Array.from(cell.parentElement.children);
              colIndex = cells.indexOf(cell as HTMLElement);
            }

            const columnId =
              colIndex !== -1 ? table.getVisibleLeafColumns()[colIndex]?.id : undefined;
            const cellValue =
              target.tagName === "INPUT" ? (target as HTMLInputElement).value : undefined;

            // Delegate validation and routing to the consumer's business logic
            const action = table.options.meta.onRowCommit(
              focusedRowIndex,
              columnId,
              cellValue
            );

            if (action === "ADVANCE") {
              // Consumer validated successfully and requested to advance to the next row
              setSuccessRowIndex(focusedRowIndex);
              setTimeout(() => setSuccessRowIndex(null), 400); // Trigger success flash animation

              // Execute the advance asynchronously to allow React to flush state updates (e.g., adding a new row)
              setTimeout(() => {
                const newIndex = focusedRowIndex + 1;
                setFocusedRowIndex(newIndex);
                setEditingRowIndex(newIndex);
                
                // Determine if we are moving into a Phantom Row (Create Mode).
                // If newIndex >= rows.length, it means we committed the previous phantom row
                // and React hasn't appended the new one yet, so it's guaranteed to be a phantom row!
                const isPhantomFn = table.options.meta?.phantomRowConfig?.isPhantom;
                const targetRow = rows[newIndex];
                const isTargetPhantom = targetRow 
                  ? (isPhantomFn ? isPhantomFn(targetRow) : (targetRow.original as any)?.isPhantom)
                  : true;

                // If moving into a phantom row (Create Mode), snap to the first column.
                // Otherwise, preserve the current column index (Edit Mode).
                focusNewRowInput(newIndex, isTargetPhantom ? 0 : colIndex);
              }, 0);
            } else if (action === "EXIT") {
              // Consumer validated successfully and requested to end the edit session
              setEditingRowIndex(-1);
              setSuccessRowIndex(focusedRowIndex);
              setTimeout(() => setSuccessRowIndex(null), 400);
              rootRef.current?.focus(); // Return global focus to the table grid for arrow navigation
            } else if (action === "STAY") {
              // Consumer rejected the commit (e.g., validation failed).
              // Stay in edit mode and do nothing here; consumer handles showing the error state.
            }
          } else {
            // Fallback: If consumer didn't provide onRowCommit, gracefully exit edit mode.
            setEditingRowIndex(-1);
            setSuccessRowIndex(focusedRowIndex);
            setTimeout(() => setSuccessRowIndex(null), 400);
            rootRef.current?.focus();
          }
        } else {
          // Toggle into edit mode if Enter is pressed while focused on a non-input row wrapper
          setEditingRowIndex(focusedRowIndex);
          onRowClick?.(rows[focusedRowIndex]);
        }
      }
    },
    [
      rows,
      table,
      focusedRowIndex,
      lastFocusedRowIndex,
      setFocusedRowIndex,
      setEditingRowIndex,
      focusNewRowInput,
      setSuccessRowIndex,
      rootRef,
      onRowClick,
    ]
  );

  /**
   * handleRowClick:
   * Safely handles mouse clicks on the row. Intelligently checks if the user clicked
   * an interactive element or just the row body, and manages focus transfer gracefully.
   */
  const handleRowClick = React.useCallback(
    (index: number, e?: React.MouseEvent) => {
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
          return; // Don't steal focus from natively interactive elements
        }

        // If they clicked a non-interactive part of the row, try to focus the corresponding input
        const cell =
          target.closest('td, [role="cell"], .table-cell') ||
          target.closest('div[style*="width"]');
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
                  const rowBody = newRowEl.firstElementChild || newRowEl;
                  const targetCell = rowBody.children[colIndex];
                  let focusable = targetCell?.querySelector(
                    "input, select, button, [tabindex='0']"
                  );

                  // Fallback to first focusable element in the entire row if the clicked cell doesn't have one
                  // (e.g. clicking a read-only colSpan action row)
                  if (!focusable) {
                    focusable = newRowEl.querySelector(
                      "input, select, button, [tabindex='0']"
                    );
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
    },
    [rows, setFocusedRowIndex, setEditingRowIndex, onRowClick, scrollRef, rootRef]
  );

  return { handleKeyDown, handleRowClick, focusNewRowInput };
}
