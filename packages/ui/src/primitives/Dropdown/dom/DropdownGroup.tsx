'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { dropdownLabelClassName, dropdownSeparatorClassName } from './styles.dom';

const DropdownGroup = DropdownMenuPrimitive.Group;

const DropdownLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, style, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={`${dropdownLabelClassName} ${className || ''}`}
      style={style}
      {...props}
    />
  );
});
DropdownLabel.displayName = DropdownMenuPrimitive.Label.displayName;

const DropdownSeparator = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator>
>(({ className, style, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={`${dropdownSeparatorClassName} ${className || ''}`}
      style={style}
      {...props}
    />
  );
});

DropdownSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// Sub components
export { DropdownGroup, DropdownLabel, DropdownSeparator };
