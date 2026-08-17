import * as React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  ColumnDef,
  Row,
  TableOptions,
  getFilteredRowModel,
} from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useTableNavigation } from './useTableNavigation';

export interface UseTableRootOptions<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  onRowClick?: (row: Row<TData>) => void;
  tableOptions?: Partial<TableOptions<TData>>;
  rowHeight?: number;
}

export function useTableRoot<TData>({
  data,
  columns,
  onRowClick,
  tableOptions,
  rowHeight = 44,
}: UseTableRootOptions<TData>) {
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

  const [columnSizing, setColumnSizing] = React.useState<Record<string, number>>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnResizing: true,
    columnResizeMode: 'onEnd',
    ...tableOptions,
    state: {
      ...tableOptions?.state,
      columnSizing,
    },
    onColumnSizingChange: (updater) => {
      setColumnSizing((oldSizing) => {
        const rawNewSizing = typeof updater === 'function' ? updater(oldSizing) : updater;
        
        let changedColId = null;
        for (const key in rawNewSizing) {
          if (rawNewSizing[key] !== oldSizing[key]) {
            changedColId = key;
            break;
          }
        }
        
        if (!changedColId || !rootRef.current) return rawNewSizing;
        
        const S_old = oldSizing[changedColId] ?? table.getColumn(changedColId)?.columnDef.size ?? 150;
        const S_raw = rawNewSizing[changedColId];
        const D = S_raw - S_old;
        
        const C = rootRef.current.clientWidth;
        
        let T_old = 0;
        table.getVisibleLeafColumns().forEach(col => {
          T_old += oldSizing[col.id] ?? col.columnDef.size ?? 150;
        });
        
        if (C <= T_old) return rawNewSizing;
        
        const W_old = S_old * (C / T_old);
        const W_new = W_old + D;
        const T_other = T_old - S_old;
        
        if (W_new >= C || W_new <= 20) return rawNewSizing;
        
        const S_new = (W_new * T_other) / (C - W_new);
        
        return {
          ...rawNewSizing,
          [changedColId]: S_new,
        };
      });
      tableOptions?.onColumnSizingChange?.(updater);
    },
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

  const totalMinWidth = table.getVisibleLeafColumns().reduce((sum, col) => {
    const isFluid = (col.columnDef.meta as any)?.layout?.fluid;
    return sum + (isFluid ? col.columnDef.minSize || 100 : col.getSize());
  }, 0);

  /* 
     Sync Virtualizer scroll with focused row.
     This effect ensures consistent auto-scrolling when the focused row changes,
     keeping the active row in view even during rapid keyboard navigation.
  */
  React.useEffect(() => {
    if (focusedRowIndex >= 0) {
      virtualizer.scrollToIndex(focusedRowIndex, { align: 'auto' });
    }
  }, [focusedRowIndex, virtualizer]);

  const { handleKeyDown, handleRowClick, focusNewRowInput } = useTableNavigation({
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

  const handleRootFocus = React.useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      // If the focus was placed directly on the root div (e.g. via Tab navigation from outside)
      if (e.target === rootRef.current) {
        // Prevent the ping-pong trap! If they Shift+Tabbed OUT of an inner input,
        // e.relatedTarget will be that inner input. We should politely let them leave.
        if (e.relatedTarget && rootRef.current.contains(e.relatedTarget as Node)) {
          return;
        }

        // Wake up the phantom row by explicitly setting the focused row state
        const targetIndex = Math.max(0, focusedRowIndex);
        setFocusedRowIndex(targetIndex);
        setEditingRowIndex(targetIndex);

        // Drop focus seamlessly into the grid inputs for a fluid UX
        focusNewRowInput(targetIndex, 0, 5);
      }
    },
    [focusedRowIndex, focusNewRowInput],
  );

  return {
    table,
    data,
    virtualizer,
    scrollRef,
    rootRef,
    focusedRowIndex,
    handleRowClick,
    handleKeyDown,
    handleRootFocus,
    totalMinWidth,
  };
}
