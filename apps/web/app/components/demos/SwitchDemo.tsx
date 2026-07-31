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
            <div className="flex items-center space-x-2">
              <Switch 
                id="switch-sm" 
                size="sm" 
                checked={checkedSm}
                onCheckedChange={setCheckedSm}
              />
              <label htmlFor="switch-sm" className="text-sm cursor-pointer select-none">Small (sm)</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="switch-default" 
                size="default" 
                checked={checkedDefault}
                onCheckedChange={setCheckedDefault}
              />
              <label htmlFor="switch-default" className="text-sm cursor-pointer select-none">Default</label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch 
                id="switch-lg" 
                size="lg" 
                checked={checkedLg}
                onCheckedChange={setCheckedLg}
              />
              <label htmlFor="switch-lg" className="text-sm cursor-pointer select-none">Large (lg)</label>
            </div>
          </div>
        </div>

        {/* States */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            States (Disabled)
          </span>
          <div className="flex items-center flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Switch id="switch-disabled-off" disabled />
              <label htmlFor="switch-disabled-off" className="text-sm opacity-50 cursor-not-allowed select-none">Disabled Off</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="switch-disabled-on" 
                disabled 
                checked={checkedDisabled}
                onCheckedChange={setCheckedDisabled}
              />
              <label htmlFor="switch-disabled-on" className="text-sm opacity-50 cursor-not-allowed select-none">Disabled On</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
