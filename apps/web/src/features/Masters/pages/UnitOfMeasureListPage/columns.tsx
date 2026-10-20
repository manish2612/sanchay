import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { StockUnit } from '@/features/Masters/api/stockUnitsApi';
import {
  activeDotClasses,
  inactiveDotClasses,
  predefinedBadgeClasses,
  customBadgeClasses,
} from '@/features/Masters/components/common';

export interface UnitOfMeasureTableMeta {
  onEditClick: (unit: StockUnit) => void;
  onDeleteClick: (unit: StockUnit) => void;
}

export const unitOfMeasureColumns: ColumnDef<StockUnit>[] = [
  {
    accessorKey: 'name',
    header: 'Formal Name',
    size: 240,
    cell: ({ row }) => {
      const unit = row.original;
      return (
        <div className="flex items-center min-w-0 py-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate leading-tight">
            {unit.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'symbol',
    header: 'Symbol',
    size: 130,
    cell: ({ row }) => {
      const unit = row.original;
      return (
        <div className="flex items-center min-w-0 py-1">
          <span className="font-mono text-xs px-2 py-0.5 rounded bg-muted/60 text-foreground border border-border/60 font-semibold">
            {unit.symbol}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'uqc_code',
    header: 'UQC Code',
    size: 140,
    cell: ({ getValue }) => {
      const uqc = getValue<string | undefined | null>();
      if (!uqc) return <span className="text-muted-foreground/60 text-xs">—</span>;
      return (
        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-variant text-muted-foreground border border-border/50">
          {uqc}
        </span>
      );
    },
  },
  {
    accessorKey: 'decimal_places',
    header: 'Decimal Places',
    size: 130,
    cell: ({ getValue }) => {
      const decimals = getValue<number | undefined | null>() ?? 0;
      return <span className="text-xs font-mono text-foreground">{decimals}</span>;
    },
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    size: 100,
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
      const unit = row.original;
      const isPredefined = Boolean(
        unit.is_predefined === true ||
        (unit.is_predefined as unknown) === 1 ||
        (unit.is_predefined as unknown) === '1' ||
        (unit.is_predefined as unknown) === 'true'
      );
      const meta = table.options.meta as UnitOfMeasureTableMeta | undefined;

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
                    aria-label="Edit unit of measure disabled"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">Predefined system units cannot be edited</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                  aria-label={`Edit ${unit.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onEditClick(unit);
                  }}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Edit Unit of Measure</TooltipContent>
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
                    aria-label="Delete unit of measure disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">Predefined system units cannot be deleted</TooltipContent>
            </Tooltip>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                  aria-label={`Delete ${unit.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onDeleteClick(unit);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Delete Unit of Measure</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
