import React from "react";
import { type CellContext } from "@tanstack/react-table";
import { TextInput, SegmentedControl } from "@prime/ui";
import { useSmartDiscountCell } from "./useSmartDiscountCell";

export function SmartDiscountCell<TData>(context: CellContext<TData, unknown>) {
  const {
    mode,
    localValue,
    inputRef,
    error,
    setPercentMode,
    setAmountMode,
    handleChange,
    handleBlur,
  } = useSmartDiscountCell(context);

  return (
    <div className="w-full h-full flex items-center gap-1.5">
      {/* TextInput is FIRST in DOM so table nav auto-focuses it, but visually ordered LAST (right side) */}
      <TextInput
        ref={inputRef}
        value={localValue}
        onKeyDown={(e) => {
          // Block all invalid printable characters to prevent selection loss
          // We use a non-global regex here because RegExp.test() with /g is stateful!
          if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && /[^0-9.]/.test(e.key)) {
            e.preventDefault();
          }
        }}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        onFocus={(e) => {
          const target = e.target;
          if (target instanceof HTMLInputElement) {
            // Select immediately for keyboard nav
            target.select();
            // Select on next animation frame and after 10ms for mouse clicks to override native cursor placement
            requestAnimationFrame(() => {
              target.select();
              setTimeout(() => target.select(), 10);
            });
          }
        }}
        className={`order-2 flex-1 min-w-0 h-8 bg-surface transition-all ${
          error ? "ring-2 ring-destructive ring-offset-1" : ""
        }`}
        inputClassName="text-sm px-1.5 text-right h-full w-full"
        placeholder="0.00"
      />

      {/* Segmented Control is SECOND in DOM, but visually ordered FIRST (left side) */}
      <SegmentedControl.Root
        value={mode}
        onValueChange={(val) => {
          if (val === "PERCENT") setPercentMode();
          if (val === "AMOUNT") setAmountMode();
        }}
        size="xs"
        className="order-1 shrink-0 w-auto bg-surface border border-border/60 shadow-sm p-[3px] rounded-md"
      >
        <SegmentedControl.Item
          value="PERCENT"
          label="%"
          className="min-w-[24px] px-1.5 py-0.5 text-[11px] rounded-[4px] font-bold text-muted-foreground data-[state=checked]:text-primary-foreground"
        />
        <SegmentedControl.Item
          value="AMOUNT"
          label="#"
          className="min-w-[24px] px-1.5 py-0.5 text-[11px] rounded-[4px] font-bold text-muted-foreground data-[state=checked]:text-primary-foreground"
        />
      </SegmentedControl.Root>
    </div>
  );
}
