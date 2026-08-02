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
    handleKeyDown,
    handleFocus,
  } = useSmartDiscountCell(context);

  return (
    <div className="w-full h-full flex items-center gap-1.5">
      {/* TextInput is FIRST in DOM to match visual layout for correct Tab order */}
      <TextInput
        ref={inputRef}
        value={localValue}
        onKeyDown={handleKeyDown}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        className={`flex-1 min-w-0 h-8 bg-surface transition-all ${
          error ? "ring-2 ring-destructive ring-offset-1" : ""
        } px-2`}
        inputClassName="text-sm text-right h-full w-full"
        placeholder="0.00"
      />

      {/* Segmented Control is SECOND in DOM. */}
      <SegmentedControl.Root
        value={mode}
        onValueChange={(val) => {
          if (val === "PERCENT") setPercentMode();
          if (val === "AMOUNT") setAmountMode();
        }}
        size="xs"
        className="shrink-0 w-auto bg-surface border border-border/60 shadow-sm p-[3px] rounded-md"
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
