"use client";
import React from "react";

export function FontDemo() {
  return (
    <div className="p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading">
        Font Demo:
      </strong>

      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-bold text-gray-500 mb-2 font-heading">
            IBM Plex Sans (Body)
          </div>
          <div className="space-y-1 text-foreground text-base">
            <div className="font-body font-light">Light 300</div>
            <div className="font-body font-light italic">Light Italic 300</div>
            <div className="font-body font-normal">Regular 400</div>
            <div className="font-body font-normal italic">
              Regular Italic 400
            </div>
            <div className="font-body font-medium">Medium 500</div>
            <div className="font-body font-medium italic">
              Medium Italic 500
            </div>
          </div>
        </div>

        <div>
          <div className="text-[11px] font-bold text-foreground mb-2 font-heading">
            Work Sans (Heading)
          </div>
          <div className="space-y-1 text-foreground text-base">
            <div className="font-heading font-normal">Regular 400</div>
            <div className="font-heading font-medium">Medium 500</div>
            <div className="font-heading font-semibold">SemiBold 600</div>
            <div className="font-heading font-bold">Bold 700</div>
          </div>
        </div>
      </div>
    </div>
  );
}
