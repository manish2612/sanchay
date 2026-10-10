import React, { useEffect, useState } from "react";
import { TextInput } from "@prime/ui";

export const TextCell = ({ getValue, row, column, table }: any) => {
  const { inputConfig } = column.columnDef.meta || {};
  const { maxLength } = inputConfig || {};
  const meta = table.options.meta || {} as any;
  const rowError = meta?.state?.rowErrors?.[row.index] || meta?.rowErrors?.[row.index];
  const error = typeof rowError === 'object' && rowError !== null ? rowError[column.id] : rowError;
  const updateData = meta?.actions?.updateData;

  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    updateData?.(row.index, column.id, value);
  };

  return (
    <TextInput
      maxLength={maxLength}
      variant={error ? "error" : "default"}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        updateData?.(row.index, column.id, e.target.value);
      }}
      onBlur={onBlur}
      className={`h-8 w-full my-auto bg-transparent border-0 focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0 transition-all px-2 ${
        error ? "ring-2 ring-danger ring-offset-0" : ""
      }`}
      inputClassName="text-sm px-0 h-full"
    />
  );
};
