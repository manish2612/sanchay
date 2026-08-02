import React from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SegmentedControl,
  Switch,
  Icon,
} from "@prime/ui";
import { useVoucherPreferences } from "../hooks/useVoucherPreferences";

interface VoucherPreferencesSidebarProps {
  children: React.ReactNode;
}

export function VoucherPreferencesSidebar({
  children,
}: VoucherPreferencesSidebarProps) {
  const prefs = useVoucherPreferences();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle>Voucher Preferences</SheetTitle>
          <SheetDescription>
            Configure layout and behavioral settings for voucher entry.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6">
          {/* Apply Tax */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Apply Tax
            </label>
            <SegmentedControl.Root
              value={prefs.applyTax}
              onValueChange={(val: any) => prefs.setApplyTax(val)}
              size="sm"
            >
              <SegmentedControl.Item value="Item Level" label="Item Level" />
              <SegmentedControl.Item
                value="Invoice Level"
                label="Invoice Level"
              />
              <SegmentedControl.Item value="No Tax" label="No Tax" />
            </SegmentedControl.Root>
          </div>

          {/* Apply Mode */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-foreground">
              Apply Mode
            </label>
            <SegmentedControl.Root
              value={prefs.applyMode}
              onValueChange={(val: any) => prefs.setApplyMode(val)}
              size="sm"
            >
              <SegmentedControl.Item value="Item Mode" label="Item Mode" />
              <SegmentedControl.Item
                value="Account Mode"
                label="Account Mode"
              />
            </SegmentedControl.Root>
          </div>

          <div className="h-px bg-border mt-0 mb-5" />

          {/* Boolean Toggles */}
          <div className="space-y-1">
            <ToggleRow
              label="Enable negative stock control"
              checked={prefs.enableNegativeStock}
              onChange={prefs.setEnableNegativeStock}
            />
            <ToggleRow
              label="Enable tracking"
              checked={prefs.enableTracking}
              onChange={prefs.setEnableTracking}
            />
            <ToggleRow
              label="Enable dispatch details"
              checked={prefs.enableDispatchDetails}
              onChange={prefs.setEnableDispatchDetails}
            />
            <ToggleRow
              label="Enable export details"
              checked={prefs.enableExportDetails}
              onChange={prefs.setEnableExportDetails}
            />
            <ToggleRow
              label="Enable buyer & consignee details"
              checked={prefs.enableBuyerConsigneeDetails}
              onChange={prefs.setEnableBuyerConsigneeDetails}
            />
            <ToggleRow
              label="Enable Item description"
              checked={prefs.enableItemDescription}
              onChange={prefs.setEnableItemDescription}
            />
            <ToggleRow
              label="Enable ledger description"
              checked={prefs.enableLedgerDescription}
              onChange={prefs.setEnableLedgerDescription}
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function ToggleRow({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between p-2 py-2 -mx-2 rounded-md transition-colors hover:bg-surface-variant has-[:focus-visible]:bg-surface-variant">
      <label
        className="text-sm font-medium text-foreground cursor-pointer flex-1"
        onClick={() => onChange(!checked)}
      >
        {label}
      </label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}
