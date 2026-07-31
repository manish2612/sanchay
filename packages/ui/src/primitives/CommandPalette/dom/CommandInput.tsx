"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { CommandInputProps } from "../types";
import { cn } from "../../../utils";
import { Icon } from "../../../primitives/Icon/Icon.dom";

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  CommandInputProps & { className?: string }
>(({ className, placeholder, ...props }, ref) => (
  <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
    <div className="flex items-center justify-center mr-2 h-4 w-4 shrink-0 opacity-50">
      <Icon name="Search" size={16} />
    </div>
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      placeholder={placeholder}
      {...props}
    />
  </div>
));

CommandInput.displayName = "CommandInput";

export { CommandInput };
