"use client";

import React from "react";
import { Form, TextInput, DropdownMenu, DatePicker, Icon } from "@prime/ui";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormValues } from "../schema";
import { COMPANY_FORM_FIELDS, CURRENCY_OPTIONS, REGISTRATION_TYPES } from "../constants";

interface OperationsComplianceStepProps {
  form: UseFormReturn<CompanyFormValues>;
}

export const OperationsComplianceStep = ({ form }: OperationsComplianceStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.REGISTRATION_TYPE}
        render={({ field }: any) => (
          <Form.Item>
            <Form.Control>
              <DropdownMenu
                label="Registration Type *"
                labelVariant="in-field"
                triggerLabel={
                  REGISTRATION_TYPES.find((t) => t.value === field.value)?.label ||
                  "Select type"
                }
                items={REGISTRATION_TYPES.map((opt) => ({
                  id: opt.value,
                  label: opt.label,
                  onSelect: () => field.onChange(opt.value),
                }))}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.REGISTRATION_NUMBER}
        render={({ field }: any) => (
          <Form.Item>
            <Form.Control>
              <TextInput
                {...field}
                label="Registration Number *"
                labelVariant="in-field"
                placeholder="e.g. PAN-123456789"
                leftSlot={<Icon name="FileText" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.FINANCIAL_YEAR_START_DATE}
        render={({ field }: any) => (
          <Form.Item>
            <Form.Control>
              <DatePicker
                label="Financial Year Start Date *"
                labelVariant="in-field"
                date={field.value}
                onDateChange={field.onChange}
                placeholder="Select Date"
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.BOOKS_START_DATE}
        render={({ field }: any) => (
          <Form.Item>
            <Form.Control>
              <DatePicker
                label="Books Start Date *"
                labelVariant="in-field"
                date={field.value}
                onDateChange={field.onChange}
                placeholder="Select Date"
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.CURRENCY}
        render={({ field }: any) => (
          <Form.Item className="col-span-1 md:col-span-2 mt-4">
            <Form.Label>Base Currency *</Form.Label>
            <div className="flex gap-4 mt-2">
              {CURRENCY_OPTIONS.map((currency) => {
                const isSelected = field.value === currency.value;
                return (
                  <button
                    key={currency.value}
                    type="button"
                    onClick={() => field.onChange(currency.value)}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all w-32 ${
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:border-border-hover text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span
                      className={`text-2xl font-bold mb-1 ${
                        isSelected ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {currency.symbol}
                    </span>
                    <span className="text-sm font-medium">{currency.label}</span>
                  </button>
                );
              })}
            </div>
            <Form.Message />
          </Form.Item>
        )}
      />
    </div>
  );
};
