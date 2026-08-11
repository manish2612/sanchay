"use client";

import React, { useState } from "react";
import { Form, AutoSuggest, Icon, TextInput } from "@prime/ui";
import { UseFormReturn } from "react-hook-form";

export const COUNTRY_OPTIONS = [
  { label: "Nepal", value: "Nepal", icon: "🇳🇵" },
  { label: "India", value: "India", icon: "🇮🇳" },
  { label: "United States", value: "United States", icon: "🇺🇸" },
];

export const STATE_OPTIONS = [
  { label: "Bagmati", value: "Bagmati" },
  { label: "Gandaki", value: "Gandaki" },
  { label: "Lumbini", value: "Lumbini" },
];

export const CountrySelectField = ({ control, name, getValues }: { control: any, name: string, getValues: any }) => {
  const [query, setQuery] = useState(getValues(name) || "");

  const filtered = COUNTRY_OPTIONS.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  const selectedOption = COUNTRY_OPTIONS.find(c => c.value === getValues(name));
  const activeIcon = selectedOption ? <span className="text-base">{selectedOption.icon}</span> : <Icon name="Globe" size={16} className="text-muted-foreground" />;

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item>
          <AutoSuggest
            inputValue={query}
            onInputChange={(v) => {
              setQuery(v);
              field.onChange(v);
            }}
            options={filtered}
          >
            <AutoSuggest.Input
              label="Country *"
              labelVariant="in-field"
              placeholder="Search country..."
              leftSlot={activeIcon}
            />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No country found.</AutoSuggest.Empty>
                {filtered.map((opt) => (
                  <AutoSuggest.Item 
                    key={opt.value} 
                    value={opt.value}
                    onSelect={() => {
                      field.onChange(opt.value);
                      setQuery(opt.value);
                    }}
                  >
                    <span className="mr-2">{opt.icon}</span>
                    {opt.label}
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
};

export const StateSelectField = ({ control, name, getValues }: { control: any, name: string, getValues: any }) => {
  const [query, setQuery] = useState(getValues(name) || "");

  const filtered = STATE_OPTIONS.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item>
          <AutoSuggest
            inputValue={query}
            onInputChange={(v) => {
              setQuery(v);
              field.onChange(v);
            }}
            options={filtered}
          >
            <AutoSuggest.Input
              label="State *"
              labelVariant="in-field"
              placeholder="Search state..."
              leftSlot={<Icon name="Map" size={16} className="text-muted-foreground" />}
            />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>No state found.</AutoSuggest.Empty>
                {filtered.map((opt) => (
                  <AutoSuggest.Item 
                    key={opt.value} 
                    value={opt.value}
                    onSelect={() => {
                      field.onChange(opt.value);
                      setQuery(opt.value);
                    }}
                  >
                    {opt.label}
                  </AutoSuggest.Item>
                ))}
              </AutoSuggest.List>
            </AutoSuggest.Content>
          </AutoSuggest>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
};

export const AddressTextareaField = ({ control, name, className }: { control: any, name: string, className?: string }) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field, fieldState }) => (
      <Form.Item className={className}>
        <div className={`flex rounded-md border bg-surface shadow-sm focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2 min-h-[48px] w-full px-3 py-1.5 ${fieldState.error ? 'border-danger focus-within:ring-danger' : 'border-input'}`}>
          <div className="text-muted-foreground mr-2 flex items-start justify-center shrink-0 pt-2">
            <Icon name="MapPin" size={16} />
          </div>
          <div className="flex-1 flex flex-col justify-center min-w-0">
            <label className="text-[10px] uppercase text-muted-foreground font-semibold leading-none tracking-wider cursor-text w-full mb-1">
              Address *
            </label>
            <textarea
              {...field}
              id={field.name}
              placeholder="e.g. 123 Main St, Suite 400"
              rows={3}
              className="flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground/50 text-sm min-w-0 leading-tight text-foreground resize-none"
            />
          </div>
        </div>
        <Form.Message />
      </Form.Item>
    )}
  />
);

export const PincodeInputField = ({ control, name }: { control: any, name: string }) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            label="Pincode *"
            labelVariant="in-field"
            placeholder="e.g. 44600"
            leftSlot={<Icon name="Hash" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);
