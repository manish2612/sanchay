import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { AutoSuggest } from './index';

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

const meta: Meta<typeof AutoSuggest> = {
  title: 'Primitives/AutoSuggest',
  component: AutoSuggest,
  tags: ['autodocs'],
  argTypes: {
    multiple: { control: 'boolean' },
    virtualized: { control: 'boolean' },
    creatable: { control: 'boolean' },
    label: { control: 'text' },
    labelVariant: {
      control: 'select',
      options: ['default', 'in-field', 'inline', 'hidden'],
    },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    clearable: { control: 'boolean' },
  },
  args: {
    label: 'AutoSuggest',
    labelVariant: 'default',
    placeholder: 'Search...',
    disabled: false,
    error: false,
    clearable: true,
    multiple: false,
    virtualized: false,
    creatable: false,
  },
};

export default meta;
type Story = StoryObj<any>;

export const DefaultStaticOptions: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <div className="max-w-sm">
        <AutoSuggest {...args} options={US_STATES} value={value} onChange={setValue}>
          <AutoSuggest.Input
            label={args.label}
            labelVariant={args.labelVariant}
            placeholder={args.placeholder}
            disabled={args.disabled}
            error={args.error}
            clearable={args.clearable}
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
      </div>
    );
  }
};

export const MultiSelect: Story = {
  args: {
    multiple: true,
    label: 'Multi-Select',
    labelVariant: 'in-field',
    placeholder: 'Select multiple states...',
  },
  render: (args) => {
    const [multiValue, setMultiValue] = useState<string[]>([]);
    return (
      <div className="max-w-sm">
        <AutoSuggest
          {...args}
          options={US_STATES}
          value={multiValue}
          onChange={setMultiValue}
        >
          <AutoSuggest.Input
            label={args.label}
            labelVariant={args.labelVariant}
            placeholder={args.placeholder}
            disabled={args.disabled}
            error={args.error}
            clearable={args.clearable}
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
      </div>
    );
  }
};

export const CountrySelectionWithLeadingVisuals: Story = {
  args: {
    label: 'Country Selection',
    placeholder: 'Search countries...',
  },
  render: (args) => {
    const [countryValue, setCountryValue] = useState("");
    return (
      <div className="max-w-sm">
        <AutoSuggest
          {...args}
          options={COUNTRIES}
          value={countryValue}
          onChange={setCountryValue}
        >
          <AutoSuggest.Input
            label={args.label}
            labelVariant={args.labelVariant}
            placeholder={args.placeholder}
            disabled={args.disabled}
            error={args.error}
            clearable={args.clearable}
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
      </div>
    );
  }
};

export const GroupedOptions: Story = {
  args: {
    label: 'Grouped Options',
    placeholder: 'Search states by region...',
  },
  render: (args) => {
    const [groupedValue, setGroupedValue] = useState("");
    return (
      <div className="max-w-sm">
        <AutoSuggest
          {...args}
          options={GROUPED_STATES}
          value={groupedValue}
          onChange={setGroupedValue}
        >
          <AutoSuggest.Input
            label={args.label}
            labelVariant={args.labelVariant}
            placeholder={args.placeholder}
            disabled={args.disabled}
            error={args.error}
            clearable={args.clearable}
          />
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
      </div>
    );
  }
};

export const DynamicAPISearch: Story = {
  args: {
    label: 'Dynamic API Search',
    placeholder: 'Type to search (simulated 500ms delay)...',
  },
  render: (args) => {
    const [dynamicValue, setDynamicValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState(US_STATES);

    const handleDynamicSearch = (search: string) => {
      setInputValue(search);
      setIsLoading(true);
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
      <div className="max-w-sm">
        <AutoSuggest
          {...args}
          options={options}
          value={dynamicValue}
          onChange={setDynamicValue}
          inputValue={inputValue}
          onInputChange={handleDynamicSearch}
        >
          <AutoSuggest.Input
            label={args.label}
            labelVariant={args.labelVariant}
            placeholder={args.placeholder}
            disabled={args.disabled}
            error={args.error}
            clearable={args.clearable}
            isLoading={isLoading}
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
      </div>
    );
  }
};

export const RichEntityList: Story = {
  args: {
    label: 'Rich Entity List',
    placeholder: 'Search customers...',
  },
  render: (args) => {
    return (
      <div className="max-w-sm">
        <AutoSuggest {...args} options={CUSTOMERS}>
          <AutoSuggest.Input
            label={args.label}
            labelVariant={args.labelVariant}
            placeholder={args.placeholder}
            disabled={args.disabled}
            error={args.error}
            clearable={args.clearable}
          />
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
    );
  }
};

export const CreatableOption: Story = {
  args: {
    creatable: true,
    label: 'Creatable Option',
    placeholder: 'Search or create state...',
  },
  render: (args) => {
    return (
      <div className="max-w-sm">
        <AutoSuggest
          {...args}
          options={US_STATES}
          onCreate={(val) => alert(`Creating new state: ${val}`)}
        >
          <AutoSuggest.Input
            label={args.label}
            labelVariant={args.labelVariant}
            placeholder={args.placeholder}
            disabled={args.disabled}
            error={args.error}
            clearable={args.clearable}
          />
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
    );
  }
};
