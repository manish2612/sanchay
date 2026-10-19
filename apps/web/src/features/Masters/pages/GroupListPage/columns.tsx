import React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Icon, Button, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';
import type { Group } from '@/features/Masters/api/groupsApi';
import {
  categoryAssetClasses,
  categoryLiabilityClasses,
  categoryIncomeClasses,
  categoryExpenseClasses,
  categoryDefaultClasses,
  predefinedBadgeClasses,
  customBadgeClasses,
  activeDotClasses,
  inactiveDotClasses,
} from './styles.dom';

export interface GroupTableMeta {
  onEditClick: (group: Group) => void;
  onDeleteClick: (group: Group) => void;
}

export const groupColumns: ColumnDef<Group>[] = [
  {
    accessorKey: 'name',
    header: 'Group Name',
    size: 230,
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
    size: 170,
    cell: ({ getValue }) => {
      const alias = getValue<string | undefined>();
      if (!alias) return <span className="text-muted-foreground/60 text-xs">—</span>;
      return (
        <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-muted/60 text-foreground border border-border/60">
          {alias}
        </span>
      );
    },
  },
  {
    accessorKey: 'primary_group_name',
    header: 'Primary Group',
    size: 180,
    cell: ({ row }) => {
      const group = row.original;
      const primaryGroup = group.primary_group_name;

      if (primaryGroup && primaryGroup !== group.name) {
        return (
          <div
            className="flex items-center gap-1.5 text-xs text-foreground font-normal min-w-0"
            title={`Subgroup of ${primaryGroup}`}
          >
            <span className="text-muted-foreground font-mono text-sm leading-none shrink-0">↳</span>
            <span className="truncate">{primaryGroup}</span>
          </div>
        );
      }

      return <span className="text-muted-foreground/70 text-xs font-normal">Primary</span>;
    },
  },
  {
    accessorKey: 'classification',
    header: 'Classification',
    size: 100,
    cell: ({ getValue }) => {
      const classification = (getValue<string | undefined>() || '').toLowerCase();
      let badgeClass = categoryDefaultClasses;

      if (classification.includes('asset')) badgeClass = categoryAssetClasses;
      else if (classification.includes('liabilit')) badgeClass = categoryLiabilityClasses;
      else if (classification.includes('income') || classification.includes('revenue'))
        badgeClass = categoryIncomeClasses;
      else if (classification.includes('expense')) badgeClass = categoryExpenseClasses;

      const label = getValue<string | undefined>() || '—';
      return <span className={badgeClass}>{label}</span>;
    },
  },
  {
    accessorKey: 'category',
    header: 'Category',
    size: 100,
    cell: ({ row }) => {
      const group = row.original;
      const category = group.category;
      const subCategory = group.sub_category;

      if (!category && !subCategory) {
        return <span className="text-muted-foreground/60 text-xs">—</span>;
      }

      return (
        <div className="flex items-center gap-1.5 text-xs text-foreground min-w-0">
          <span className="font-mono text-xs px-1.5 py-0.5 rounded bg-surface-variant text-muted-foreground border border-border/60">
            {category || '—'}
          </span>
          {subCategory && subCategory !== category && (
            <span className="text-[11px] text-muted-foreground">({subCategory})</span>
          )}
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
    accessorKey: 'is_active',
    header: 'Status',
    size: 80,
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
      const group = row.original;
      const isPredefined = Boolean(group.is_predefined);
      const meta = table.options.meta as GroupTableMeta | undefined;

      return (
        <div className="flex items-center justify-end gap-1 w-full pr-1">
          {/* Edit Action Button */}
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
                    aria-label="Edit group disabled"
                  >
                    <Icon name="Pencil" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">Predefined system groups cannot be edited</TooltipContent>
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
              <TooltipContent side="left">Edit Group</TooltipContent>
            </Tooltip>
          )}

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
                    aria-label="Delete group disabled"
                  >
                    <Icon name="Trash2" size={14} />
                  </Button>
                </span>
              </TooltipTrigger>
              <TooltipContent side="left">
                Predefined system groups cannot be deleted
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
              <TooltipContent side="left">Delete Group</TooltipContent>
            </Tooltip>
          )}
        </div>
      );
    },
  },
];
