import * as React from 'react';
import * as CheckboxPrimitives from '@radix-ui/react-checkbox';
import { cva, type VariantProps } from 'class-variance-authority';
import { Check } from 'lucide-react';
import { cn } from '../../utils';

const checkboxRootVariants = cva(
  'peer shrink-0 flex items-center justify-center rounded-sm border border-input ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground',
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

const checkboxIndicatorVariants = cva('flex items-center justify-center text-current', {
  variants: {
    size: {
      sm: 'h-2.5 w-2.5',
      default: 'h-3 w-3',
      lg: 'h-3.5 w-3.5',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitives.Root>,
    VariantProps<typeof checkboxRootVariants> {}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitives.Root>, CheckboxProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <CheckboxPrimitives.Root
        ref={ref}
        className={cn(checkboxRootVariants({ size, className }))}
        {...props}
      >
        <CheckboxPrimitives.Indicator className={cn(checkboxIndicatorVariants({ size }))}>
          <Check className="h-full w-full" strokeWidth={3} />
        </CheckboxPrimitives.Indicator>
      </CheckboxPrimitives.Root>
    );
  },
);

Checkbox.displayName = CheckboxPrimitives.Root.displayName;

export { Checkbox };
