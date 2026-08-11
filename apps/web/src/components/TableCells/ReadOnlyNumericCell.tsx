import React from "react";

export const ReadOnlyNumericCell = ({ getValue, column }: any) => {
  const initialValue = getValue() as string;

  const formatValue = (val: string) => {
    if (!val || val.trim() === "") return "0.00";
    const numeric = parseFloat(val.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numeric)) return "0.00";
    return numeric.toFixed(2);
  };

  const formatted = formatValue(initialValue);

  return (
    <div className="h-8 flex items-center justify-end px-2 text-sm text-foreground w-full truncate">
      {formatted}
    </div>
  );
};
