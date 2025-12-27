"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CommandPaletteProps } from "../types";
import { cn } from "../../../utils";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";

const CommandPalette = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  CommandPaletteProps
>(({ className, children, ...props }, ref) => {
  return (
    <CommandPrimitive
      ref={ref}
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
        className
      )}
      {...props}
    >
      {children}
    </CommandPrimitive>
  );
});
CommandPalette.displayName = "CommandPalette";

export { CommandPalette };
