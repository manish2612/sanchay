import { useState, useEffect, useRef, useCallback } from "react";
import { type CellContext } from "@tanstack/react-table";

export type DiscountMode = "PERCENT" | "AMOUNT";

export function useSmartDiscountCell<TData>(context: CellContext<TData, unknown>) {
  const { row, table } = context;
  const original = row.original as any;
  const rowIndex = row.index;
  const { state, actions } = table.options.meta || {};
  const { updateData } = actions || {};
  const error = state?.rowErrors?.[rowIndex];

  const getExternalMode = useCallback((): DiscountMode => {
    return original.discAmt && !original.discPer ? "AMOUNT" : "PERCENT";
  }, [original.discAmt, original.discPer]);

  const getInitialValue = (mode: DiscountMode) => {
    const val = mode === "PERCENT" ? original.discPer : original.discAmt;
    return !val || val === "" ? "0.00" : val;
  };

  const [mode, setMode] = useState<DiscountMode>(getExternalMode());
  
  const [localValue, setLocalValue] = useState<string>(() => getInitialValue(mode));

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const extMode = getExternalMode();
    setMode(extMode);
    setLocalValue(getInitialValue(extMode));
  }, [getExternalMode, original.discPer, original.discAmt]);

  const commitValue = useCallback((val: string, newMode: DiscountMode) => {
    const numericStr = val.replace(/[^0-9.]/g, "");
    
    setLocalValue(numericStr);
    setMode(newMode);

    if (updateData) {
      if (newMode === "PERCENT") {
        updateData(rowIndex, "discPer", numericStr);
        updateData(rowIndex, "discAmt", "");
      } else {
        updateData(rowIndex, "discAmt", numericStr);
        updateData(rowIndex, "discPer", "");
      }
    }
  }, [updateData, rowIndex]);

  const setPercentMode = useCallback(() => {
    commitValue(localValue, "PERCENT");
  }, [commitValue, localValue]);

  const setAmountMode = useCallback(() => {
    commitValue(localValue, "AMOUNT");
  }, [commitValue, localValue]);

  const handleChange = useCallback((val: string) => {
    if (val.endsWith("%")) {
      commitValue(val.replace("%", ""), "PERCENT");
      return;
    }
    
    if (val.endsWith("₹") || val.toLowerCase().endsWith("v") || val.endsWith("$") || val.endsWith("#")) {
      commitValue(val.replace(/[₹$vV#]/g, ""), "AMOUNT");
      return;
    }

    setLocalValue(val);
  }, [commitValue]);

  const handleBlur = useCallback(() => {
    let formatted = localValue;
    if (localValue && localValue.trim() !== "") {
      const numeric = parseFloat(localValue.replace(/[^0-9.-]+/g, ""));
      if (!isNaN(numeric)) {
        formatted = numeric.toFixed(2);
      } else {
        formatted = "0.00";
      }
    } else {
      formatted = "0.00";
    }
    commitValue(formatted, mode);
  }, [commitValue, localValue, mode]);



  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Block all invalid printable characters to prevent selection loss
    if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && /[^0-9.]/.test(e.key)) {
      e.preventDefault();
    }
  }, []);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    const target = e.target;
    // Select immediately for keyboard nav
    target.select();
    // Select on next animation frame and after 10ms for mouse clicks to override native cursor placement
    requestAnimationFrame(() => {
      target.select();
      setTimeout(() => target.select(), 10);
    });
  }, []);

  return {
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
  };
}
