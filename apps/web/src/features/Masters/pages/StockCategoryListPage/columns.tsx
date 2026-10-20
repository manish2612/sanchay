import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { StockCategory } from '@/features/Masters/api/stockCategoriesApi';
import {
  activeDotClasses,
  inactiveDotClasses,
  predefinedBadgeClasses,
  customBadgeClasses,
} from '@/features/Masters/components/common';

export interface StockCategoryTableMeta {
  onEditClick: (category: StockCategory) => void;
  onDeleteClick: (category: StockCategory) => void;
}

export const stockCategoryColumns: ColumnDef<StockCategory>[] = [
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
    accessorKey: 'parent_name',
    header: 'Parent Category',
    size: 200,
    cell: ({ row }) => {
      const category = row.original;
      const parentName = category.parent_name;

      if (parentName) {
        return (
          <div
            className="flex items-center gap-1.5 text-xs text-foreground font-normal min-w-0"
            title={`Subcategory of ${parentName}`}
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
    accessorKey: 'is_active',
    header: 'Status',
    size: 85,
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
      const meta = table.options.meta as StockCategoryTableMeta | undefined;

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
                    aria-label="Edit stock category disabled"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system stock categories cannot be edited
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
              <TooltipContent side="left">Edit Stock Category</TooltipContent>
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
                    aria-label="Delete stock category disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system stock categories cannot be deleted
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
              <TooltipContent side="left">Delete Stock Category</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
