import React, { useEffect, useState } from "react";
import { TextInput } from "@prime/ui";

export const TextCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);
  const error = table.options.meta?.rowErrors?.[row.index];

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    if (table.options.meta?.updateData) {
      table.options.meta.updateData(row.index, column.id, value);
    }
  };

  return (
    <TextInput
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        if (table.options.meta?.updateData) {
          table.options.meta.updateData(row.index, column.id, e.target.value);
        }
      }}
      onBlur={onBlur}
      className={`h-8 w-full my-auto bg-surface transition-all px-2 ${
        error ? "ring-2 ring-destructive ring-offset-1" : ""
      }`}
      inputClassName="text-sm px-0 h-full"
    />
  );
};
