import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { LedgerDecoratedItem } from '@/features/Accounts/Ledger/types';
import {
  predefinedBadgeClasses,
  customBadgeClasses,
} from '@/features/Masters/components/common';

export interface LedgerTableMeta {
  onEditClick: (ledger: LedgerDecoratedItem) => void;
  onDeleteClick: (ledger: LedgerDecoratedItem) => void;
}

export const ledgerColumns: ColumnDef<LedgerDecoratedItem>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 260,
    cell: ({ row }) => {
      const ledger = row.original;
      return (
        <div className="flex items-center min-w-0 py-1">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate leading-tight">
            {ledger.name}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: 'parent_name',
    header: 'Parent',
    size: 200,
    cell: ({ row }) => {
      const parentName = row.original.parent_name;

      if (parentName && parentName !== 'Primary' && parentName !== '—') {
        return (
          <div
            className="flex items-center gap-1.5 text-xs text-foreground font-normal min-w-0"
            title={`Child of ${parentName}`}
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
    accessorKey: 'opening_balance',
    header: 'Opening Balance',
    size: 160,
    cell: ({ row }) => {
      const raw = row.original.opening_balance;
      const num =
        typeof raw === 'number'
          ? raw
          : parseFloat(String(raw || '0').replace(/[^0-9.-]+/g, '')) || 0;
      const formatted = num.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return (
        <span className="font-mono text-xs font-medium text-foreground">
          ₹{formatted}
        </span>
      );
    },
  },
  {
    accessorKey: 'is_predefined',
    header: 'Status',
    size: 110,
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
      const ledger = row.original;
      const isPredefined = Boolean(ledger.is_predefined);
      const meta = table.options.meta as LedgerTableMeta | undefined;

      return (
        <div className="flex items-center justify-end gap-1 w-full pr-1">
          {/* Edit Action - Temporarily Disabled UI */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground opacity-30 cursor-not-allowed pointer-events-none"
                  disabled
                  aria-label="Edit ledger disabled"
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="left">
              {isPredefined
                ? 'Predefined system ledgers cannot be edited'
                : 'Editing ledgers is currently disabled'}
            </TooltipContent>
          </Tooltip>

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
                    aria-label="Delete ledger disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system ledgers cannot be deleted
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
                  aria-label={`Delete ${ledger.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onDeleteClick(ledger);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Delete Ledger</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
