"use client";

import React, { useState } from "react";
import { AutoSuggest } from "@sanchay/ui";

const US_STATES = [
  { value: "ca", label: "California" },
  { value: "tx", label: "Texas" },
  { value: "ny", label: "New York" },
  { value: "fl", label: "Florida" },
  { value: "il", label: "Illinois" },
  { value: "pa", label: "Pennsylvania" },
  { value: "oh", label: "Ohio" },
  { value: "ga", label: "Georgia" },
  { value: "nc", label: "North Carolina" },
  { value: "mi", label: "Michigan" },
];

const GROUPED_STATES = [
  {
    group: "West Coast",
    items: [
      { value: "ca", label: "California" },
      { value: "wa", label: "Washington" },
      { value: "or", label: "Oregon" },
    ],
  },
  {
    group: "East Coast",
    items: [
      { value: "ny", label: "New York" },
      { value: "fl", label: "Florida" },
      { value: "pa", label: "Pennsylvania" },
    ],
  },
  {
    group: "Midwest",
    items: [
      { value: "il", label: "Illinois" },
      { value: "oh", label: "Ohio" },
      { value: "mi", label: "Michigan" },
    ],
  },
];

export function AutoSuggestDemo() {
  const [value, setValue] = useState("");
  const [dynamicValue, setDynamicValue] = useState("");
  const [groupedValue, setGroupedValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(US_STATES);

  // Generate 10,000 items for virtualization demo
  const VIRTUAL_ITEMS = React.useMemo(() => {
    return Array.from({ length: 10000 }).map((_, i) => ({
      value: `item-${i}`,
      label: `Inventory Item #${i + 1}`,
    }));
  }, []);
  const [virtualValue, setVirtualValue] = useState("");

  const handleDynamicSearch = (search: string) => {
    setInputValue(search);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (!search) {
        setOptions(US_STATES);
      } else {
        const filtered = US_STATES.filter((state) =>
          state.label.toLowerCase().includes(search.toLowerCase()),
        );
        setOptions(filtered);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="flex flex-col gap-4 p-6 border rounded-lg border-border bg-surface">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground mb-1">
          AutoSuggest
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Typeahead component that looks like a standard input but provides a
          searchable dropdown. Fully keyboard accessible.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Multi-Select (Phase 5)
          </label>
          <AutoSuggest
            options={US_STATES}
            value={multiValue}
            onChange={setMultiValue}
            placeholder="Select multiple states..."
            multiple
            clearable
          />
          {multiValue.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Selected: {multiValue.join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Virtualization (10,000 items) (Phase 4)
          </label>
          <AutoSuggest
            options={VIRTUAL_ITEMS}
            value={virtualValue}
            onChange={setVirtualValue}
            placeholder="Search massive inventory..."
            virtualized
          />
          {virtualValue && (
            <p className="text-xs text-muted-foreground">
              Selected: {virtualValue}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Static Options (Uncontrolled Input)
          </label>
          <AutoSuggest
            options={US_STATES}
            value={value}
            onChange={setValue}
            placeholder="Search US states..."
            clearable
          />
          {value && (
            <p className="text-xs text-muted-foreground">Selected: {value}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Grouped Options (Phase 2)
          </label>
          <AutoSuggest
            options={GROUPED_STATES}
            value={groupedValue}
            onChange={setGroupedValue}
            placeholder="Search states by region..."
          />
          {groupedValue && (
            <p className="text-xs text-muted-foreground">
              Selected: {groupedValue}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Dynamic API Search (Controlled Input)
          </label>
          <AutoSuggest
            options={options}
            value={dynamicValue}
            onChange={setDynamicValue}
            inputValue={inputValue}
            onInputChange={handleDynamicSearch}
            isLoading={isLoading}
            placeholder="Type to search (simulated 500ms delay)..."
            emptyMessage="No matching states found."
          />
          {dynamicValue && (
            <p className="text-xs text-muted-foreground">
              Selected: {dynamicValue}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Custom Item Rendering
          </label>
          <AutoSuggest
            options={US_STATES}
            placeholder="Search with custom items..."
            renderItem={(option) => (
              <div className="flex flex-col w-full">
                <span className="font-semibold text-primary">
                  {option.label}
                </span>
                <span className="text-xs text-muted-foreground uppercase">
                  {option.value}
                </span>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Creatable Option (Phase 1)
          </label>
          <AutoSuggest
            options={US_STATES}
            placeholder="Search or create state..."
            creatable
            onCreate={(val) => alert(`Creating new state: ${val}`)}
            createLabel="Add '{query}'"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Disabled State
          </label>

          <AutoSuggest
            options={US_STATES}
            placeholder="Search disabled..."
            disabled
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Error State
          </label>
          <AutoSuggest options={US_STATES} placeholder="Error state..." error />
        </div>
      </div>
    </div>
  );
}
