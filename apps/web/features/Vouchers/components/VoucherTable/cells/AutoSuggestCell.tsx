import React, { useEffect, useState } from "react";
import { AutoSuggest } from "@prime/ui";

export const AutoSuggestCell = ({ getValue, row, column, table }: any) => {
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      table.options.meta?.onRowCommit?.(row.index, column.id, value);
    }
  };
  const MOCK_ITEMS = [
    { label: "MacBook Pro 16", value: "MacBook Pro 16" },
    { label: "iPhone 15 Pro", value: "iPhone 15 Pro" },
    { label: "Magic Keyboard", value: "Magic Keyboard" },
    { label: "AirPods Pro", value: "AirPods Pro" },
    { label: "iPad Air", value: "iPad Air" },
  ];

  const filteredOptions = MOCK_ITEMS.filter((item) =>
    item.label.toLowerCase().includes((value || "").toLowerCase())
  );

  return (
    <AutoSuggest
      inputValue={value}
      onInputChange={(val) => {
        setValue(val);
        if (table.options.meta?.updateData) {
          table.options.meta.updateData(row.index, column.id, val);
        }
      }}
      options={filteredOptions}
      creatable
      onCreate={(val) => {
        setValue(val);
        if (table.options.meta?.updateData) {
          table.options.meta.updateData(row.index, column.id, val);
        }
      }}
    >
      <AutoSuggest.Input
        placeholder="Search item..."
        className={`h-8 !min-h-8 !py-0 w-full my-auto bg-surface transition-all ${
          error ? "ring-2 ring-destructive ring-offset-1" : ""
        }`}
        inputClassName="text-sm h-full px-1"
        onBlur={onBlur}
        onKeyDown={handleKeyDown}
      />
      <AutoSuggest.Content>
        <AutoSuggest.List>
          <AutoSuggest.Empty>No items found.</AutoSuggest.Empty>
          {filteredOptions.map((opt) => (
            <AutoSuggest.Item key={opt.value} value={opt.value}>
              {opt.label}
            </AutoSuggest.Item>
          ))}
          <AutoSuggest.CreateItem createLabel="Create new item" />
        </AutoSuggest.List>
      </AutoSuggest.Content>
    </AutoSuggest>
  );
};
