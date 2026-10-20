import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { TaxGroupResponse } from '@/features/Masters/types/taxGroup';
import {
  activeDotClasses,
  inactiveDotClasses,
  predefinedBadgeClasses,
  customBadgeClasses,
} from '@/features/Masters/components/common';

export interface TaxGroupTableMeta {
  onEditClick: (taxGroup: TaxGroupResponse) => void;
  onDeleteClick: (taxGroup: TaxGroupResponse) => void;
}

const formatScope = (scope?: string): string => {
  if (!scope) return '—';
  switch (scope) {
    case 'INTRA_STATE':
      return 'Intra-State';
    case 'INTER_STATE':
      return 'Inter-State';
    case 'ALL':
      return 'All Scopes';
    default:
      return scope;
  }
};

const formatComputeMethod = (method?: string): string => {
  if (!method) return '—';
  switch (method) {
    case 'PCT_BASE':
      return 'On Base';
    case 'PCT_TAX':
      return 'On Tax';
    case 'FIXED_QTY':
      return 'Fixed / Qty';
    default:
      return method;
  }
};

export const taxGroupColumns: ColumnDef<TaxGroupResponse>[] = [
  {
    accessorKey: 'name',
    header: 'Tax Group Name',
    size: 200,
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex flex-col justify-center min-w-0 py-1 h-full">
          <p className="text-xs sm:text-sm font-semibold text-foreground truncate leading-tight">
            {item.name}
          </p>
          {item.code ? (
            <span className="text-[11px] text-muted-foreground font-mono mt-0.5">
              {item.code}
            </span>
          ) : null}
        </div>
      );
    },
  },
  {
    accessorKey: 'tax_type_name',
    header: 'Tax Type',
    size: 140,
    cell: ({ getValue }) => {
      const taxType = getValue<string | undefined>();
      if (!taxType) {
        return <div className="flex items-center h-full text-muted-foreground/60 text-xs">—</div>;
      }
      return (
        <div className="flex items-center h-full">
          <span className="inline-flex items-center text-xs px-2 py-0.5 rounded-md bg-muted/60 text-foreground border border-border/60 font-medium">
            {taxType}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'combined_rate',
    header: 'Combined Rate',
    size: 110,
    cell: ({ getValue }) => {
      const rate = getValue<string | number | undefined>();
      if (rate === undefined || rate === null || rate === '') {
        return <div className="flex items-center h-full text-muted-foreground/60 text-xs">—</div>;
      }
      return (
        <div className="flex items-center h-full text-xs font-semibold text-foreground">
          {rate}%
        </div>
      );
    },
  },
  {
    id: 'component',
    header: 'Component',
    columns: [
      {
        id: 'component_name',
        header: 'Name',
        size: 150,
        cell: ({ row }) => {
          const components = row.original.components || [];
          if (components.length === 0) {
            return <div className="h-full flex items-center px-3 text-muted-foreground/60 text-xs">—</div>;
          }
          return (
            <div className="flex flex-col w-full h-full divide-y divide-border/50">
              {components.map((c, i) => (
                <div
                  key={i}
                  className="h-[38px] min-h-[38px] px-3 text-xs font-medium text-foreground truncate flex items-center"
                  title={c.taxgroup_component_name}
                >
                  {c.taxgroup_component_name}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        id: 'component_scope',
        header: 'Scope',
        size: 110,
        cell: ({ row }) => {
          const components = row.original.components || [];
          if (components.length === 0) {
            return <div className="h-full flex items-center px-3 text-muted-foreground/60 text-xs">—</div>;
          }
          return (
            <div className="flex flex-col w-full h-full divide-y divide-border/50">
              {components.map((c, i) => (
                <div
                  key={i}
                  className="h-[38px] min-h-[38px] px-3 text-xs text-muted-foreground truncate flex items-center"
                >
                  <span className="text-[11px] px-1.5 py-0.5 rounded bg-muted/50 border border-border/40 font-normal">
                    {formatScope(c.taxgroup_component_scope)}
                  </span>
                </div>
              ))}
            </div>
          );
        },
      },
      {
        id: 'component_compute_method',
        header: 'Compute Method',
        size: 130,
        cell: ({ row }) => {
          const components = row.original.components || [];
          if (components.length === 0) {
            return <div className="h-full flex items-center px-3 text-muted-foreground/60 text-xs">—</div>;
          }
          return (
            <div className="flex flex-col w-full h-full divide-y divide-border/50">
              {components.map((c, i) => (
                <div
                  key={i}
                  className="h-[38px] min-h-[38px] px-3 text-xs text-muted-foreground truncate flex items-center"
                >
                  {formatComputeMethod(c.taxgroup_component_compute_method)}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        id: 'component_rate',
        header: 'Rate (%)',
        size: 80,
        cell: ({ row }) => {
          const components = row.original.components || [];
          if (components.length === 0) {
            return <div className="h-full flex items-center px-3 text-muted-foreground/60 text-xs">—</div>;
          }
          return (
            <div className="flex flex-col w-full h-full divide-y divide-border/50">
              {components.map((c, i) => (
                <div
                  key={i}
                  className="h-[38px] min-h-[38px] px-3 text-xs font-semibold text-foreground truncate flex items-center"
                >
                  {c.taxgroup_component_rate}%
                </div>
              ))}
            </div>
          );
        },
      },
      {
        id: 'component_input_ledger',
        header: 'Input Ledger',
        size: 150,
        cell: ({ row }) => {
          const components = row.original.components || [];
          if (components.length === 0) {
            return <div className="h-full flex items-center px-3 text-muted-foreground/60 text-xs">—</div>;
          }
          return (
            <div className="flex flex-col w-full h-full divide-y divide-border/50">
              {components.map((c, i) => (
                <div
                  key={i}
                  className="h-[38px] min-h-[38px] px-3 text-xs text-muted-foreground truncate flex items-center"
                  title={c.input_ledger_name}
                >
                  {c.input_ledger_name || '—'}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        id: 'component_output_ledger',
        header: 'Output Ledger',
        size: 150,
        cell: ({ row }) => {
          const components = row.original.components || [];
          if (components.length === 0) {
            return <div className="h-full flex items-center px-3 text-muted-foreground/60 text-xs">—</div>;
          }
          return (
            <div className="flex flex-col w-full h-full divide-y divide-border/50">
              {components.map((c, i) => (
                <div
                  key={i}
                  className="h-[38px] min-h-[38px] px-3 text-xs text-muted-foreground truncate flex items-center"
                  title={c.output_ledger_name}
                >
                  {c.output_ledger_name || '—'}
                </div>
              ))}
            </div>
          );
        },
      },
    ],
  },
  {
    accessorKey: 'is_active',
    header: 'Status',
    size: 85,
    cell: ({ getValue }) => {
      const isActive = getValue<boolean>() !== false;
      return (
        <div className="flex items-center h-full text-xs font-medium">
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
      return (
        <div className="flex items-center h-full">
          {isPredefined ? (
            <span className={predefinedBadgeClasses}>
              <Icon name="Lock" size={11} className="text-muted-foreground" />
              Default
            </span>
          ) : (
            <span className={customBadgeClasses}>Custom</span>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    size: 75,
    cell: ({ row, table }) => {
      const item = row.original;
      const isPredefined = Boolean(item.is_predefined);
      const meta = table.options.meta as TaxGroupTableMeta | undefined;

      return (
        <div className="flex items-center justify-end gap-1 w-full h-full pr-1">
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
                    aria-label="Edit tax group disabled"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system tax groups cannot be edited
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
                  aria-label={`Edit ${item.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onEditClick(item);
                  }}
                >
                  <Icon name="Pencil" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Edit tax group</TooltipContent>
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
                    aria-label="Delete tax group disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system tax groups cannot be deleted
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
                  aria-label={`Delete ${item.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    meta?.onDeleteClick(item);
                  }}
                >
                  <Icon name="Trash2" size={14} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Delete tax group</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
