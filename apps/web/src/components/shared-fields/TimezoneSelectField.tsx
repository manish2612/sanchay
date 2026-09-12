import React from "react";
import { Form, DropdownMenu } from "@prime/ui";
import { UseFormReturn } from "react-hook-form";
import { useTimezoneSelectField } from "./useTimezoneSelectField";

interface TimezoneSelectFieldProps {
  form: UseFormReturn<any>;
  name: string;
}

export const TimezoneSelectField = ({ form, name }: TimezoneSelectFieldProps) => {
  const { timezoneOptions, isLoading } = useTimezoneSelectField();

  return (
    <Form.Field
      control={form.control}
      name={name}
      render={({ field }) => {
        const selectedLabel = timezoneOptions.find((opt) => opt.id === field.value)?.label;
        return (
          <Form.Item>
            <Form.Control>
              <DropdownMenu
                label="Timezone *"
                labelVariant="in-field"
                triggerLabel={isLoading ? "Loading..." : (selectedLabel || "Select timezone")}
                searchable={true}
                disabled={isLoading}
                items={timezoneOptions.map((opt) => ({
                  id: opt.id,
                  label: opt.label,
                  textValue: `${opt.label} ${opt.searchName}`,
                  disabled: isLoading,
                  onSelect: () => field.onChange(opt.id),
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
