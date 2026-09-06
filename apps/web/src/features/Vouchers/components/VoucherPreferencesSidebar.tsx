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
  DropdownMenu,
  Button,
} from "@prime/ui";
import { useVoucherPreferences } from "../hooks/useVoucherPreferences";

interface VoucherPreferencesSidebarProps {
  children: React.ReactNode;
  prefs: ReturnType<typeof useVoucherPreferences>;
}

export function VoucherPreferencesSidebar({
  children,
  prefs,
}: VoucherPreferencesSidebarProps) {

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-md overflow-y-auto"
        overlayClassName="!bg-foreground/10 supports-[backdrop-filter]:!bg-foreground/10 supports-[backdrop-filter]:!backdrop-blur-none"
      >
        <SheetHeader className="mb-6">
          <SheetTitle>Voucher Preferences</SheetTitle>
          <SheetDescription>
            Configure layout and behavioral settings for voucher entry.
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-4">
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
            <DropdownMenu
              items={[
                { id: "Item Mode", label: "Item Mode", onSelect: () => prefs.setApplyMode("Item Mode") },
                { id: "Account Mode", label: "Account Mode", onSelect: () => prefs.setApplyMode("Account Mode") },
                { id: "Account Invoice", label: "Account Invoice", onSelect: () => prefs.setApplyMode("Account Invoice") },
              ]}
              align="start"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full justify-between font-semibold text-sm h-9"
              >
                <span className="truncate">{prefs.applyMode}</span>
                <Icon name="ChevronDown" size={14} className="opacity-70 ml-2 shrink-0" />
              </Button>
            </DropdownMenu>
          </div>

          <div className="h-px bg-border mt-0 mb-3 opacity-40" />

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
