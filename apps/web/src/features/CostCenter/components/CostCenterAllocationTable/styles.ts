import { cva } from 'class-variance-authority';
import type { CSSProperties } from 'react';

export const getColumnStyles = (columnDef: any, size: number): CSSProperties => {
  const isFluid = (columnDef.meta as any)?.layout?.fluid;
  const minSize = columnDef.minSize || 0;
  
  return {
    flex: isFluid ? "1 1 0%" : `0 0 ${size}px`,
    width: isFluid ? "100%" : `${size}px`,
    minWidth: isFluid ? `${minSize}px` : `${size}px`,
    maxWidth: isFluid ? undefined : `${size}px`,
  };
};

export const rowVariants = cva(
  "transition-colors border-b border-border last:border-b-0 border-l-3 border-l-transparent group",
  {
    variants: {
      isPhantom: {
        true: "bg-primary/5",
        false: "",
      },
      isFocused: {
        true: "bg-primary/[0.06] border-l-primary",
        false: "",
      },
    },
    compoundVariants: [
      {
        isPhantom: false,
        isFocused: false,
        className: "hover:bg-surface-variant/40",
      },
    ],
    defaultVariants: {
      isPhantom: false,
      isFocused: false,
    },
  }
);
