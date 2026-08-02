import { cva } from "class-variance-authority";

export const overlayVariants = cva(
  "fixed inset-0 z-50 bg-background/70 supports-[backdrop-filter]:bg-background/30 supports-[backdrop-filter]:backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
);

export const sheetVariants = cva(
  "fixed z-50 gap-4 bg-surface p-6 shadow-2xl transition ease-[cubic-bezier(0.16,1,0.3,1)] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b border-border data-[state=closed]:slide-out-to-top-full data-[state=open]:slide-in-from-top-full",
        bottom:
          "inset-x-0 bottom-0 border-t border-border data-[state=closed]:slide-out-to-bottom-full data-[state=open]:slide-in-from-bottom-full",
        left: "inset-y-0 left-0 h-full w-3/4 border-r border-border data-[state=closed]:slide-out-to-left-full data-[state=open]:slide-in-from-left-full sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l border-border data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-right-full sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
);

export const closeVariants = cva(
  "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary"
);
