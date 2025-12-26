"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../../../utils";
import { menuBarStyles } from "./styles.dom";

const MenuBarLabel = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <MenubarPrimitive.Label
    ref={ref}
    className={cn(menuBarStyles.label, inset && "pl-8", className)}
    {...props}
  />
));
MenuBarLabel.displayName = MenubarPrimitive.Label.displayName;

export { MenuBarLabel };
