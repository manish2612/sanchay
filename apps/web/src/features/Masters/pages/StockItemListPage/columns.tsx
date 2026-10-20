import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { StockItemDecoratedItem } from '@/features/Inventory/StockItem/types';

export interface StockItemTableMeta {
  onDeleteClick: (item: StockItemDecoratedItem) => void;
}

export const stockItemColumns: ColumnDef<StockItemDecoratedItem>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 260,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center min-w-0 py-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate leading-tight">
            {item.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'stock_group_name',
    header: 'Stock Group',
    size: 200,
    cell: ({ getValue }) => {
      const groupName = getValue<string>();
      if (!groupName || groupName === '—') {
        return <span className="text-muted-foreground/60 text-xs">—</span>;
      }
      return <span className="text-xs text-foreground font-normal truncate">{groupName}</span>;
    },
  },
  {
    accessorKey: 'stock_category_name',
    header: 'Stock Category',
    size: 200,
    cell: ({ getValue }) => {
      const catName = getValue<string>();
      if (!catName || catName === '—') {
        return <span className="text-muted-foreground/60 text-xs">—</span>;
      }
      return <span className="text-xs text-foreground font-normal truncate">{catName}</span>;
    },
  },
  {
    accessorKey: 'unit_name',
    header: 'Unit',
    size: 150,
    cell: ({ getValue }) => {
      const unitName = getValue<string>();
      if (!unitName || unitName === '—') {
        return <span className="text-muted-foreground/60 text-xs">—</span>;
      }
      return (
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted/60 text-foreground border border-border/60 font-semibold">
          {unitName}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 75,
    cell: ({ row, table }) => {
      const item = row.original;
      const meta = table.options.meta as StockItemTableMeta | undefined;

      return (
        <div className="flex items-center justify-end gap-1 w-full pr-1">
          {/* Edit Action - Temporarily Disabled */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground opacity-30 cursor-not-allowed pointer-events-none"
                  disabled
                  aria-label="Edit stock item disabled"
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="left">Edit is temporarily disabled</TooltipContent>
          </Tooltip>

          {/* Delete Action - Active */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                aria-label={`Delete ${item.name}`}
                onClick={(e) => {
                  e.stopPropagation();
                  meta?.onDeleteClick(item);
                }}
              >
                <Icon name="Trash2" size={14} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">Delete Stock Item</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
