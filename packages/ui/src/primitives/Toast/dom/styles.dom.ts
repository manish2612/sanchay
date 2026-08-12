import { cva, type VariantProps } from 'class-variance-authority';

export type ToastVariant = 'default' | 'info' | 'success' | 'warning' | 'destructive';
export type ToastDensity = 'compact' | 'comfortable' | 'spacious';
export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center';

export const toastViewportVariants = cva(
  'fixed z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col sm:max-w-[420px] outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
  {
    variants: {
      position: {
        'top-right': 'top-0 right-0 sm:flex-col',
        'top-left': 'top-0 left-0 sm:flex-col',
        'bottom-right': 'bottom-0 right-0 sm:flex-col-reverse',
        'bottom-left': 'bottom-0 left-0 sm:flex-col-reverse',
        'top-center': 'top-0 left-1/2 -translate-x-1/2 sm:flex-col items-center',
        'bottom-center': 'bottom-0 left-1/2 -translate-x-1/2 sm:flex-col-reverse items-center',
      },
    },
    defaultVariants: {
      position: 'bottom-right',
    },
  }
);

export const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between overflow-hidden rounded-lg border shadow-lg transition-all data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-bottom-full data-[state=open]:sm:slide-in-from-bottom-full data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform]_200ms_ease-out data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]',
  {
    variants: {
      variant: {
        default: 'border-border bg-card text-card-foreground',
        info: 'border-blue-500/30 bg-blue-50/90 text-blue-900 dark:bg-blue-950/80 dark:text-blue-100 dark:border-blue-700/50',
        success: 'border-emerald-500/30 bg-emerald-50/90 text-emerald-900 dark:bg-emerald-950/80 dark:text-emerald-100 dark:border-emerald-700/50',
        warning: 'border-amber-500/30 bg-amber-50/90 text-amber-900 dark:bg-amber-950/80 dark:text-amber-100 dark:border-amber-700/50',
        destructive: 'border-red-500/30 bg-red-50/90 text-red-900 dark:bg-red-950/80 dark:text-red-100 dark:border-red-700/50',
      },
      density: {
        compact: 'p-2.5 gap-2 text-xs',
        comfortable: 'p-4 gap-3 text-sm',
        spacious: 'p-5 gap-4 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      density: 'comfortable',
    },
  }
);

export const toastActionVariants = cva(
  'inline-flex shrink-0 items-center justify-center rounded-md border bg-transparent font-medium transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-destructive/30 group-[.destructive]:hover:border-destructive/50 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
  {
    variants: {
      density: {
        compact: 'h-7 px-2 text-xs',
        comfortable: 'h-8 px-3 text-xs',
        spacious: 'h-9 px-4 text-sm',
      },
    },
    defaultVariants: {
      density: 'comfortable',
    },
  }
);

export const toastCloseVariants = cva(
  'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-70 transition-opacity hover:opacity-100 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
  {
    variants: {
      density: {
        compact: 'right-1.5 top-1.5 p-0.5',
        comfortable: 'right-2 top-2 p-1',
        spacious: 'right-2.5 top-2.5 p-1.5',
      },
    },
    defaultVariants: {
      density: 'comfortable',
    },
  }
);

export type ToastVariantsProps = VariantProps<typeof toastVariants>;
export type ToastViewportVariantsProps = VariantProps<typeof toastViewportVariants>;
export type ToastActionVariantsProps = VariantProps<typeof toastActionVariants>;
export type ToastCloseVariantsProps = VariantProps<typeof toastCloseVariants>;
