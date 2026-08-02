import { useState, useEffect, useRef, useCallback } from "react";
import { type CellContext } from "@tanstack/react-table";

export type DiscountMode = "PERCENT" | "AMOUNT";

export function useSmartDiscountCell<TData>(context: CellContext<TData, unknown>) {
  const { row, table } = context;
  const original = row.original as any;
  const rowIndex = row.index;
  const updateData = (table.options.meta as any)?.updateData;

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

  const error = (table.options.meta as any)?.rowErrors?.[rowIndex];

  return {
    mode,
    localValue,
    inputRef,
    error,
    setPercentMode,
    setAmountMode,
    handleChange,
    handleBlur,
  };
}
