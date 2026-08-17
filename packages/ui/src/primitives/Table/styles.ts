import { cva } from 'class-variance-authority';

export const tableStyles = {
  root: cva(
    'relative flex flex-col w-full h-full overflow-hidden rounded-md border border-border bg-surface focus-within:outline focus-within:outline-2 focus-within:outline-offset-1 focus-within:outline-primary',
  ),
  header: cva('flex flex-col w-full bg-surface-variant text-surface-variant-foreground font-medium text-sm'),
  headerRow: cva('flex w-full items-center border-b border-border p-0'),
  headerCell: cva(
    'group flex-1 px-4 py-3 h-10 items-center justify-start text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 relative',
    {
      variants: {
        isFiltered: {
          true: 'font-bold text-foreground',
          false: '',
        },
      },
      defaultVariants: {
        isFiltered: false,
      },
    }
  ),
  filterRow: cva('flex w-full items-center border-b border-border p-0 bg-surface-variant/50'),
  filterCell: cva('flex-1 px-2 py-1 h-10 items-center justify-start align-middle'),
  resizer: cva(
    'absolute right-0 top-0 h-full w-4 flex items-center justify-center cursor-col-resize user-select-none touch-action-none z-10 transition-colors bg-transparent',
    {
      variants: {
        isResizing: {
          true: 'text-primary bg-primary/10',
          false: 'hover:bg-border/50 text-muted-foreground/50',
        },
      },
      defaultVariants: {
        isResizing: false,
      },
    }
  ),
  body: cva(
    'w-full h-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-surface-hover [&::-webkit-scrollbar-thumb]:bg-muted-foreground hover:[&::-webkit-scrollbar-thumb]:bg-foreground/50',
  ), // Removed relative, ensured full height
  row: cva(
    'flex w-full h-full items-stretch border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted data-[focused=true]:text-foreground outline-none cursor-default',
    {
      variants: {
        variant: {
          default: '',
        },
      },
      defaultVariants: {
        variant: 'default',
      },
    },
  ),
  cell: cva('flex-1 px-4 py-2 text-sm text-foreground truncate items-center flex'),
  footer: cva('flex w-full border-t border-border bg-muted/50 font-medium text-sm'),
  statusBar: cva(
    'flex w-full items-center justify-between px-4 py-1 text-xs text-muted-foreground bg-muted/20 border-y border-border/50 shrink-0',
  ),
};
