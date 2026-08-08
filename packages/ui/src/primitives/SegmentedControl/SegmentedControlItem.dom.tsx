'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../utils';
import { useSegmentedControl } from './SegmentedControlRoot.dom';

const segmentedControlItemVariants = cva(
  'inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:text-foreground',
  {
    variants: {
      size: {
        default: 'px-3 py-1.5 text-sm',
        xs: 'px-2 py-0.5 text-xs',
        sm: 'px-2.5 py-1 text-sm',
        lg: 'px-4 py-2 text-base',
      },
      // Variant applies to the selected state of the item
      variant: {
        default:
          'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground data-[state=checked]:shadow-sm',
        outline:
          'data-[state=checked]:bg-transparent data-[state=checked]:border data-[state=checked]:border-primary data-[state=checked]:text-primary',
        secondary:
          'data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground data-[state=checked]:shadow-sm',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  },
);

export interface SegmentedControlItemProps
  extends
    React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>,
    VariantProps<typeof segmentedControlItemVariants> {
  label?: React.ReactNode;
}

const SegmentedControlItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  SegmentedControlItemProps
>(({ className, size, variant, label, children, ...props }, ref) => {
  const context = useSegmentedControl();

  // Size defaults to root context, then default variant
  const appliedSize = size || context.size || 'default';

  // Individual items can override the default variant styling for checked state
  const appliedVariant = variant || 'default';

  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        segmentedControlItemVariants({ size: appliedSize, variant: appliedVariant, className }),
        context.isBinary && 'focus-visible:ring-0 focus-visible:ring-offset-0',
      )}
      {...props}
    >
      {label || children}
    </RadioGroupPrimitive.Item>
  );
});
SegmentedControlItem.displayName = 'SegmentedControlItem';

export { SegmentedControlItem, segmentedControlItemVariants };
