"use client";

import React from "react";
import { Form, TextInput, DropdownMenu, Icon, DatePicker, FormWizard } from "@prime/ui";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormValues } from "../schema";
import { COMPANY_FORM_FIELDS, CURRENCY_OPTIONS, REGISTRATION_TYPES } from "../constants";

interface OperationsComplianceSectionProps {
  form: UseFormReturn<CompanyFormValues>;
}

export const OperationsComplianceSection = ({ form }: OperationsComplianceSectionProps) => {
  return (
    <>
      <div className="mt-8 mb-6 flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold text-foreground whitespace-nowrap">
            Operations & Compliance
          </h3>
          <FormWizard.Separator className="flex-1 !my-0" />
        </div>
        <p className="text-sm text-muted-foreground">
          Financial year, registration, and default currency settings.
        </p>
      </div>

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
              <div className="flex flex-wrap gap-3 mt-2">
                {CURRENCY_OPTIONS.map((currency) => {
                  const isSelected = field.value === currency.value;
                  return (
                    <button
                      key={currency.value}
                      type="button"
                      onClick={() => field.onChange(currency.value)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg border transition-all duration-200 ${
                        isSelected
                          ? "border-primary bg-primary/10 text-primary shadow-sm"
                          : "border-border hover:border-border-hover text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`text-lg font-bold ${
                          isSelected ? "text-primary" : "text-foreground"
                        }`}
                      >
                        {currency.symbol}
                      </span>
                      <span className="text-sm font-medium whitespace-nowrap">{currency.label}</span>
                    </button>
                  );
                })}
              </div>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name={COMPANY_FORM_FIELDS.DECIMAL_COUNT}
          render={({ field }: any) => (
            <Form.Item className="col-span-1 md:col-span-2 mt-4 w-48">
              <Form.Control>
                <TextInput
                  {...field}
                  type="number"
                  min={0}
                  max={12}
                  label="Decimal Count"
                  labelVariant="in-field"
                  placeholder="e.g. 2"
                  leftSlot={<Icon name="Hash" size={16} className="text-muted-foreground" />}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>
    </>
  );
};
