"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../../../utils";
import { menuBarStyles } from "./styles.dom";

const MenuBarTrigger = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Trigger
    ref={ref}
    className={cn(menuBarStyles.trigger, className)}
    {...props}
  />
));
MenuBarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

export { MenuBarTrigger };
