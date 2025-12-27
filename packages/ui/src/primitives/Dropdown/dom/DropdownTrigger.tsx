"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";

const DropdownTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger ref={ref} className={className} {...props}>
    {children}
  </DropdownMenuPrimitive.Trigger>
));
DropdownTrigger.displayName = DropdownMenuPrimitive.Trigger.displayName;

export { DropdownTrigger };
