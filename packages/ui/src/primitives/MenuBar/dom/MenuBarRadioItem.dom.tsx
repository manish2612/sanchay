"use client";

import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Icon } from "../../Icon/Icon.dom";
import { cn } from "../../../utils";
import { menuBarStyles } from "./styles.dom";

const MenuBarRadioItem = React.forwardRef<
  React.ElementRef<typeof MenubarPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof MenubarPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <MenubarPrimitive.RadioItem
    ref={ref}
    className={cn(menuBarStyles.radioItem, className)}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarPrimitive.ItemIndicator>
        <Icon name="Circle" size={8} className="text-current" />
      </MenubarPrimitive.ItemIndicator>
    </span>
    {children}
  </MenubarPrimitive.RadioItem>
));
MenuBarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

export { MenuBarRadioItem };
