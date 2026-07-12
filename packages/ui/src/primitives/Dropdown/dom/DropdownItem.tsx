"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import React from "react";
import { useTheme } from "@prime/theme-provider";
import { useDropdownContext } from "./DropdownRoot";
import {
  dropdownItemClassName,
  dropdownItemContentClassName,
} from "./styles.dom";

interface DropdownItemProps extends React.ComponentPropsWithoutRef<
  typeof DropdownMenuPrimitive.Item
> {
  shortcut?: string;
}

const DropdownItem = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Item>,
  DropdownItemProps
>(({ className, children, shortcut, style, ...props }, ref) => {
  // Removed useTheme
  const context = useDropdownContext();
  const searchQuery = context?.searchQuery?.toLowerCase() || "";

  // Filter logic: Check if children text content contains search query
  // This is a naive check. For robust search, we assume children is string or we might need a `textValue` prop.
  // Radix `Item` has `textValue` prop for typeahead, we can use that for validation if provided.
  // Ensure textContent matches what filter expects.
  // If children is complex (Icon + Text), simple string check fails.
  // Relying on `textValue` which Radix usually requires for typeahead anyway.
  const textContent =
    props.textValue || (typeof children === "string" ? children : "");

  if (
    searchQuery &&
    textContent &&
    !textContent.toLowerCase().includes(searchQuery)
  ) {
    return null;
  }

  return (
    <DropdownMenuPrimitive.Item
      ref={ref}
      style={style}
      // Added standard Tailwind data attributes for Radix UI focus/highlight state matching MenuBar styles
      className={`${dropdownItemClassName} ${className || ""}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowUp") {
          // Check if we are the first item
          const currentItem = e.currentTarget;
          const previousItem = currentItem.previousElementSibling;

          // If no previous item, or previous item is not a menu item (e.g. it's the search box wrapper which is a div),
          // then we should try to focus the search input.
          if (
            !previousItem ||
            previousItem.getAttribute("role") !== "menuitem"
          ) {
            // Look for the input in the parent container
            const parent = currentItem.parentElement;
            const input = parent?.querySelector("input");
            if (input) {
              e.preventDefault();
              input.focus();
            }
          }
        }
        props.onKeyDown?.(e);
      }}
      {...props}
    >
      {/* Group content (Icon + Label) to properly align left */}
      <span className={dropdownItemContentClassName}>{children}</span>

      {shortcut && (
        <span className="ml-auto text-xs opacity-60">{shortcut}</span>
      )}
    </DropdownMenuPrimitive.Item>
  );
});

DropdownItem.displayName = DropdownMenuPrimitive.Item.displayName;

export { DropdownItem };
