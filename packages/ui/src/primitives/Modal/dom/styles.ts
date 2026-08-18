import { cva } from 'class-variance-authority';

export const overlayVariants = cva(
  'fixed inset-0 z-[300] bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
);

export const contentVariants = cva(
  'relative z-[300] grid w-full sm:w-full max-w-lg gap-4 border border-border bg-popover p-6 shadow-lg duration-300 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 data-[state=closed]:slide-out-to-bottom-4 data-[state=open]:slide-in-from-bottom-4 sm:data-[state=open]:zoom-in-95 sm:data-[state=open]:slide-in-from-bottom-8 rounded-lg',
);

export const closeVariants = cva(
  'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-surface-hover data-[state=open]:text-muted-foreground',
);
