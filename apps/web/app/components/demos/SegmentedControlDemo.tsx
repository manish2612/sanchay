"use client";
import React from "react";
import { SegmentedControl } from "@prime/ui";

export function SegmentedControlDemo() {
  const [value, setValue] = React.useState("rooms");

  return (
    <div className="p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        Segmented Control:
      </strong>

      <div className="space-y-6">
        {/* Default Size */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block">
            Default Size (Comfortable)
          </span>
          <SegmentedControl.Root value={value} onValueChange={setValue}>
            <SegmentedControl.Item value="details" label="Details" />
            <SegmentedControl.Item value="rooms" label="Rooms" />
            <SegmentedControl.Item value="photos" label="Photos" />
          </SegmentedControl.Root>
        </div>

        {/* Small Size */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block">
            Small Size (Compact)
          </span>
          <SegmentedControl.Root defaultValue="1" size="sm">
            <SegmentedControl.Item value="1" label="One" />
            <SegmentedControl.Item value="2" label="Two" />
            <SegmentedControl.Item value="3" label="Three" />
          </SegmentedControl.Root>
        </div>

        {/* Extra Small Size */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block">
            Extra Small Size
          </span>
          <SegmentedControl.Root defaultValue="yes" size="xs">
            <SegmentedControl.Item value="yes" label="Yes" />
            <SegmentedControl.Item value="no" label="No" />
          </SegmentedControl.Root>
        </div>

        {/* Small Symbol Variant */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block">
            Small Symbol Variant (Custom Border Radius)
          </span>
          <div className="flex items-center gap-2">
            <input
              type="text"
              defaultValue="0.00"
              className="w-24 h-8 px-2 text-right border border-input rounded-md text-sm shadow-sm"
              disabled
            />
            <div className="w-[60px]">
              <SegmentedControl.Root
                defaultValue="%"
                size="xs"
                className="rounded-md p-0.5"
              >
                {/* Set the strict width on the items instead */}
                <SegmentedControl.Item
                  value="%"
                  label="%"
                  className="w-4 rounded-sm font-bold"
                />
                <SegmentedControl.Item
                  value="#"
                  label="#"
                  className="w-4 rounded-sm font-bold"
                />
              </SegmentedControl.Root>
            </div>
          </div>
        </div>

        {/* Two Options (Manual Activation Mode) */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block">
            Two Options (Manual Activation Mode)
          </span>
          <p className="text-xs text-muted-foreground mb-2">
            With 2 options, activationMode defaults to 'manual' (arrow keys move
            focus, Space/Enter selects).
          </p>
          <SegmentedControl.Root defaultValue="apple">
            <SegmentedControl.Item value="apple" label="Apple" />
            <SegmentedControl.Item value="banana" label="Banana" />
          </SegmentedControl.Root>
        </div>

        {/* Custom Styling */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70 block">
            Custom Styling (Ghost Variant)
          </span>
          <SegmentedControl.Root defaultValue="grid" variant="ghost">
            <SegmentedControl.Item value="list" label="List View" />
            <SegmentedControl.Item value="grid" label="Grid View" />
          </SegmentedControl.Root>
        </div>
      </div>
    </div>
  );
}
