"use client";

import * as React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
} from "../Modal";
import { TextInput } from "../TextInput";
import { Icon } from "../Icon/Icon.dom"; // Correct import path
import { ShortcutCheatSheetProps } from "./types";
import { cn } from "../../../utils";

export const ShortcutCheatSheet = ({
  open,
  onOpenChange,
  categories,
}: ShortcutCheatSheetProps) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredCategories = React.useMemo(() => {
    if (!searchQuery) return categories;

    const lowerQuery = searchQuery.toLowerCase();

    return categories
      .map((category) => {
        // If category title matches, match ALL items in that category
        // (Requirement: "filter list by group title or shortcut label")
        // Interpretation: Checks if category title contains query.
        const categoryTitleMatches = category.title
          .toLowerCase()
          .includes(lowerQuery);

        if (categoryTitleMatches) {
          return category;
        }

        // otherwise filter items
        const filteredItems = category.items.filter((item) =>
          item.label.toLowerCase().includes(lowerQuery)
        );

        return {
          ...category,
          items: filteredItems,
        };
      })
      .filter((category) => category.items.length > 0);
  }, [categories, searchQuery]);

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
        <ModalHeader>
          <ModalTitle>Keyboard Shortcuts</ModalTitle>
          <ModalDescription>
            List of available keyboard shortcuts.
          </ModalDescription>
        </ModalHeader>

        <div className="px-1 mt-4">
          <TextInput.Root>
            <TextInput.Slot side="left">
              <Icon name="search" size={16} />
            </TextInput.Slot>
            <TextInput.Input
              placeholder="Search shortcuts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </TextInput.Root>
        </div>

        <div className="flex flex-col gap-6 mt-4">
          {filteredCategories.length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              No shortcuts found.
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.title} className="flex flex-col gap-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  {category.title}
                </h3>
                <div className="flex flex-col">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-row items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <span className="text-sm text-foreground">
                        {item.label}
                      </span>
                      <div className="flex flex-row gap-1">
                        {item.keys.map((key, index) => (
                          <kbd
                            key={`${item.id}-key-${index}`}
                            className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </ModalContent>
    </Modal>
  );
};

ShortcutCheatSheet.displayName = "ShortcutCheatSheet";
