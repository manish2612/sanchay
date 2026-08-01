"use client";
import React, { useState } from "react";
import { Switch } from "@prime/ui";

export function SwitchDemo() {
  const [checkedSm, setCheckedSm] = useState(false);
  const [checkedDefault, setCheckedDefault] = useState(true);
  const [checkedLg, setCheckedLg] = useState(false);
  const [checkedDisabled, setCheckedDisabled] = useState(true);

  return (
    <div className="p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        Switch Examples:
      </strong>

      <div className="space-y-6">
        {/* Sizes */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Sizes (Scaling with Density)
          </span>
          <div className="flex items-center flex-wrap gap-6">
            <Switch 
              id="switch-sm" 
              size="sm" 
              label="Small (sm)"
              checked={checkedSm}
              onCheckedChange={setCheckedSm}
            />
            
            <Switch 
              id="switch-default" 
              size="default" 
              label="Default"
              checked={checkedDefault}
              onCheckedChange={setCheckedDefault}
            />

            <Switch 
              id="switch-lg" 
              size="lg" 
              label="Large (lg)"
              checked={checkedLg}
              onCheckedChange={setCheckedLg}
            />
          </div>
        </div>

        {/* Label Variants */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Label Variants
          </span>
          <div className="flex flex-col gap-6">
            <Switch 
              id="switch-label-default" 
              labelVariant="default"
              label="Default (Stacked) Label"
              checked={checkedDefault}
              onCheckedChange={setCheckedDefault}
            />
            
            <Switch 
              id="switch-label-inline" 
              labelVariant="inline"
              labelPosition="right"
              label="Right Label (Forms)"
              checked={checkedDefault}
              onCheckedChange={setCheckedDefault}
            />

            <Switch 
              id="switch-label-left" 
              labelVariant="inline"
              labelPosition="left"
              label="Left Label (Settings)"
              checked={checkedDefault}
              onCheckedChange={setCheckedDefault}
            />

            <Switch 
              id="switch-label-hidden" 
              labelVariant="hidden"
              label="Hidden Screen Reader Label"
              checked={checkedDefault}
              onCheckedChange={setCheckedDefault}
            />
          </div>
        </div>

        {/* States */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            States (Disabled)
          </span>
          <div className="flex items-center flex-wrap gap-6">
            <Switch id="switch-disabled-off" disabled label="Disabled Off" />
            
            <Switch 
              id="switch-disabled-on" 
              disabled 
              label="Disabled On"
              checked={checkedDisabled}
              onCheckedChange={setCheckedDisabled}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
