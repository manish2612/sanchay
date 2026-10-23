"use client";

import React from "react";
import { Form, Icon, TextInput } from "@prime/ui";
import type { Control, FieldValues } from "react-hook-form";

export interface ContactFieldProps<TFieldValues extends FieldValues = FieldValues> {
  control: Control<TFieldValues>;
  name: string;
}

export const ContactPersonInputField = <T extends FieldValues = FieldValues>({ control, name }: ContactFieldProps<T>) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            label="Contact Person"
            labelVariant="in-field"
            placeholder="e.g. John Doe"
            leftSlot={<Icon name="User" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);

export const EmailInputField = <T extends FieldValues = FieldValues>({ control, name }: ContactFieldProps<T>) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            label="Email"
            labelVariant="in-field"
            type="email"
            placeholder="e.g. contact@example.com"
            leftSlot={<Icon name="Mail" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);

export const MobileInputField = <T extends FieldValues = FieldValues>({ control, name }: ContactFieldProps<T>) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            label="Mobile Number"
            labelVariant="in-field"
            placeholder="e.g. 9800000000"
            value={field.value ?? ""}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              field.onChange(val);
            }}
            leftSlot={<Icon name="Smartphone" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);

export const WhatsappInputField = <T extends FieldValues = FieldValues>({ control, name }: ContactFieldProps<T>) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            label="WhatsApp Number"
            labelVariant="in-field"
            placeholder="e.g. 9800000000"
            value={field.value ?? ""}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              field.onChange(val);
            }}
            leftSlot={<Icon name="MessageCircle" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);

export const TelephoneInputField = <T extends FieldValues = FieldValues>({ control, name }: ContactFieldProps<T>) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            label="Landline No"
            labelVariant="in-field"
            placeholder="e.g. 014444444"
            value={field.value ?? ""}
            onChange={(e) => {
              const val = e.target.value.replace(/\D/g, "");
              field.onChange(val);
            }}
            leftSlot={<Icon name="Phone" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);
