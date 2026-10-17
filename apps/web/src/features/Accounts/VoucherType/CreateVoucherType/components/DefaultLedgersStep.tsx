'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Form, AutoSuggest } from '@prime/ui';
import { UseFormReturn, Control, useWatch, Path } from 'react-hook-form';
import { VoucherTypeFormValues } from '../schema';
import { VOUCHER_TYPE_FIELDS } from '../constants';
import { useDefaultLedgersStep } from '../hooks/useDefaultLedgersStep';

interface DefaultLedgerFieldProps {
  control: Control<VoucherTypeFormValues>;
  name: Path<VoucherTypeFormValues>;
  label: string;
  options: { label: string; value: string }[];
  isLoading?: boolean;
}

const DefaultLedgerField = ({
  control,
  name,
  label,
  options,
  isLoading = false,
}: DefaultLedgerFieldProps) => {
  const currentValue = useWatch({ control, name }) as string | undefined;

  const selectedOption = useMemo(
    () => options.find((opt) => opt.value === currentValue),
    [options, currentValue]
  );

  const [query, setQuery] = useState(selectedOption?.label || '');

  useEffect(() => {
    if (selectedOption) {
      setQuery(selectedOption.label);
    } else if (!currentValue) {
      setQuery('');
    }
  }, [selectedOption, currentValue]);

  const filteredOptions = useMemo(() => {
    if (!query) return options;
    return options.filter((opt) =>
      opt.label.toLowerCase().includes(query.toLowerCase())
    );
  }, [options, query]);

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field }) => (
        <Form.Item>
          <AutoSuggest
            inputValue={query}
            onInputChange={(v) => {
              setQuery(v);
              if (selectedOption && v !== selectedOption.label) {
                field.onChange('');
              }
            }}
            options={filteredOptions}
          >
            <AutoSuggest.Input
              label={label}
              labelVariant="in-field"
              placeholder={isLoading ? `Loading ${label.toLowerCase()}...` : `Select ${label}...`}
              disabled={isLoading}
            />
            <AutoSuggest.Content>
              <AutoSuggest.List>
                <AutoSuggest.Empty>
                  {isLoading ? 'Loading ledgers...' : 'No ledger found.'}
                </AutoSuggest.Empty>
                {filteredOptions.map((opt) => (
                  <AutoSuggest.Item
                    key={opt.value}
                    value={opt.label}
                    onSelect={() => {
                      field.onChange(opt.value);
                      setQuery(opt.label);
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
  );
};

export const DefaultLedgersStep = ({ form }: { form: UseFormReturn<VoucherTypeFormValues> }) => {
  const {
    isLoading,
    cashOptions,
    bankOptions,
    salesPurchaseOptions,
    exportImportOptions,
    discountOptions,
    roundingOffOptions,
  } = useDefaultLedgersStep();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DefaultLedgerField
        control={form.control}
        name={VOUCHER_TYPE_FIELDS.CASH_LEDGER}
        label="Cash Ledger"
        options={cashOptions}
        isLoading={isLoading}
      />
      <DefaultLedgerField
        control={form.control}
        name={VOUCHER_TYPE_FIELDS.BANK_LEDGER}
        label="Bank Ledger"
        options={bankOptions}
        isLoading={isLoading}
      />
      <DefaultLedgerField
        control={form.control}
        name={VOUCHER_TYPE_FIELDS.SALES_PURCHASE_LEDGER}
        label="Sales/Purchase Ledger"
        options={salesPurchaseOptions}
        isLoading={isLoading}
      />
      <DefaultLedgerField
        control={form.control}
        name={VOUCHER_TYPE_FIELDS.EXPORT_IMPORT_LEDGER}
        label="Export/Import Ledger"
        options={exportImportOptions}
        isLoading={isLoading}
      />
      <DefaultLedgerField
        control={form.control}
        name={VOUCHER_TYPE_FIELDS.DISCOUNT_LEDGER}
        label="Discount Ledger"
        options={discountOptions}
        isLoading={isLoading}
      />
      <DefaultLedgerField
        control={form.control}
        name={VOUCHER_TYPE_FIELDS.ROUNDING_OFF_LEDGER}
        label="Rounding Off Ledger"
        options={roundingOffOptions}
        isLoading={isLoading}
      />
    </div>
  );
};
