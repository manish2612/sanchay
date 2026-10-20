import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { StockGroupDecoratedItem } from './useStockGroupList';
import {
  predefinedBadgeClasses,
  customBadgeClasses,
} from '@/features/Masters/components/common';

export interface StockGroupTableMeta {
  onEditClick: (group: StockGroupDecoratedItem) => void;
  onDeleteClick: (group: StockGroupDecoratedItem) => void;
}

export const stockGroupColumns: ColumnDef<StockGroupDecoratedItem>[] = [
  {
    accessorKey: 'name',
    header: 'Stock Group Name',
    size: 260,
    cell: ({ row }) => {
      const group = row.original;
      return (
        <div className="flex items-center min-w-0 py-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate leading-tight">
            {group.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'alias',
    header: 'Alias',
    size: 140,
    cell: ({ getValue }) => {
      const alias = getValue<string | undefined | null>();
      if (!alias) return <span className="text-muted-foreground/60 text-xs">—</span>;
      return (
        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted/60 text-foreground border border-border/60">
          {alias}
        </span>
      );
    },
  },
  {
    accessorKey: 'code',
    header: 'Code',
    size: 140,
    cell: ({ getValue }) => {
      const code = getValue<string | undefined | null>();
      if (!code) return <span className="text-muted-foreground/60 text-xs">—</span>;
      return <span className="font-mono text-xs text-muted-foreground">{code}</span>;
    },
  },
  {
    accessorKey: 'parent_name',
    header: 'Parent Group',
    size: 220,
    cell: ({ row }) => {
      const group = row.original;
      const parentName = group.parent_name;

      if (parentName && parentName.trim().toLowerCase() !== 'primary') {
        return (
          <div
            className="flex items-center gap-1.5 text-xs text-foreground font-normal min-w-0"
            title={`Subgroup of ${parentName}`}
          >
            <span className="text-muted-foreground font-mono text-sm leading-none shrink-0">↳</span>
            <span className="truncate">{parentName}</span>
          </div>
        );
      }

      return <span className="text-muted-foreground/70 text-xs font-normal">Primary</span>;
    },
  },
  {
    accessorKey: 'is_predefined',
    header: 'Type',
    size: 100,
    cell: ({ getValue }) => {
      const isPredefined = Boolean(getValue<boolean | undefined>());
      if (isPredefined) {
        return (
          <span className={predefinedBadgeClasses}>
            <Icon name="Lock" size={11} className="text-muted-foreground" />
            Default
          </span>
        );
      }
      return <span className={customBadgeClasses}>Custom</span>;
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 75,
    cell: ({ row, table }) => {
      const group = row.original;
      const isPredefined = Boolean(group.is_predefined);
      const meta = table.options.meta as StockGroupTableMeta | undefined;

      return (
        <div className="flex items-center justify-end gap-1 w-full pr-1">
          {/* Edit Action */}
          {isPredefined ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground opacity-30 cursor-not-allowed pointer-events-none"
                    disabled
                    aria-label="Edit stock group disabled"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system stock groups cannot be edited
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={`Edit ${group.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onEditClick(group);
                  }}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Edit Stock Group</TooltipContent>
            </Tooltip>
          )}

          {/* Delete Action */}
          {isPredefined ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground opacity-30 cursor-not-allowed pointer-events-none"
                    disabled
                    aria-label="Delete stock group disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system stock groups cannot be deleted
              </TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label={`Delete ${group.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onDeleteClick(group);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Delete Stock Group</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
