"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Icon } from "../../Icon";
import { cn } from "../../../utils";
import { menuBarStyles } from "./styles.dom";

const MenuBarSub = MenubarPrimitive.Sub;

const MenuBarSubTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <MenubarPrimitive.SubTrigger
    ref={ref}
    className={cn(menuBarStyles.subTrigger, inset && "pl-8", className)}
    {...props}
  >
    {children}
    <Icon name="chevron-right" size={16} className="ml-auto" />
  </MenubarPrimitive.SubTrigger>
));
MenuBarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenuBarSubContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.SubContent
    ref={ref}
    className={cn(menuBarStyles.subContent, className)}
    {...props}
  />
));
MenuBarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

export { MenuBarSub, MenuBarSubTrigger, MenuBarSubContent };
