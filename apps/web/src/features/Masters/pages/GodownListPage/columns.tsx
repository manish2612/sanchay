import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { GodownDecoratedItem } from './useGodownList';
import { predefinedBadgeClasses, customBadgeClasses } from '@/features/Masters/components/common';

export interface GodownTableMeta {
  onEditClick: (godown: GodownDecoratedItem) => void;
  onDeleteClick: (godown: GodownDecoratedItem) => void;
  godowns?: GodownDecoratedItem[];
  godownMap?: Map<string, GodownDecoratedItem>;
}

export const godownColumns: ColumnDef<GodownDecoratedItem>[] = [
  {
    accessorKey: 'name',
    header: 'Godown Name',
    size: 260,
    cell: ({ row }) => {
      const godown = row.original;
      return (
        <div className="flex items-center min-w-0 py-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate leading-tight">
            {godown.name}
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
    cell: ({ row, table }) => {
      const godown = row.original;
      // 1. Direct parent_name from row if available in response
      let parentName = godown.parent_name;

      // 2. If parent_name is not in the row, match parent_id against fetched list/map
      if (!parentName && godown.parent_id && godown.parent_id !== godown.id) {
        const meta = table.options.meta as GodownTableMeta | undefined;
        parentName = meta?.godownMap?.get(godown.parent_id)?.name || '';

        if (!parentName) {
          const godownsList = meta?.godowns ?? (table.options.data as GodownDecoratedItem[]);
          const parent = godownsList?.find(
            (item) => item.id === godown.parent_id || item.code === godown.parent_id,
          );
          parentName = parent?.name ?? null;
        }
      }

      if (parentName && parentName.trim().toLowerCase() !== 'primary') {
        return (
          <div
            className="flex items-center gap-1.5 text-xs text-foreground font-normal min-w-0"
            title={`Sub-godown of ${parentName}`}
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
      const godown = row.original;
      const isPredefined =
        godown.is_predefined === true ||
        (godown.is_predefined as unknown) === 1 ||
        (godown.is_predefined as unknown) === '1' ||
        (godown.is_predefined as unknown) === 'true';
      const meta = table.options.meta as GodownTableMeta | undefined;

      return (
        <div className="flex items-center justify-end gap-1 w-full pr-1">
          {/* Edit Action */}
          {isPredefined ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block cursor-not-allowed">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground opacity-30 cursor-not-allowed pointer-events-none"
                    disabled
                    aria-label="Edit godown disabled"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system godowns cannot be edited
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
                  aria-label={`Edit ${godown.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onEditClick(godown);
                  }}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Edit Godown</TooltipContent>
            </Tooltip>
          )}

          {/* Delete Action */}
          {isPredefined ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="inline-block cursor-not-allowed">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground opacity-30 cursor-not-allowed pointer-events-none"
                    disabled
                    aria-label="Delete godown disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system godowns cannot be deleted
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
                  aria-label={`Delete ${godown.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onDeleteClick(godown);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Delete Godown</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
