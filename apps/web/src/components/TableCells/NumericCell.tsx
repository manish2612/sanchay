import React, { useEffect, useState } from "react";
import { TextInput } from "@prime/ui";

export const NumericCell = ({ getValue, row, column, table }: any) => {
  const { inputConfig } = column.columnDef.meta || {};
  const {
    allowNegative = false,
    max,
    min,
    step,
    isInteger = false,
    type,
    disabled: disabledConfig,
    allowEmpty = false,
  } = inputConfig || {};
  const isDisabled = typeof disabledConfig === 'function' ? disabledConfig(row) : disabledConfig;

  const meta = table.options.meta || {} as any;
  const rowError = meta?.state?.rowErrors?.[row.index] || meta?.rowErrors?.[row.index];
  const error = typeof rowError === 'object' && rowError !== null ? rowError[column.id] : rowError;
  const errorMessage = typeof error === 'string' ? error : error?.message;
  const updateData = meta?.actions?.updateData;
  const onRowCommit = meta?.actions?.onRowCommit;

  const initialValue = getValue();
  const replaceRegex = isInteger
    ? (allowNegative ? /[^0-9-]/g : /[^0-9]/g)
    : (allowNegative ? /[^0-9.-]/g : /[^0-9.]/g);

  const defaultValue = isInteger ? "0" : "0.00";

  const formatValue = (val: string) => {
    if (!val || val.trim() === "") return allowEmpty ? "" : defaultValue;
    if (isInteger) {
      const intPart = val.split('.')[0];
      const intVal = parseInt(intPart.replace(replaceRegex, ""), 10);
      if (isNaN(intVal)) return allowEmpty ? "" : defaultValue;
      return intVal.toString();
    }
    const numeric = parseFloat(val.replace(replaceRegex, ""));
    if (isNaN(numeric)) return allowEmpty ? "" : defaultValue;
    return numeric.toFixed(2);
  };

  const getInitialDisplay = (v: any) => {
    if (allowEmpty && (v === undefined || v === null || v === "")) return "";
    if (v === "" || v === undefined || v === null) return defaultValue;
    if (isInteger) {
      const intPart = String(v).split('.')[0];
      const num = parseInt(intPart.replace(replaceRegex, ""), 10);
      return isNaN(num) ? defaultValue : num.toString();
    }
    return String(v);
  };

  const [value, setValue] = useState(() => getInitialDisplay(initialValue));

  useEffect(() => {
    setValue(getInitialDisplay(initialValue));
  }, [initialValue, allowEmpty, isInteger]);

  const onBlur = () => {
    const formatted = formatValue(value);
    setValue(formatted);
    updateData?.(row.index, column.id, formatted);
  };

  return (
    <TextInput
      type={type || "text"}
      max={max}
      min={min}
      step={step}
      disabled={isDisabled}
      value={value}
      title={errorMessage || undefined}
      onKeyDown={(e) => {
        // Block all invalid printable characters to prevent selection loss
        // We use a non-global regex here because RegExp.test() with /g is stateful!
        const testRegex = isInteger
          ? (allowNegative ? /[^0-9-]/ : /[^0-9]/)
          : (allowNegative ? /[^0-9.-]/ : /[^0-9.]/);
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && testRegex.test(e.key)) {
          e.preventDefault();
        }
      }}
      onChange={(e) => {
        const val = e.target.value.replace(replaceRegex, "");
        setValue(val);
        updateData?.(row.index, column.id, val);
      }}
      onBlur={onBlur}
      variant={error ? "error" : "default"}
      className={`h-8 w-full my-auto bg-surface transition-all px-2 ${
        error ? "ring-2 ring-danger ring-offset-0" : ""
      }`}
      inputClassName="text-sm px-0 text-right h-full"
    />
  );
};
