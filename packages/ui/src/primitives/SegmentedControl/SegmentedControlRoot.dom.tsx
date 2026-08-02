"use client";

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';

const segmentedControlRootVariants = cva(
  "inline-flex w-full items-center justify-center rounded-lg p-1 text-muted-foreground",
  {
    variants: {
      variant: {
        default: "bg-surface shadow-sm border border-border/50",
        ghost: "bg-transparent border border-transparent",
      },
      size: {
        default: "h-10",
        xs: "h-7",
        sm: "h-9",
        lg: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface SegmentedControlContextValue {
  size?: 'default' | 'xs' | 'sm' | 'lg' | null;
  variant?: 'default' | 'ghost' | null;
  isBinary?: boolean;
}

const SegmentedControlContext = React.createContext<SegmentedControlContextValue>({});

export const useSegmentedControl = () => React.useContext(SegmentedControlContext);

export interface SegmentedControlProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>,
    VariantProps<typeof segmentedControlRootVariants> {
  activationMode?: 'automatic' | 'manual';
}

const SegmentedControlRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  SegmentedControlProps
>(({ className, variant, size, activationMode, children, onKeyDown, ...props }, ref) => {
  const childCount = React.Children.count(children);
  const isBinary = childCount === 2;
  const derivedActivationMode = activationMode ?? (isBinary ? 'manual' : 'automatic');

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    // If there are 2 options, allow Space/Enter to toggle between them like a switch
    if (childCount === 2 && (e.key === ' ' || e.key === 'Enter')) {
      e.preventDefault();
      const items = Array.from(e.currentTarget.querySelectorAll('[role="radio"]')) as HTMLElement[];
      if (items.length === 2) {
        const uncheckedItem = items.find(item => item.getAttribute('data-state') !== 'checked');
        if (uncheckedItem) {
          uncheckedItem.click();
          uncheckedItem.focus();
        }
      }
    }
    
    // Call the original onKeyDown if provided
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  return (
    <SegmentedControlContext.Provider value={{ size, variant, isBinary }}>
      <RadioGroupPrimitive.Root
        ref={ref}
        className={cn(
          segmentedControlRootVariants({ variant, size, className }),
          isBinary && "has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-focus-ring"
        )}
        data-activation-mode={derivedActivationMode}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </RadioGroupPrimitive.Root>
    </SegmentedControlContext.Provider>
  );
});
SegmentedControlRoot.displayName = "SegmentedControlRoot";

export { SegmentedControlRoot, segmentedControlRootVariants };
