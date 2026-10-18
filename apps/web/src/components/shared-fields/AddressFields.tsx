"use client";

import React, { useState, useEffect } from "react";
import { Form, DropdownMenu, Icon, TextInput, cn } from "@prime/ui";
import { useCountrySelectField, useStateSelectField } from "./useAddressFields";

export interface CountrySelectFieldProps {
  control: any;
  name: string;
  getValues?: any;
  required?: boolean;
  label?: string;
}

export const CountrySelectField = ({
  control,
  name,
  getValues,
  required = true,
  label,
}: CountrySelectFieldProps) => {
  const { countryOptions } = useCountrySelectField();
  const displayLabel = label ?? (required ? "Country *" : "Country");

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => {
        const selectedOption = countryOptions.find((c) => c.value === field.value);
        return (
          <Form.Item>
            <Form.Control>
              <DropdownMenu
                label={displayLabel}
                labelVariant="in-field"
                triggerLabel={
                  selectedOption ? (
                    <div className="flex items-center gap-2">
                      <span className="text-base">{selectedOption.icon}</span>
                      <span>{selectedOption.label}</span>
                    </div>
                  ) : (
                    "Select country"
                  )
                }
                searchable={true}
                items={countryOptions.map((opt) => ({
                  id: opt.value,
                  label: opt.label,
                  leadingVisual: <span className="text-base">{opt.icon}</span>,
                  textValue: opt.label,
                  onSelect: () => field.onChange(opt.value),
                }))}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        );
      }}
    />
  );
};

export interface StateSelectFieldProps {
  control: any;
  name: string;
  getValues?: any;
  watchCountryName?: string;
  required?: boolean;
  label?: string;
}

export const StateSelectField = ({
  control,
  name,
  getValues,
  watchCountryName = "country",
  required = true,
  label,
}: StateSelectFieldProps) => {
  const { stateOptions } = useStateSelectField(control, watchCountryName);
  const displayLabel = label ?? (required ? "State *" : "State");

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => {
        const selectedLabel = stateOptions.find((s) => s.value === field.value)?.label;
        return (
          <Form.Item>
            <Form.Control>
              <DropdownMenu
                label={displayLabel}
                labelVariant="in-field"
                triggerLabel={selectedLabel || "Select state"}
                searchable={true}
                items={stateOptions.map((opt) => ({
                  id: opt.value,
                  label: opt.label,
                  textValue: opt.label,
                  onSelect: () => field.onChange(opt.value),
                }))}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        );
      }}
    />
  );
};

export interface AddressTextareaFieldProps {
  control: any;
  name: string;
  className?: string;
  required?: boolean;
  label?: string;
}

export const AddressTextareaField = ({
  control,
  name,
  className,
  required = false,
  label,
}: AddressTextareaFieldProps) => {
  const displayLabel = label ?? (required ? "Address *" : "Address");

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Form.Item className={className}>
          <div
            className={cn(
              "flex rounded-md border bg-surface shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2 min-h-[48px] w-full px-3 py-1.5",
              fieldState.error ? "border-danger focus-within:ring-danger" : "border-input"
            )}
          >
            <div className="text-muted-foreground mr-2 flex items-start justify-center shrink-0 pt-2">
              <Icon name="MapPin" size={16} />
            </div>
            <div className="flex-1 flex flex-col justify-center min-w-0">
              <label
                htmlFor={field.name}
                className="text-[10px] uppercase text-muted-foreground font-semibold leading-none tracking-wider cursor-text w-full mb-0.5"
              >
                {displayLabel}
              </label>
              <textarea
                {...field}
                id={field.name}
                placeholder="e.g. 123 Main St, Suite 400"
                rows={3}
                className="flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 placeholder:text-muted-foreground/50 text-sm min-w-0 leading-tight text-foreground resize-none"
              />
            </div>
          </div>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
};

export interface PincodeInputFieldProps {
  control: any;
  name: string;
  required?: boolean;
  label?: string;
}

export const PincodeInputField = ({
  control,
  name,
  required = false,
  label,
}: PincodeInputFieldProps) => {
  const displayLabel = label ?? (required ? "Pincode *" : "Pincode");

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item>
          <Form.Control>
            <TextInput
              {...field}
              label={displayLabel}
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
};
