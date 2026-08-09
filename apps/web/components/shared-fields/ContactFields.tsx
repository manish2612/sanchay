"use client";

import React from "react";
import { Form, Icon, TextInput } from "@prime/ui";

export const ContactPersonInputField = ({ control, name }: { control: any, name: string }) => (
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

export const EmailInputField = ({ control, name }: { control: any, name: string }) => (
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

export const MobileInputField = ({ control, name }: { control: any, name: string }) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            label="Mobile Number *"
            labelVariant="in-field"
            placeholder="e.g. +977-9800000000"
            leftSlot={<Icon name="Smartphone" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);

export const WhatsappInputField = ({ control, name }: { control: any, name: string }) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            label="WhatsApp Number"
            labelVariant="in-field"
            placeholder="e.g. +977-9800000000"
            leftSlot={<Icon name="MessageCircle" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);

export const TelephoneInputField = ({ control, name }: { control: any, name: string }) => (
  <Form.Field
    control={control}
    name={name}
    render={({ field }) => (
      <Form.Item>
        <Form.Control>
          <TextInput
            {...field}
            label="Landline No"
            labelVariant="in-field"
            placeholder="e.g. 01-4444444"
            leftSlot={<Icon name="Phone" size={16} className="text-muted-foreground" />}
          />
        </Form.Control>
        <Form.Message />
      </Form.Item>
    )}
  />
);
