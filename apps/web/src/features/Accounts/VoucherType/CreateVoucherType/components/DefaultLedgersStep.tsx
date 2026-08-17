'use client';

import React, { useState } from 'react';
import { Form, AutoSuggest } from '@prime/ui';
import { UseFormReturn } from 'react-hook-form';
import { VoucherTypeFormValues } from '../schema';
import { VOUCHER_TYPE_FIELDS } from '../constants';

interface DefaultLedgersStepProps {
  form: UseFormReturn<VoucherTypeFormValues>;
}

// Dummy options for ledgers
const DUMMY_LEDGERS = [
  { label: 'Cash', value: 'cash' },
  { label: 'Bank', value: 'bank' },
  { label: 'Sales A/C', value: 'sales_ac' },
  { label: 'Purchase A/C', value: 'purchase_ac' },
  { label: 'Discount A/C', value: 'discount_ac' },
  { label: 'Rounding Off', value: 'rounding_off' },
];

export const DefaultLedgersStep = ({ form }: DefaultLedgersStepProps) => {
  const [queries, setQueries] = useState<Record<string, string>>({});

  const getFilteredOptions = (query = '') =>
    DUMMY_LEDGERS.filter((l) => l.label.toLowerCase().includes(query.toLowerCase()));

  const renderAutoSuggest = (name: any, label: string) => {
    const q = queries[name] || form.getValues(name) || '';
    const filtered = getFilteredOptions(q);

    return (
      <Form.Field
        key={name}
        control={form.control}
        name={name}
        render={({ field }) => (
          <Form.Item>
            <AutoSuggest
              inputValue={q}
              onInputChange={(v) => {
                setQueries((prev) => ({ ...prev, [name]: v }));
                field.onChange(v);
              }}
              options={filtered}
            >
              <AutoSuggest.Input label={label} labelVariant="in-field" placeholder={`Select ${label}...`} />
              <AutoSuggest.Content>
                <AutoSuggest.List>
                  <AutoSuggest.Empty>No ledger found.</AutoSuggest.Empty>
                  {filtered.map((opt) => (
                    <AutoSuggest.Item
                      key={opt.value}
                      value={opt.label}
                      onSelect={() => {
                        field.onChange(opt.label);
                        setQueries((prev) => ({ ...prev, [name]: opt.label }));
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {renderAutoSuggest(VOUCHER_TYPE_FIELDS.CASH_LEDGER, 'Cash Ledger')}
      {renderAutoSuggest(VOUCHER_TYPE_FIELDS.BANK_LEDGER, 'Bank Ledger')}
      {renderAutoSuggest(VOUCHER_TYPE_FIELDS.SALES_PURCHASE_LEDGER, 'Sales/Purchase Ledger')}
      {renderAutoSuggest(VOUCHER_TYPE_FIELDS.EXPORT_IMPORT_LEDGER, 'Export/Import Ledger')}
      {renderAutoSuggest(VOUCHER_TYPE_FIELDS.DISCOUNT_LEDGER, 'Discount Ledger')}
      {renderAutoSuggest(VOUCHER_TYPE_FIELDS.ROUNDING_OFF_LEDGER, 'Rounding Off Ledger')}
    </div>
  );
};
