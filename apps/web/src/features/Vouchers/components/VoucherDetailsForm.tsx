import React from 'react';
import { TextInput, DatePicker, Icon, AutoSuggest, DropdownMenu, Button } from '@prime/ui';
import { type VoucherDetailsFormState } from '../hooks/useVoucherDetailsForm';

// ─── Voucher Type Primary Dropdown ─────────────────────────────────────────
// Uses children-as-custom-trigger pattern to apply brand primary styling.
// This is the master control field — visually dominant to signal hierarchy.

interface VoucherTypeSelectorProps {
  value: string;
  onChange: (v: string) => void;
  options: { id: string; name: string }[];
  isLoading?: boolean;
  isError?: boolean;
}

function VoucherTypeSelector({
  value,
  onChange,
  options,
  isLoading,
  isError,
}: VoucherTypeSelectorProps) {
  const displayValue = isLoading ? 'Loading...' : isError ? 'Error loading' : value || 'Select...';

  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground select-none leading-none">
        Voucher Type
      </span>
      <DropdownMenu
        items={options.map((opt) => ({
          id: opt.id,
          label: opt.name,
          onSelect: () => onChange(opt.name), // Keeping onChange(name) since 'value' stores the name
        }))}
        align="start"
      >
        {/* Custom trigger: bold primary-colored button */}
        <Button
          variant="primary"
          size="sm"
          className="w-full justify-between font-semibold text-sm h-9"
          disabled={isLoading || isError}
        >
          <span className="truncate">{displayValue}</span>
          <Icon name="ChevronDown" size={14} className="opacity-70 ml-2 shrink-0" />
        </Button>
      </DropdownMenu>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────
import { useFormContext } from "react-hook-form";
import { Form } from "@prime/ui";
import { VOUCHER_FIELDS } from "../constants/voucherFields";

type VoucherDetailsFormProps = {
  voucherType: string;
  setVoucherType: (val: string) => void;
  voucherTypeOptions: any[];
  filteredPartyOptions: any[];
  isLoading: boolean;
  isError: boolean;
};

export function VoucherDetailsForm({
  voucherType,
  setVoucherType,
  voucherTypeOptions,
  filteredPartyOptions,
  isLoading,
  isError,
}: VoucherDetailsFormProps) {
  const { control, setValue } = useFormContext();

  return (
    <div className="flex border-b border-border bg-surface relative overflow-hidden flex-shrink-0">
      <section className="flex-1 px-4 pt-3 pb-2 flex flex-col gap-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-2 items-end">
          
          {/* Voucher Type */}
          <div className="lg:col-span-1">
            <VoucherTypeSelector
              value={voucherType}
              onChange={setVoucherType}
              options={voucherTypeOptions}
              isLoading={isLoading}
              isError={isError}
            />
          </div>

          {/* Voucher No */}
          <div className="lg:col-span-1">
            <Form.Field
              control={control}
              name={VOUCHER_FIELDS.VOUCHER_NO}
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <TextInput
                      {...field}
                      label="Voucher No."
                      labelVariant="in-field"
                      inputClassName="font-mono font-medium text-foreground"
                      placeholder="Enter voucher no..."
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>

          {/* Payment Mode */}
          <div className="lg:col-span-1">
            <Form.Field
              control={control}
              name={VOUCHER_FIELDS.PAYMENT_MODE}
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <DropdownMenu
                      label="Payment Mode"
                      labelVariant="in-field"
                      triggerLabel={field.value}
                      items={[
                        { id: 'Credit', label: 'Credit', onSelect: () => field.onChange('Credit') },
                        { id: 'Cash', label: 'Cash', onSelect: () => field.onChange('Cash') },
                        { id: 'Bank Transfer', label: 'Bank Transfer', onSelect: () => field.onChange('Bank Transfer') },
                        { id: 'Cheque', label: 'Cheque', onSelect: () => field.onChange('Cheque') },
                      ]}
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>

          {/* Voucher Date */}
          <div className="lg:col-span-1">
            <Form.Field
              control={control}
              name={VOUCHER_FIELDS.VOUCHER_DATE_AD}
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <DatePicker
                      label="Date"
                      labelVariant="in-field"
                      date={field.value}
                      onDateChange={(date, meta) => {
                        field.onChange(date);
                        if (meta?.nepaliDateString) {
                          setValue(VOUCHER_FIELDS.VOUCHER_DATE_BS, meta.nepaliDateString, { shouldDirty: true });
                        }
                      }}
                      placeholder="Select Date"
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>

          {/* Party A/C */}
          <div className="lg:col-span-2">
            <Form.Field
              control={control}
              name={VOUCHER_FIELDS.PARTY_ACCOUNT}
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <AutoSuggest
                      inputValue={field.value}
                      onInputChange={field.onChange}
                      options={filteredPartyOptions}
                    >
                      <AutoSuggest.Input
                        label="Party A/C"
                        labelVariant="in-field"
                        placeholder="Search party account..."
                      />
                      <AutoSuggest.Content>
                        <AutoSuggest.List>
                          <AutoSuggest.Empty>No results found.</AutoSuggest.Empty>
                          {filteredPartyOptions.map((opt) => (
                            <AutoSuggest.Item key={opt.value} value={opt.value}>
                              {opt.label}
                            </AutoSuggest.Item>
                          ))}
                        </AutoSuggest.List>
                      </AutoSuggest.Content>
                    </AutoSuggest>
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>

          {/* Sales A/C */}
          <div className="lg:col-span-1">
            <Form.Field
              control={control}
              name={VOUCHER_FIELDS.SALES_AC}
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <DropdownMenu
                      label="Sales A/C"
                      labelVariant="in-field"
                      triggerLabel={field.value}
                      items={[
                        { id: '13% Sales', label: '13% Sales', onSelect: () => field.onChange('13% Sales') },
                        { id: '0% Sales', label: '0% Sales', onSelect: () => field.onChange('0% Sales') },
                        { id: 'Exempt Sales', label: 'Exempt Sales', onSelect: () => field.onChange('Exempt Sales') },
                      ]}
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>

          {/* Ref No */}
          <div className="lg:col-span-1">
            <Form.Field
              control={control}
              name={VOUCHER_FIELDS.REFERENCE_NO}
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <TextInput 
                      {...field}
                      label="Ref. No." 
                      labelVariant="in-field" 
                      placeholder="Reference number..." 
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>

          {/* Ref Date */}
          <div className="lg:col-span-1">
            <Form.Field
              control={control}
              name={VOUCHER_FIELDS.REF_DATE_AD}
              render={({ field }) => (
                <Form.Item>
                  <Form.Control>
                    <DatePicker
                      label="Ref. Date"
                      labelVariant="in-field"
                      date={field.value}
                      onDateChange={(date, meta) => {
                        field.onChange(date);
                        if (meta?.nepaliDateString) {
                          setValue(VOUCHER_FIELDS.REF_DATE_BS, meta.nepaliDateString, { shouldDirty: true });
                        }
                      }}
                      placeholder="Select Date"
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>

        </div>
      </section>
    </div>
  );
}
