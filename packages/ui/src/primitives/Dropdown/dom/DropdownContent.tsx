"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";
import { dropdownContentClassName } from "./styles.dom";

const DropdownContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content>
>(({ className, sideOffset = 4, style, ...props }, ref) => {
  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        className={`${dropdownContentClassName} ${className || ""}`}
        style={{ minWidth: "var(--radix-dropdown-menu-trigger-width)", ...style }}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
});

DropdownContent.displayName = DropdownMenuPrimitive.Content.displayName;

export { DropdownContent };
