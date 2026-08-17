import React, { useEffect, useState } from "react";
import { DatePicker } from "@prime/ui";

export const DateCell = ({ getValue, row, column, table }: any) => {
  const meta = table.options.meta || {} as any;
  const updateData = meta?.actions?.updateData;
  const error = meta?.state?.rowErrors?.[row.index] || meta?.rowErrors?.[row.index];

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
      className={`h-8 w-full my-auto bg-transparent border-0 focus-within:ring-1 focus-within:ring-primary focus-within:ring-offset-0 transition-all px-2 py-0 ${
        error ? "ring-2 ring-danger ring-offset-0" : ""
      }`}
    />
  );
};
