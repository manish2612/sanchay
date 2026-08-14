import * as React from 'react';
import { Checkbox as CheckboxPrimitive } from '../../primitives/Checkbox';
import { cn } from '../../utils';

export interface CheckboxProps extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  labelPosition?: 'left' | 'right';
  containerClassName?: string;
}

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive>, CheckboxProps>(
  (
    {
      className,
      containerClassName,
      label,
      description,
      labelPosition = 'right',
      disabled,
      id: idProp,
      size,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const id = idProp || generatedId;

    const checkboxElement = (
      <CheckboxPrimitive
        ref={ref}
        id={id}
        disabled={disabled}
        size={size}
        className={className}
        {...props}
      />
    );

    if (!label && !description) {
      return checkboxElement;
    }

    return (
      <div
        className={cn(
          'relative flex gap-3',
          description ? 'items-start' : 'items-center',
          labelPosition === 'left' ? 'flex-row-reverse justify-end' : 'flex-row',
          disabled && 'opacity-50',
          containerClassName
        )}
      >
        <div className={cn("flex", description && "mt-0.5")}>
          {checkboxElement}
        </div>
        <div className="grid gap-1.5">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                'text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer',
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-muted-foreground leading-snug">{description}</p>
          )}
        </div>
      </div>
    );
  },
);

Checkbox.displayName = 'Checkbox';

export { Checkbox };
