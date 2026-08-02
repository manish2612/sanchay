import React, { useEffect, useState } from "react";
import { TextInput } from "@prime/ui";

export const NumericCell = ({ getValue, row, column, table }: any) => {
  const { inputConfig } = column.columnDef.meta || {};
  const { allowNegative = false } = inputConfig || {};

  const { state, actions } = table.options.meta || {};
  const error = state?.rowErrors?.[row.index];
  const { updateData } = actions || {};

  const initialValue = getValue() as string;
  const regex = allowNegative ? /[^0-9.-]/ : /[^0-9.]/;

  const formatValue = (val: string) => {
    if (!val || val.trim() === "") return "0.00";
    const numeric = parseFloat(val.replace(regex, ""));
    if (isNaN(numeric)) return "0.00";
    return numeric.toFixed(2);
  };

  const [value, setValue] = useState(() => {
    return initialValue === "" ? "0.00" : initialValue;
  });

  useEffect(() => {
    setValue(initialValue === "" ? "0.00" : initialValue);
  }, [initialValue]);

  const onBlur = () => {
    const formatted = formatValue(value);
    setValue(formatted);
    updateData?.(row.index, column.id, formatted);
  };

  return (
    <TextInput
      value={value}
      onKeyDown={(e) => {
        // Block all invalid printable characters to prevent selection loss
        // We use a non-global regex here because RegExp.test() with /g is stateful!
        const testRegex = allowNegative ? /[^0-9.-]/ : /[^0-9.]/;
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && testRegex.test(e.key)) {
          e.preventDefault();
        }
      }}
      onChange={(e) => {
        const val = e.target.value.replace(regex, "");
        setValue(val);
        updateData?.(row.index, column.id, val);
      }}
      onBlur={onBlur}
      className={`h-8 w-full my-auto bg-surface transition-all px-2 ${
        error ? "ring-2 ring-destructive ring-offset-1" : ""
      }`}
      inputClassName="text-sm px-0 text-right h-full"
    />
  );
};
