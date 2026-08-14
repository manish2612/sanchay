import * as React from 'react';
import * as RadioGroupPrimitives from '@radix-ui/react-radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import { Circle } from 'lucide-react';
import { cn } from '../../utils';

const radioGroupItemVariants = cva(
  'aspect-square flex items-center justify-center rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      size: {
        sm: 'h-3.5 w-3.5',
        default: 'h-4 w-4',
        lg: 'h-5 w-5',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  },
);

const radioGroupIndicatorVariants = cva('flex items-center justify-center', {
  variants: {
    size: {
      sm: 'h-2 w-2',
      default: 'h-2.5 w-2.5',
      lg: 'h-3 w-3',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Root> {}

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitives.Root>, RadioGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <RadioGroupPrimitives.Root
        className={cn('grid gap-2', className)}
        {...props}
        ref={ref}
      />
    );
  },
);
RadioGroup.displayName = RadioGroupPrimitives.Root.displayName;

export interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitives.Item>,
    VariantProps<typeof radioGroupItemVariants> {}

const RadioGroupItem = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitives.Item>, RadioGroupItemProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <RadioGroupPrimitives.Item
        ref={ref}
        className={cn(radioGroupItemVariants({ size, className }))}
        {...props}
      >
        <RadioGroupPrimitives.Indicator className={cn(radioGroupIndicatorVariants({ size }))}>
          <Circle className="h-full w-full fill-current text-current" />
        </RadioGroupPrimitives.Indicator>
      </RadioGroupPrimitives.Item>
    );
  },
);
RadioGroupItem.displayName = RadioGroupPrimitives.Item.displayName;

export { RadioGroup, RadioGroupItem };
