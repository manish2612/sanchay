import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { VoucherType } from './types';
import { predefinedBadgeClasses, customBadgeClasses } from '@/features/Masters/components/common';

export interface VoucherTypeTableMeta {
  onEditClick: (voucherType: VoucherType) => void;
  onDeleteClick: (voucherType: VoucherType) => void;
}

/**
 * Transforms SCREAMING_SNAKE_CASE or UPPERCASE string to Normal Case (Title Case).
 * E.g. "ACCOUNTING" -> "Accounting", "ITEM_INVOICE" -> "Item Invoice"
 */
export function formatNormalCase(value?: string | null): string {
  if (!value) return '—';
  return value
    .toLowerCase()
    .split(/[_\s]+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export const voucherTypeColumns: ColumnDef<VoucherType>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    size: 260,
    cell: ({ row }) => {
      const voucherType = row.original;
      return (
        <div className="flex flex-col min-w-0 py-0.5">
          <span className="text-xs sm:text-sm font-semibold text-foreground truncate">
            {voucherType.name}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    size: 150,
    cell: ({ getValue }) => {
      const category = getValue<string | undefined>();
      if (!category) {
        return <span className="text-muted-foreground/60 text-xs">—</span>;
      }
      return (
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-surface-variant text-muted-foreground border border-border/60">
          {category}
        </span>
      );
    },
  },
  {
    accessorKey: 'is_predefined',
    header: 'Status',
    size: 120,
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
  // {
  //   accessorKey: 'view_mode',
  //   header: 'View Mode',
  //   size: 150,
  //   cell: ({ getValue }) => {
  //     const viewMode = getValue<string | undefined>();
  //     return (
  //       <span className="text-xs text-foreground font-normal">
  //         {formatNormalCase(viewMode)}
  //       </span>
  //     );
  //   },
  // },
  {
    id: 'actions',
    header: 'Actions',
    size: 75,
    cell: ({ row, table }) => {
      const voucherType = row.original;
      const isPredefined = Boolean(voucherType.is_predefined);
      const meta = table.options.meta as VoucherTypeTableMeta | undefined;

      return (
        <div className="flex items-center justify-end gap-1 w-full pr-1">
          {/* Edit Action Button (UI present but temporarily disabled) */}
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-block">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-muted-foreground opacity-30 cursor-not-allowed pointer-events-none"
                  disabled
                  aria-label="Edit voucher type disabled"
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </span>
            </TooltipTrigger>
            <TooltipContent side="left">
              {isPredefined ? 'Predefined voucher types cannot be edited' : 'Edit coming soon'}
            </TooltipContent>
          </Tooltip>

          {/* Delete Action Button */}
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
                    aria-label="Delete voucher type disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined voucher types cannot be deleted
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
                  aria-label={`Delete ${voucherType.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onDeleteClick(voucherType);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Delete Voucher Type</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
