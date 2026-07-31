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

const DropdownMenu = ({
  items,
  triggerLabel,
  children,
  searchable = false,
  align = "end",
}: DropdownMenuProps) => {
  return (
    <DropdownRoot>
      <DropdownTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline">
            {triggerLabel || "Open Menu"}
            <Icon name="ChevronDown" />
          </Button>
        )}
      </DropdownTrigger>

      <DropdownContent align={align}>
        {searchable && <DropdownSearch />}

        {items.map((item) => (
          <DropdownItem
            key={item.id}
            onClick={item.onSelect} // Radix uses onClick/onSelect
            disabled={item.disabled}
            shortcut={item.shortcut}
            textValue={item.label} // REQUIRED for search to work
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
