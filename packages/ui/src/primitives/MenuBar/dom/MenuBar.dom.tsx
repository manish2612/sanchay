"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../../../utils";
import { menuBarStyles } from "./styles.dom";

const MenuBar = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(menuBarStyles.root, className)}
    {...props}
  />
));
MenuBar.displayName = MenubarPrimitive.Root.displayName;

export { MenuBar };
