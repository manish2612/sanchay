import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { CostCategory } from '@/features/Masters/api/costCategoriesApi';
import {
  badgeYesClasses,
  badgeNoClasses,
  activeDotClasses,
  inactiveDotClasses,
} from '@/features/Masters/components/common';

export interface CostCategoryTableMeta {
  onEditClick: (category: CostCategory) => void;
  onDeleteClick: (category: CostCategory) => void;
}

export const costCategoryColumns: ColumnDef<CostCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Category Name',
    size: 240,
    cell: ({ row }) => {
      const category = row.original;
      return (
        <div className="flex items-center min-w-0 py-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate leading-tight">
            {category.name}
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
  // {
  //   accessorKey: 'allocate_revenue',
  //   header: 'Allocate Revenue',
  //   size: 150,
  //   cell: ({ getValue }) => {
  //     const isRevenue = Boolean(getValue<boolean | undefined>());
  //     return (
  //       <span className={isRevenue ? badgeYesClasses : badgeNoClasses}>
  //         {isRevenue ? 'Yes' : 'No'}
  //       </span>
  //     );
  //   },
  // },
  // {
  //   accessorKey: 'allocate_non_revenue',
  //   header: 'Allocate Non-Revenue',
  //   size: 170,
  //   cell: ({ getValue }) => {
  //     const isNonRevenue = Boolean(getValue<boolean | undefined>());
  //     return (
  //       <span className={isNonRevenue ? badgeYesClasses : badgeNoClasses}>
  //         {isNonRevenue ? 'Yes' : 'No'}
  //       </span>
  //     );
  //   },
  // },
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
      const category = row.original;
      const isPredefined = Boolean(category.is_predefined);
      const meta = table.options.meta as CostCategoryTableMeta | undefined;

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
                    aria-label="Edit category disabled"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system categories cannot be edited
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
                  aria-label={`Edit ${category.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onEditClick(category);
                  }}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Edit Cost Category</TooltipContent>
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
                    aria-label="Delete category disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system categories cannot be deleted
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
                  aria-label={`Delete ${category.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onDeleteClick(category);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Delete Cost Category</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
