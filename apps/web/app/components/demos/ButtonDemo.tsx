"use client";
import React from "react";
import { Button, Icon } from "@prime/ui";

export function ButtonDemo() {
  return (
    <div className="p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        Button Examples:
      </strong>

      <div className="space-y-4">
        {/* Variants */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Variants
          </span>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>

        {/* Sizes */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Sizes
          </span>
          <div className="flex items-center flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" variant="outline">
              <Icon name="Plus" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
