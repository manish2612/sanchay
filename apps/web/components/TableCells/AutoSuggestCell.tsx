import React, { useEffect, useState } from "react";
import { AutoSuggest } from "@prime/ui";

export const AutoSuggestCell = ({ getValue, row, column, table }: any) => {
  const { inputConfig } = column.columnDef.meta || {};
  const { placeholder = "Search item..." } = inputConfig || {};

  const { state, actions } = table.options.meta || {};
  const error = state?.rowErrors?.[row.index];
  const { updateData, onRowCommit } = actions || {};

  const initialValue = getValue() as string;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    updateData?.(row.index, column.id, value);
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
        updateData?.(row.index, column.id, val);
      }}
      options={filteredOptions}
      creatable
      onCreate={(val) => {
        setValue(val);
        updateData?.(row.index, column.id, val);
      }}
    >
      <AutoSuggest.Input
        placeholder={placeholder}
        className={`h-8 !min-h-8 !py-0 w-full my-auto bg-surface transition-all ${
          error ? "ring-2 ring-destructive ring-offset-1" : ""
        }`}
        inputClassName="text-sm h-full px-1"
        onBlur={onBlur}
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
