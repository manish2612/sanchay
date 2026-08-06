"use client";

import React from "react";
import {
  DropdownRoot,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownSearch,
} from "../../primitives/Dropdown/dom";
import { Button } from "../../primitives/Button/Button.dom"; // Assuming Button exists or we use standard button
import { DropdownMenuProps } from "./types";
import { Icon } from "../../primitives/Icon/Icon.dom";
import { cn } from "../../utils";

const DropdownMenu = ({
  items,
  triggerLabel,
  children,
  searchable = false,
  align = "end",
  label,
  labelVariant = "default",
}: DropdownMenuProps) => {
  const hasCustomTrigger = !!children;

  const triggerElement = (
    <DropdownTrigger asChild>
      {hasCustomTrigger ? (
        children
      ) : (
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between font-normal text-sm",
            labelVariant === "in-field" &&
              "h-auto border-none px-0 py-0 shadow-none ring-0 outline-none bg-transparent hover:bg-transparent hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0",
          )}
        >
          <span className="truncate">{triggerLabel || "Select..."}</span>
          <Icon name="ChevronDown" size={16} className="text-muted-foreground ml-2 opacity-50 shrink-0" />
        </Button>
      )}
    </DropdownTrigger>
  );

  const renderTriggerWrapper = () => {
    if (labelVariant === "in-field") {
      return (
        <div className="flex min-h-[48px] w-full items-center rounded-md border border-input bg-transparent px-3 py-1.5 shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2">
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            {label && (
              <label className="mb-0.5 w-full cursor-text text-[10px] font-semibold uppercase leading-none tracking-wider text-muted-foreground">
                {label}
              </label>
            )}
            {triggerElement}
          </div>
        </div>
      );
    }

    if (labelVariant === "inline") {
      return (
        <div className="flex w-full items-center gap-3">
          {label && (
            <label className="w-[120px] shrink-0 text-sm font-medium leading-none">
              {label}
            </label>
          )}
          <div className="flex-1">{triggerElement}</div>
        </div>
      );
    }

    if (labelVariant === "hidden") {
      return (
        <div className="w-full">
          {label && <label className="sr-only">{label}</label>}
          {triggerElement}
        </div>
      );
    }

    // Default
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label className="text-sm font-medium leading-none">{label}</label>
        )}
        {triggerElement}
      </div>
    );
  };

  return (
    <DropdownRoot>
      {renderTriggerWrapper()}

      <DropdownContent align={align}>
        {searchable && <DropdownSearch />}

        {items.map((item) => (
          <DropdownItem
            key={item.id}
            onClick={item.onSelect} // Radix uses onClick/onSelect
            disabled={item.disabled}
            shortcut={item.shortcut}
            textValue={item.label} // REQUIRED for search to work
            leadingVisual={item.leadingVisual}
            reserveLeadingSpace={item.reserveLeadingSpace}
          >
            {item.icon && <Icon name={item.icon} size={16} />}
            {item.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownRoot>
  );
};

export { DropdownMenu };
