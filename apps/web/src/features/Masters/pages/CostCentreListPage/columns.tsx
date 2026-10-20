import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { CostCenterListItem } from '@/features/Masters/api/costCentersApi';
import { activeDotClasses, inactiveDotClasses } from '@/features/Masters/components/common';

export interface CostCentreTableMeta {
  onEditClick: (center: CostCenterListItem) => void;
  onDeleteClick: (center: CostCenterListItem) => void;
}

export const costCentreColumns: ColumnDef<CostCenterListItem>[] = [
  {
    accessorKey: 'name',
    header: 'Cost Centre Name',
    size: 260,
    cell: ({ row }) => {
      const center = row.original;
      return (
        <div className="flex items-center min-w-0 py-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate leading-tight">
            {center.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'cost_category_name',
    header: 'Cost Category',
    size: 220,
    cell: ({ getValue }) => {
      const categoryName = getValue<string | undefined | null>();
      if (!categoryName) return <span className="text-muted-foreground/60 text-xs">—</span>;
      return (
        <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-muted/60 text-foreground border border-border/60 font-medium">
          {categoryName}
        </span>
      );
    },
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    size: 90,
    cell: ({ getValue }) => {
      const isActive = getValue<boolean>() !== false;
      return (
        <div className="flex items-center text-xs font-medium">
          <span className={isActive ? activeDotClasses : inactiveDotClasses} />
          <span className={isActive ? 'text-foreground' : 'text-muted-foreground'}>
            {isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 75,
    cell: ({ row, table }) => {
      const center = row.original;
      const isPredefined = Boolean(center.is_predefined);
      const meta = table.options.meta as CostCentreTableMeta | undefined;

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
                    aria-label="Edit cost centre disabled"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system cost centres cannot be edited
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
                  aria-label={`Edit ${center.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onEditClick(center);
                  }}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Edit Cost Centre</TooltipContent>
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
                    aria-label="Delete cost centre disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system cost centres cannot be deleted
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
                  aria-label={`Delete ${center.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onDeleteClick(center);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Delete Cost Centre</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
