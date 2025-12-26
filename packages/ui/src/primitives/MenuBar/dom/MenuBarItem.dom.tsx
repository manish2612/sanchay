"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../../../utils";
import { menuBarStyles } from "./styles.dom";

const MenuBarItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Item
    ref={ref}
    className={cn(menuBarStyles.item, inset && "pl-8", className)}
    {...props}
  />
));
MenuBarItem.displayName = MenubarPrimitive.Item.displayName;

export { MenuBarItem };
