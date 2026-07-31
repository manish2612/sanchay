"use client";

import React, { useEffect, useRef } from "react";
import { useDropdownContext } from "./DropdownRoot";
import { TextInput } from "../../TextInput/TextInput.dom";
import { Icon } from "../../Icon/Icon.dom";
import {
  dropdownSearchClassName,
  dropdownSearchContainerClassName,
} from "./styles.dom";

interface DropdownSearchProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const DropdownSearch = React.forwardRef<HTMLInputElement, DropdownSearchProps>(
  ({ style, className, ...props }, ref) => {
    const context = useDropdownContext();
    // Removed useTheme

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      context?.setSearchQuery(e.target.value);
      props.onChange?.(e);
    };

    return (
      <div className={dropdownSearchContainerClassName} style={style}>
        <TextInput.Root className={dropdownSearchClassName}>
          <TextInput.Slot side="left">
            <Icon name="Search" size={16} className="text-muted-foreground" />
          </TextInput.Slot>
          <TextInput.Input
            ref={ref}
            placeholder="Search..."
            value={context?.searchQuery}
            className="rounded-none"
            onChange={handleChange}
            autoFocus
            onKeyDown={(e) => {
              // Fix for Keyboard Navigation:
              // Manually handle moving focus from Input to the first Menu Item.
              // Radix might not automatically transition from a non-Item input to the list.
              if (e.key === "ArrowDown") {
                e.preventDefault();
                const content = e.currentTarget.closest('[role="menu"]');
                if (content) {
                  const items = content.querySelectorAll(
                    '[role="menuitem"]:not([aria-disabled="true"])'
                  );
                  if (items.length > 0) {
                    (items[0] as HTMLElement).focus();
                  }
                }
                return;
              }

              if (e.key === "ArrowUp") {
                // Usually nothing to do if at top, but preventing default avoids cursor move
                e.preventDefault();
                return;
              }

              // Allow Enter/Escape for selection/closing
              if (e.key === "Enter" || e.key === "Escape") {
                return;
              }

              // Stop propagation for other keys (typing) so they don't trigger Radix mnemonics
              e.stopPropagation();
            }}
            {...props}
          />
        </TextInput.Root>
      </div>
    );
  }
);

DropdownSearch.displayName = "DropdownSearch";

export { DropdownSearch };
