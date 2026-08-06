"use client";

import React, { useState } from "react";
import { AutoSuggest, Switch } from "@prime/ui";

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

const COUNTRIES = [
  { value: "us", label: "United States", leadingVisual: "🇺🇸" },
  { value: "ca", label: "Canada", leadingVisual: "🇨🇦" },
  { value: "uk", label: "United Kingdom", leadingVisual: "🇬🇧" },
  { value: "fr", label: "France", leadingVisual: "🇫🇷" },
  { value: "de", label: "Germany", leadingVisual: "🇩🇪" },
  { value: "jp", label: "Japan", leadingVisual: "🇯🇵" },
  { value: "au", label: "Australia", leadingVisual: "🇦🇺" },
  { value: "unknown", label: "Unknown Territory", reserveLeadingSpace: true },
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

const CUSTOMERS = [
  { value: "cust_1", label: "Acme Corp", meta: { id: "C-10492", contact: "john@acme.com", status: "Active", balance: "$14,200.00" } },
  { value: "cust_2", label: "Globex Inc", meta: { id: "C-10493", contact: "sarah@globex.com", status: "Overdue", balance: "$45,000.00" } },
  { value: "cust_3", label: "Initech", meta: { id: "C-10494", contact: "bill@initech.com", status: "Active", balance: "$0.00" } },
  { value: "cust_4", label: "Umbrella Corp", meta: { id: "C-10495", contact: "alice@umbrella.com", status: "Suspended", balance: "$1,250,000.00" } },
];

export function AutoSuggestDemo() {
  const [value, setValue] = useState("");
  const [countryValue, setCountryValue] = useState("");
  const [dynamicValue, setDynamicValue] = useState("");
  const [groupedValue, setGroupedValue] = useState("");
  const [multiValue, setMultiValue] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState(US_STATES);
  const [showSelected, setShowSelected] = useState(true);

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
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground mb-4">
            Typeahead component that looks like a standard input but provides a
            searchable dropdown. Fully keyboard accessible.
          </p>
          <div className="flex flex-col items-end gap-1 mb-4">
            <Switch
              checked={showSelected}
              onCheckedChange={setShowSelected}
              label="Show Selected Value"
              labelVariant="inline"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <AutoSuggest
            options={US_STATES}
            value={multiValue}
            onChange={setMultiValue}
            multiple
          >
            <AutoSuggest.Input
              label="Multi-Select (Phase 5)"
              labelVariant="in-field"
              placeholder="Select multiple states..."
              clearable
            />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No results found.</AutoSuggest.Empty>
                {US_STATES.map((state) => (
                  <AutoSuggest.Item key={state.value} value={state.value}>
                    {state.label}
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
          {multiValue.length > 0 && (
            <p className="text-xs text-muted-foreground">
              Selected: {multiValue.join(", ")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Country Selection (with Leading Visuals)
          </label>
          <AutoSuggest
            options={COUNTRIES}
            value={countryValue}
            onChange={setCountryValue}
          >
            <AutoSuggest.Input
              placeholder="Search countries..."
              clearable
            />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No countries found.</AutoSuggest.Empty>
                {COUNTRIES.map((country) => (
                  <AutoSuggest.Item 
                    key={country.value} 
                    value={country.value}
                    leadingVisual={country.leadingVisual}
                    reserveLeadingSpace={country.reserveLeadingSpace ?? true}
                  >
                    {country.label}
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
          {countryValue && (
            <p className="text-xs text-muted-foreground">Selected: {countryValue}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <AutoSuggest
            options={VIRTUAL_ITEMS}
            value={virtualValue}
            onChange={setVirtualValue}
            virtualized
          >
            <AutoSuggest.Input
              label="Virtualization (10,000 items) (Phase 4)"
              labelVariant="inline"
              labelClassName="w-[200px]"
              placeholder="Search massive inventory..."
            />
            <AutoSuggest.Content>
              <AutoSuggest.VirtualizedList
                renderItem={(opt) => (
                  <AutoSuggest.Item value={opt.value}>
                    {opt.label}
                  </AutoSuggest.Item>
                )}
              />
            </AutoSuggest.Content>
          </AutoSuggest>
          {showSelected && virtualValue && (
            <p className="text-xs text-muted-foreground">
              Selected: {virtualValue}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <AutoSuggest
            options={US_STATES}
            value={value}
            onChange={setValue}
          >
            <AutoSuggest.Input
              label="Static Options (Uncontrolled Input)"
              labelVariant="in-field"
              placeholder="Search US states..."
              clearable
            />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No states found.</AutoSuggest.Empty>
                {US_STATES.map((state) => (
                  <AutoSuggest.Item key={state.value} value={state.value}>
                    {state.label}
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
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
          >
            <AutoSuggest.Input placeholder="Search states by region..." />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No states found.</AutoSuggest.Empty>
                {GROUPED_STATES.map((group) => (
                  <AutoSuggest.Group key={group.group} heading={group.group}>
                    {group.items.map((state) => (
                      <AutoSuggest.Item key={state.value} value={state.value}>
                        {state.label}
                      </AutoSuggest.Item>
                    ))}
                  </AutoSuggest.Group>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
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
          >
            <AutoSuggest.Input
              isLoading={isLoading}
              placeholder="Type to search (simulated 500ms delay)..."
            />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No matching states found.</AutoSuggest.Empty>
                {options.map((state) => (
                  <AutoSuggest.Item key={state.value} value={state.value}>
                    {state.label}
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
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
          <AutoSuggest options={US_STATES}>
            <AutoSuggest.Input placeholder="Search with custom items..." />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No states found.</AutoSuggest.Empty>
                {US_STATES.map((option) => (
                  <AutoSuggest.Item key={option.value} value={option.value}>
                    <div className="flex flex-col w-full">
                      <span className="font-semibold text-primary">
                        {option.label}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase">
                        {option.value}
                      </span>
                    </div>
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Rich Entity List (Fintech Standard)
          </label>
          <AutoSuggest options={CUSTOMERS}>
            <AutoSuggest.Input placeholder="Search customers..." />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No customers found.</AutoSuggest.Empty>
                {CUSTOMERS.map((customer) => (
                  <AutoSuggest.Item key={customer.value} value={customer.value} className="py-2.5">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col gap-1.5">
                        <span className="font-semibold text-primary leading-none">
                          {customer.label}
                        </span>
                        <span className="text-[11px] text-muted-foreground leading-none">
                          ID: {customer.meta.id} &bull; {customer.meta.contact}
                        </span>
                      </div>
                      <div className="flex flex-col items-end gap-1.5">
                        <span className="font-medium text-foreground leading-none">
                          {customer.meta.balance}
                        </span>
                        <span
                          className={`text-[10px] px-1.5 py-0.5 rounded-sm uppercase tracking-wider font-bold leading-none ${
                            customer.meta.status === "Active" ? "bg-success/20 text-success" :
                            customer.meta.status === "Overdue" ? "bg-danger/20 text-danger" :
                            "bg-warning/20 text-warning"
                          }`}
                        >
                          {customer.meta.status}
                        </span>
                      </div>
                    </div>
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Creatable Option (Phase 1)
          </label>
          <AutoSuggest
            options={US_STATES}
            creatable
            onCreate={(val) => alert(`Creating new state: ${val}`)}
          >
            <AutoSuggest.Input placeholder="Search or create state..." />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No states found.</AutoSuggest.Empty>
                {US_STATES.map((state) => (
                  <AutoSuggest.Item key={state.value} value={state.value}>
                    {state.label}
                  </AutoSuggest.Item>
                ))}
                <AutoSuggest.CreateItem createLabel="Add '{query}'" />
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Disabled State
          </label>
          <AutoSuggest options={US_STATES}>
            <AutoSuggest.Input placeholder="Search disabled..." disabled />
          </AutoSuggest>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-foreground">
            Error State
          </label>
          <AutoSuggest options={US_STATES}>
            <AutoSuggest.Input placeholder="Error state..." error />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No states found.</AutoSuggest.Empty>
                {US_STATES.map((state) => (
                  <AutoSuggest.Item key={state.value} value={state.value}>
                    {state.label}
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
        </div>
      </div>
    </div>
  );
}

