"use client";
import React from "react";
import { TextInput, Icon } from "@sanchay/ui";

export function TextInputDemo() {
  return (
    <div className="p-5 bg-background rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        TextInput Examples:
      </strong>

      <div className="space-y-4 max-w-sm">
        {/* Default */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Default
          </span>
          <TextInput.Root>
            <TextInput.Input placeholder="Enter text..." />
          </TextInput.Root>
        </div>

        {/* With Icons */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            With Icons
          </span>
          <TextInput.Root>
            <TextInput.Slot side="left">
              <Icon name="search" size={18} />
            </TextInput.Slot>
            <TextInput.Input placeholder="Search..." />
          </TextInput.Root>
        </div>

        <div className="space-y-1">
          <TextInput.Root>
            <TextInput.Input placeholder="Email address" />
            <TextInput.Slot side="right">
              <Icon name="mail" size={18} />
            </TextInput.Slot>
          </TextInput.Root>
        </div>

        {/* States */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Error State
          </span>
          <TextInput.Root variant="error">
            <TextInput.Slot side="left">
              <Icon name="error" size={18} />
            </TextInput.Slot>
            <TextInput.Input placeholder="Invalid input" />
          </TextInput.Root>
        </div>

        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Disabled
          </span>
          <TextInput.Root disabled>
            <TextInput.Input placeholder="Disabled" disabled />
          </TextInput.Root>
        </div>
      </div>
    </div>
  );
}
