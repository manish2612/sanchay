'use client';

import React from 'react';
import { Form, TextInput, AutoSuggest, DropdownMenu, Icon } from '@prime/ui';
import { UseFormReturn } from 'react-hook-form';
import { LedgerFormValues } from '../schema';
import { LEDGER_FORM_FIELDS, REGISTRATION_TYPES } from '../constants';
import { useParentOptions } from './useParentOptions';

interface GeneralInfoStepProps {
  form: UseFormReturn<LedgerFormValues>;
}

export const GeneralInfoStep = ({ form }: GeneralInfoStepProps) => {
  const { parentQuery, setParentQuery, filteredParent, isGroupsLoading, parentOptions } = useParentOptions(form);

  const currentParentId = form.watch(LEDGER_FORM_FIELDS.PARENT);
  const currentParentLabel = React.useMemo(() => {
    const selected = parentOptions?.find((opt) => opt.value === currentParentId);
    return selected ? selected.label : '';
  }, [parentOptions, currentParentId]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Form.Field
        control={form.control}
        name={LEDGER_FORM_FIELDS.NAME}
        render={({ field }) => (
          <Form.Item className="md:col-span-2">
            <Form.Control>
              <TextInput
                {...field}
                label="Name *"
                labelVariant="in-field"
                placeholder="e.g. Acme Corporation"
                leftSlot={<Icon name="Building" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={LEDGER_FORM_FIELDS.ALIAS}
        render={({ field }) => (
          <Form.Item>
            <Form.Control>
              <TextInput
                {...field}
                label="Alias"
                labelVariant="in-field"
                placeholder="e.g. Acme"
                leftSlot={<Icon name="Tag" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={LEDGER_FORM_FIELDS.ACCOUNT_CODE}
        render={({ field }) => (
          <Form.Item>
            <Form.Control>
              <TextInput
                {...field}
                label="Account Code"
                labelVariant="in-field"
                placeholder="e.g. ACC-100"
                leftSlot={<Icon name="Hash" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={LEDGER_FORM_FIELDS.PARENT}
        render={({ field, fieldState }) => (
          <Form.Item>
            <AutoSuggest
              inputValue={parentQuery}
              onInputChange={(v) => {
                setParentQuery(v);
                if (v !== currentParentLabel) {
                  field.onChange('');
                }
              }}
              options={filteredParent}
            >
              <AutoSuggest.Input
                label="Parent *"
                labelVariant="in-field"
                placeholder={isGroupsLoading ? "Loading groups..." : "Search group..."}
                disabled={isGroupsLoading}
                error={!!fieldState.error}
              />
              <AutoSuggest.Content>
                <AutoSuggest.List>
                  <AutoSuggest.Empty>No group found.</AutoSuggest.Empty>
                  {filteredParent.map((opt) => (
                    <AutoSuggest.Item
                      key={opt.value}
                      value={opt.value}
                      onSelect={() => {
                        field.onChange(opt.value);
                        setParentQuery(opt.label);
                        form.clearErrors(LEDGER_FORM_FIELDS.PARENT);
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

      <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-2 gap-4">
        <Form.Field
          control={form.control}
          name={LEDGER_FORM_FIELDS.REGISTRATION_TYPE}
          render={({ field }) => (
            <Form.Item>
              <DropdownMenu
                label="Registration Type *"
                labelVariant="in-field"
                triggerLabel={
                  REGISTRATION_TYPES.find((t) => t.value === field.value)?.label || 'Select type...'
                }
                items={REGISTRATION_TYPES.map((type) => ({
                  id: type.value,
                  label: type.label,
                  onSelect: () => field.onChange(type.value),
                }))}
              />
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name={LEDGER_FORM_FIELDS.REGISTRATION_NUMBER}
          render={({ field }) => (
            <Form.Item>
              <Form.Control>
                <TextInput
                  {...field}
                  label="Registration No *"
                  labelVariant="in-field"
                  placeholder="e.g. REG-12345"
                  leftSlot={<Icon name="Hash" size={16} className="text-muted-foreground" />}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>
    </div>
  );
};
