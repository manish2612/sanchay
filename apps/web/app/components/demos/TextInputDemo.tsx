"use client";
import React from "react";
import { TextInput, Icon } from "@prime/ui";

export function TextInputDemo() {
  return (
    <div className="p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        TextInput Examples:
      </strong>

      <div className="space-y-4 max-w-sm">
        {/* Default */}
        <div className="space-y-1">
          <TextInput label="Default Label" placeholder="Enter text..." />
          <TextInput
            className="my-4"
            label="In-field Label"
            placeholder="Enter text..."
            labelVariant="in-field"
          />
          <TextInput
            label="Inline Label"
            placeholder="Enter text..."
            labelVariant="inline"
          />
          <TextInput
            label="Hidden Label"
            placeholder="Enter text..."
            labelVariant="hidden"
          />
        </div>

        {/* With Icons & Variants */}
        <div className="space-y-1">
          <TextInput
            label="In-field with left icon"
            labelVariant="in-field"
            placeholder="Search..."
            leftSlot={<Icon name="Search" size={18} />}
          />
        </div>

        <div className="space-y-1">
          <TextInput
            label="Inline with right icon"
            labelVariant="inline"
            placeholder="Email address"
            rightSlot={<Icon name="Mail" size={18} />}
          />
        </div>

        {/* States */}
        <div className="space-y-1">
          <TextInput
            variant="error"
            placeholder="Invalid input"
            leftSlot={<Icon name="CircleAlert" size={18} />}
          />
        </div>

        <div className="space-y-1">
          <TextInput disabled placeholder="Disabled" />
        </div>
      </div>
    </div>
  );
}
