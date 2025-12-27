"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { cn } from "../../../utils";
import { menuBarStyles } from "./styles.dom";

const MenuBarContent = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.Content>
>(
  (
    { className, align = "start", alignOffset = -4, sideOffset = 8, ...props },
    ref
  ) => (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={cn(menuBarStyles.content, className)}
        {...props}
      />
    </MenubarPrimitive.Portal>
  )
);
MenuBarContent.displayName = MenubarPrimitive.Content.displayName;

export { MenuBarContent };
