import React, { useEffect, useState } from "react";
import { DatePicker } from "@prime/ui";

export const DateCell = ({ getValue, row, column, table }: any) => {
  const meta = table.options.meta || {} as any;
  const updateData = meta?.updateData;
  const error = meta?.rowErrors?.[row.index];

  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <DatePicker 
      date={value} 
      onDateChange={(date) => {
        setValue(date);
        updateData?.(row.index, column.id, date);
      }} 
      labelVariant="hidden"
      calendarType="nepali"
      nepaliLanguage="english"
      className={`h-8 w-full my-auto bg-surface transition-all px-2 py-0 ${
        error ? "ring-2 ring-destructive ring-offset-1" : ""
      }`}
    />
  );
};
