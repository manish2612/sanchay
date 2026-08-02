import React, { useEffect, useState } from "react";
import { TextInput } from "@prime/ui";

export const NumericCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue() as string;

  const allowNegative = (column.columnDef.meta as any)?.allowNegative ?? false;
  const regex = allowNegative ? /[^0-9.-]/g : /[^0-9.]/g;

  const formatValue = (val: string) => {
    if (!val || val.trim() === "") return "0.00";
    const numeric = parseFloat(val.replace(regex, ""));
    if (isNaN(numeric)) return "0.00";
    return numeric.toFixed(2);
  };

  const [value, setValue] = useState(() => {
    return initialValue === "" ? "0.00" : initialValue;
  });

  const error = table.options.meta?.rowErrors?.[row.index];

  useEffect(() => {
    setValue(initialValue === "" ? "0.00" : initialValue);
  }, [initialValue]);

  const onBlur = () => {
    const formatted = formatValue(value);
    setValue(formatted);
    if (table.options.meta?.updateData) {
      table.options.meta.updateData(row.index, column.id, formatted);
    }
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
        if (table.options.meta?.updateData) {
          table.options.meta.updateData(row.index, column.id, val);
        }
      }}
      onBlur={onBlur}
      className={`h-8 w-full my-auto bg-surface transition-all px-2 ${
        error ? "ring-2 ring-destructive ring-offset-1" : ""
      }`}
      inputClassName="text-sm px-0 text-right h-full"
    />
  );
};
