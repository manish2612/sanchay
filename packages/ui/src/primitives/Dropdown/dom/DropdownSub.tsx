"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";
import { Icon } from "../../Icon/Icon.dom";
import {
  dropdownSubContentClassName,
  dropdownSubTriggerStyle,
} from "./styles.dom";
import { useDensity } from "../../../contexts/DensityContext";
import { cn } from "../../../utils";

const DropdownSub = DropdownMenuPrimitive.Sub;

const DropdownSubTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, children, style, ...props }, ref) => {
  const density = useDensity();
  return (
    <DropdownMenuPrimitive.SubTrigger
      ref={ref}
      className={cn(dropdownSubTriggerStyle({ density }), className)}
      style={style}
      {...props}
    >
      {children}
      <Icon name="chevron_right" size={16} className="ml-auto" />
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
      className={`${dropdownSubContentClassName} ${className || ""}`}
      style={style}
      {...props}
    />
  );
});
DropdownSubContent.displayName = DropdownMenuPrimitive.SubContent.displayName;

export { DropdownSub, DropdownSubTrigger, DropdownSubContent };
