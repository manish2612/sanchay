import React, { useEffect } from 'react';
import { TextInput, DatePicker, Icon, AutoSuggest, DropdownMenu, Button } from '@prime/ui';
import { format } from 'date-fns';
import { PAYMENT_MODES } from "../constants/paymentModes";

import { useGetNextVoucherNumberQuery } from '../api';
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
  showPartyAc: boolean;
  showPaymentMode: boolean;
  showSalesAc: boolean;
};

export function VoucherDetailsForm({
  voucherType,
  setVoucherType,
  voucherTypeOptions,
  filteredPartyOptions,
  isLoading,
  isError,
  showPartyAc,
  showPaymentMode,
  showSalesAc,
}: VoucherDetailsFormProps) {
  const { control, setValue, watch } = useFormContext();

  const voucherTypeId = watch(VOUCHER_FIELDS.VOUCHER_TYPE_ID);
  const voucherDateAD = watch(VOUCHER_FIELDS.VOUCHER_DATE_AD);
  
  const formattedDate = voucherDateAD ? format(voucherDateAD, 'yyyy-MM-dd') : '';

  const { data: nextVoucherData, isFetching } = useGetNextVoucherNumberQuery(
    { voucher_type_id: voucherTypeId, voucher_date: formattedDate },
    { skip: !voucherTypeId || !formattedDate } // Skip API call until both type and date are available
  );

  useEffect(() => {
    if (nextVoucherData) {
      if (nextVoucherData.next_voucher_number) {
        setValue(VOUCHER_FIELDS.VOUCHER_NO, nextVoucherData.next_voucher_number, { shouldDirty: true });
      }
      if (nextVoucherData.sequence_index !== undefined) {
        setValue(VOUCHER_FIELDS.SEQUENCE_INDEX, nextVoucherData.sequence_index, { shouldDirty: true });
      }
      if (nextVoucherData.suffix !== undefined) {
        setValue(VOUCHER_FIELDS.SUFFIX, nextVoucherData.suffix, { shouldDirty: true });
      }
    }
  }, [nextVoucherData, setValue]);

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
                      disabled
                      label="Voucher No."
                      labelVariant="in-field"
                      inputClassName="font-mono font-medium text-foreground disabled:opacity-70 disabled:bg-muted"
                      placeholder={isFetching ? "Generating..." : "Enter voucher no..."}
                      rightSlot={isFetching ? <Icon name="Loader" className="animate-spin text-primary" size={16} /> : undefined}
                    />
                  </Form.Control>
                </Form.Item>
              )}
            />
          </div>

          {/* Payment Mode */}
          {showPaymentMode && (
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
                        triggerLabel={PAYMENT_MODES.find(m => m.id === field.value)?.label || 'Select Mode'}
                        items={PAYMENT_MODES.map(mode => ({
                          id: mode.id,
                          label: mode.label,
                          onSelect: () => field.onChange(mode.id)
                        }))}
                      />
                    </Form.Control>
                  </Form.Item>
                )}
              />
            </div>
          )}

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
          {showPartyAc && (
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
          )}

          {/* Sales A/C */}
          {showSalesAc && (
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
          )}

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
