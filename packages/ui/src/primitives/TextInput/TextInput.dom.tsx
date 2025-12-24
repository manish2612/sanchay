import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { TextInputRootProps, TextInputSlotProps, WebTextInputProps } from './types';

// --- Styles ---
const rootVariants = cva(
  "flex h-10 w-full items-center rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive focus-within:ring-destructive",
        success: "border-success focus-within:ring-success",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed",
      }
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// --- Components ---

const Root = React.forwardRef<HTMLDivElement, TextInputRootProps & { disabled?: boolean }>(
  ({ className, variant, disabled, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(rootVariants({ variant, disabled, className }))}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Root.displayName = "TextInput.Root";

const Slot = React.forwardRef<HTMLDivElement, TextInputSlotProps>(
  ({ className, side = 'left', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-center text-muted-foreground",
          side === 'left' ? "mr-2" : "ml-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Slot.displayName = "TextInput.Slot";

const Input = React.forwardRef<HTMLInputElement, WebTextInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "TextInput.Input";

export const TextInput = {
  Root,
  Slot,
  Input,
};
