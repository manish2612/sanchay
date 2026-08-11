"use client";

import React from "react";
import { Form, TextInput, DropdownMenu, Icon } from "@prime/ui";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormValues } from "../schema";
import { COMPANY_FORM_FIELDS } from "../constants";

const TIMEZONE_OPTIONS = [
  { id: "Asia/Kathmandu", label: "Asia/Kathmandu" },
  { id: "Asia/Kolkata", label: "Asia/Kolkata" },
  { id: "America/New_York", label: "America/New_York" },
];

interface CompanyProfileStepProps {
  form: UseFormReturn<CompanyFormValues>;
}

export const CompanyProfileStep = ({ form }: CompanyProfileStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.NAME}
        render={({ field }: any) => (
          <Form.Item className="col-span-1 md:col-span-2">
            <Form.Control>
              <TextInput
                {...field}
                label="Company Name *"
                labelVariant="in-field"
                placeholder="e.g. Acme Corp"
                leftSlot={<Icon name="Building" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.MAILING_NAME}
        render={({ field }: any) => (
          <Form.Item>
            <Form.Control>
              <TextInput
                {...field}
                label="Mailing Name *"
                labelVariant="in-field"
                placeholder="e.g. Acme Corporation Pvt. Ltd."
                leftSlot={<Icon name="Mail" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.TIMEZONE}
        render={({ field }: any) => (
          <Form.Item>
            <Form.Control>
              <DropdownMenu
                label="Timezone *"
                labelVariant="in-field"
                triggerLabel={field.value || "Select timezone"}
                items={TIMEZONE_OPTIONS.map((opt) => ({
                  id: opt.id,
                  label: opt.label,
                  onSelect: () => field.onChange(opt.id),
                }))}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
    </div>
  );
};
