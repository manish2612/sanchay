import React from "react";
import { type CellContext } from "@tanstack/react-table";
import { TextInput } from "@prime/ui";
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
        className={`order-2 flex-1 min-w-0 h-8 bg-surface transition-all px-2 ${
          error ? "ring-2 ring-destructive ring-offset-1" : ""
        }`}
        inputClassName="text-sm text-right h-full w-full"
        placeholder="0.00"
      />

      {/* Segmented Control is SECOND in DOM, but visually ordered FIRST (left side) */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          mode === "PERCENT" ? setAmountMode() : setPercentMode();
        }}
        className="order-1 flex bg-surface p-0.5 rounded-md border border-primary/20 shadow-sm shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 hover:border-primary/40 transition-colors"
        aria-label="Toggle discount mode"
      >
        <div
          className={`px-1.5 py-0.5 text-[10px] font-medium rounded-sm transition-all flex items-center justify-center min-w-[20px] ${
            mode === "PERCENT"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-primary/70"
          }`}
        >
          %
        </div>
        <div
          className={`px-1.5 py-0.5 text-[10px] font-medium rounded-sm transition-all flex items-center justify-center min-w-[20px] ${
            mode === "AMOUNT"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-primary/70"
          }`}
        >
          #
        </div>
      </button>
    </div>
  );
}
