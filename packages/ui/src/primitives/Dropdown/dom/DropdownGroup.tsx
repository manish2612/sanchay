"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";
import { dropdownLabelStyle, dropdownSeparatorStyle } from "./styles.dom";
import { useDensity } from "../../../contexts/DensityContext";
import { cn } from "../../../utils";

const DropdownGroup = DropdownMenuPrimitive.Group;

const DropdownLabel = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label>
>(({ className, style, ...props }, ref) => {
  const density = useDensity();
  return (
    <DropdownMenuPrimitive.Label
      ref={ref}
      className={cn(dropdownLabelStyle({ density }), className)}
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
  const density = useDensity();
  return (
    <DropdownMenuPrimitive.Separator
      ref={ref}
      className={cn(dropdownSeparatorStyle({ density }), className)}
      style={style}
      {...props}
    />
  );
});

DropdownSeparator.displayName = DropdownMenuPrimitive.Separator.displayName;

// Sub components
export { DropdownGroup, DropdownLabel, DropdownSeparator };
