'use client';

import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import React from 'react';
import { Icon } from '../../Icon/Icon.dom';
import { dropdownSubContentClassName, dropdownSubTriggerClassName } from './styles.dom';

const DropdownSub = DropdownMenuPrimitive.Sub;

const DropdownSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, children, style, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={`${dropdownSubTriggerClassName} ${className || ''}`}
      style={style}
      {...props}
    >
      {children}
      <Icon name="ChevronRight" size={16} className="ml-auto" />
    </DropdownMenuPrimitive.SubTrigger>
  );
});
DropdownSubTrigger.displayName = DropdownMenuPrimitive.SubTrigger.displayName;

const DropdownSubContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent>
>(({ className, style, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.SubContent
      ref={ref}
      className={`${dropdownSubContentClassName} ${className || ''}`}
      style={style}
      {...props}
    />
  );
});
DropdownSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export { DropdownSub, DropdownSubTrigger, DropdownSubContent };
