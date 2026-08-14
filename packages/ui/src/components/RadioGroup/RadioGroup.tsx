import * as React from 'react';
import { RadioGroup as RadioGroupPrimitiveRoot, RadioGroupItem as RadioGroupPrimitiveItem } from '../../primitives/RadioGroup';
import { cn } from '../../utils';

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface RadioGroupProps extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitiveRoot> {
  options: RadioOption[];
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'default' | 'lg';
}

const RadioGroup = React.forwardRef<React.ElementRef<typeof RadioGroupPrimitiveRoot>, RadioGroupProps>(
  ({ className, options, orientation = 'vertical', size = 'default', ...props }, ref) => {
    return (
      <RadioGroupPrimitiveRoot
        className={cn(
          'flex',
          orientation === 'vertical' ? 'flex-col gap-3' : 'flex-row flex-wrap gap-4',
          className
        )}
        {...props}
        ref={ref}
      >
        {options.map((option) => {
          // Generate a unique ID per option for the label association
          const id = `radio-${React.useId()}-${option.value}`;
          return (
            <div key={option.value} className={cn("relative flex gap-3", option.description ? 'items-start' : 'items-center')}>
              <div className={cn("flex", option.description && "mt-0.5")}>
                <RadioGroupPrimitiveItem
                  value={option.value}
                  id={id}
                  disabled={option.disabled}
                  size={size}
                />
              </div>
              <div className="grid gap-1.5">
                <label
                  htmlFor={id}
                  className={cn(
                    'text-sm font-medium cursor-pointer',
                    option.disabled && 'cursor-not-allowed opacity-70'
                  )}
                >
                  {option.label}
                </label>
                {option.description && (
                  <p className="text-sm text-muted-foreground leading-snug">{option.description}</p>
                )}
              </div>
            </div>
          );
        })}
      </RadioGroupPrimitiveRoot>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';

export { RadioGroup };
