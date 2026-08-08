"use client";

import React, { useState } from "react";
import { Form, TextInput, AutoSuggest, Icon } from "@prime/ui";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormValues } from "../schema";
import { COMPANY_FORM_FIELDS } from "../constants";

const COUNTRY_OPTIONS = [
  { label: "Nepal", value: "Nepal", icon: "🇳🇵" },
  { label: "India", value: "India", icon: "🇮🇳" },
  { label: "United States", value: "United States", icon: "🇺🇸" },
];

const STATE_OPTIONS = [
  { label: "Bagmati", value: "Bagmati" },
  { label: "Gandaki", value: "Gandaki" },
  { label: "Lumbini", value: "Lumbini" },
];

interface ContactLocationStepProps {
  form: UseFormReturn<CompanyFormValues>;
}

export const ContactLocationStep = ({ form }: ContactLocationStepProps) => {
  const [countryQuery, setCountryQuery] = useState(form.getValues(COMPANY_FORM_FIELDS.COUNTRY) || "");
  const [stateQuery, setStateQuery] = useState(form.getValues(COMPANY_FORM_FIELDS.STATE) || "");

  const filteredCountries = COUNTRY_OPTIONS.filter((c) =>
    c.label.toLowerCase().includes(countryQuery.toLowerCase())
  );
  
  const filteredStates = STATE_OPTIONS.filter((s) =>
    s.label.toLowerCase().includes(stateQuery.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.COUNTRY}
        render={({ field }: any) => (
          <Form.Item>
            <AutoSuggest
              inputValue={countryQuery}
              onInputChange={(v) => {
                setCountryQuery(v);
                field.onChange(v);
              }}
              options={filteredCountries}
            >
              <AutoSuggest.Input
                label="Country *"
                labelVariant="in-field"
                placeholder="Search country..."
                leftSlot={<Icon name="Globe" size={16} className="text-muted-foreground" />}
              />
              <AutoSuggest.Content>
                <AutoSuggest.List>
                  <AutoSuggest.Empty>No country found.</AutoSuggest.Empty>
                  {filteredCountries.map((opt) => (
                    <AutoSuggest.Item 
                      key={opt.value} 
                      value={opt.value}
                      onSelect={() => {
                        field.onChange(opt.value);
                        setCountryQuery(opt.value);
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

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.STATE}
        render={({ field }: any) => (
          <Form.Item>
            <AutoSuggest
              inputValue={stateQuery}
              onInputChange={(v) => {
                setStateQuery(v);
                field.onChange(v);
              }}
              options={filteredStates}
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
                  {filteredStates.map((opt) => (
                    <AutoSuggest.Item 
                      key={opt.value} 
                      value={opt.value}
                      onSelect={() => {
                        field.onChange(opt.value);
                        setStateQuery(opt.value);
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

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.ADDRESS}
        render={({ field }: any) => (
          <Form.Item className="col-span-1 md:col-span-2">
            <Form.Control>
              <TextInput
                {...field}
                label="Address *"
                labelVariant="in-field"
                placeholder="e.g. 123 Main St, Suite 400"
                leftSlot={<Icon name="MapPin" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.PINCODE}
        render={({ field }: any) => (
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

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.EMAIL}
        render={({ field }: any) => (
          <Form.Item>
            <Form.Control>
              <TextInput
                {...field}
                label="Email"
                labelVariant="in-field"
                type="email"
                placeholder="e.g. contact@company.com"
                leftSlot={<Icon name="Mail" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.MOBILE_NUMBER}
        render={({ field }: any) => (
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

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.WHATSAPP_NUMBER}
        render={({ field }: any) => (
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

      <Form.Field
        control={form.control}
        name={COMPANY_FORM_FIELDS.LANDLINE_NO}
        render={({ field }: any) => (
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
    </div>
  );
};
