'use client';

import React, { useState } from 'react';
import { Form, TextInput, AutoSuggest, DropdownMenu, Switch, Icon } from '@prime/ui';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { VoucherTypeFormValues } from '../schema';
import {
  VOUCHER_TYPE_FIELDS,
  PARENT_OPTIONS,
  DEFAULT_VIEWING_MODE_OPTIONS,
  APPLY_TAX_OPTIONS,
} from '../constants';
import { SwitchCard } from '../../../../../components/TableCells/SwitchCard';

interface BasicDetailsStepProps {
  form: UseFormReturn<VoucherTypeFormValues>;
}

export const BasicDetailsStep = ({ form }: BasicDetailsStepProps) => {
  const [parentQuery, setParentQuery] = useState(form.getValues(VOUCHER_TYPE_FIELDS.PARENT) || '');

  const filteredParents = PARENT_OPTIONS.filter((u) =>
    u.label.toLowerCase().includes(parentQuery.toLowerCase()),
  );

  const parentValue = useWatch({
    control: form.control,
    name: VOUCHER_TYPE_FIELDS.PARENT,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Field
        control={form.control}
        name={VOUCHER_TYPE_FIELDS.NAME}
        render={({ field }) => (
          <Form.Item className="md:col-span-2">
            <Form.Control>
              <TextInput
                {...field}
                label="Name *"
                labelVariant="in-field"
                placeholder="e.g. Sales Voucher"
                leftSlot={<Icon name="Type" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
        <Form.Field
          control={form.control}
          name={VOUCHER_TYPE_FIELDS.PARENT}
          render={({ field }) => (
            <Form.Item>
              <AutoSuggest
                inputValue={parentQuery}
                onInputChange={(v) => {
                  setParentQuery(v);
                  field.onChange(v);
                }}
                options={filteredParents}
              >
                <AutoSuggest.Input
                  label="Parent *"
                  labelVariant="in-field"
                  placeholder="Search parent..."
                />
                <AutoSuggest.Content>
                  <AutoSuggest.List>
                    <AutoSuggest.Empty>No parent found.</AutoSuggest.Empty>
                    {filteredParents.map((opt) => (
                      <AutoSuggest.Item
                        key={opt.value}
                        value={opt.label}
                        onSelect={() => {
                          field.onChange(opt.label);
                          setParentQuery(opt.label);
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

        {/* {parentValue?.toLowerCase() === 'sales' && (
          <Form.Field
            control={form.control}
            name={VOUCHER_TYPE_FIELDS.APPLY_TAX}
            render={({ field }) => (
              <Form.Item>
                <DropdownMenu
                  label="Apply Tax"
                  labelVariant="in-field"
                  triggerLabel={
                    APPLY_TAX_OPTIONS.find((t) => t.value === field.value)?.label ||
                    'Select apply tax...'
                  }
                  items={APPLY_TAX_OPTIONS.map((type) => ({
                    id: type.value,
                    label: type.label,
                    onSelect: () => field.onChange(type.value),
                  }))}
                />
                <Form.Message />
              </Form.Item>
            )}
          />
        )} */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2 items-center">
        <Form.Field
          control={form.control}
          name={VOUCHER_TYPE_FIELDS.DEFAULT_VIEWING_MODE}
          render={({ field }) => (
            <Form.Item>
              <DropdownMenu
                label="Default Viewing Mode"
                labelVariant="in-field"
                triggerLabel={
                  DEFAULT_VIEWING_MODE_OPTIONS.find((t) => t.value === field.value)?.label ||
                  'Select mode...'
                }
                items={DEFAULT_VIEWING_MODE_OPTIONS.map((type) => ({
                  id: type.value,
                  label: type.label,
                  onSelect: () => field.onChange(type.value),
                }))}
              />
              <Form.Message />
            </Form.Item>
          )}
        />

        <SwitchCard 
          name={VOUCHER_TYPE_FIELDS.SET_AS_DEFAULT} 
          label="Set As Default" 
          className="p-3 h-10" 
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
        {parentValue?.toLowerCase() === 'sales' && (
          <Form.Field
            control={form.control}
            name={VOUCHER_TYPE_FIELDS.APPLY_TAX}
            render={({ field }) => (
              <Form.Item>
                <DropdownMenu
                  label="Apply Tax"
                  labelVariant="in-field"
                  triggerLabel={
                    APPLY_TAX_OPTIONS.find((t) => t.value === field.value)?.label ||
                    'Select apply tax...'
                  }
                  items={APPLY_TAX_OPTIONS.map((type) => ({
                    id: type.value,
                    label: type.label,
                    onSelect: () => field.onChange(type.value),
                  }))}
                />
                <Form.Message />
              </Form.Item>
            )}
          />
        )}
      </div>

      <Form.Field
        control={form.control}
        name={VOUCHER_TYPE_FIELDS.DECLARATION}
        render={({ field }) => (
          <Form.Item className="md:col-span-2">
            <Form.Label>Declaration</Form.Label>
            <Form.Control>
              <textarea
                {...field}
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter declaration text..."
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
    </div>
  );
};
