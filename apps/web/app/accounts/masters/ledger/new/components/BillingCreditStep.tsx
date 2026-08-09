'use client';

import React from 'react';
import { Form, TextInput, Switch, SegmentedControl, Icon, Text } from '@prime/ui';
import { UseFormReturn } from 'react-hook-form';
import { LedgerFormValues } from '../schema';
import { LEDGER_FORM_FIELDS } from '../constants';

interface BillingCreditStepProps {
  form: UseFormReturn<LedgerFormValues>;
}

export const BillingCreditStep = ({ form }: BillingCreditStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Bill by Bill */}
      <Form.Field
        control={form.control}
        name={LEDGER_FORM_FIELDS.IS_BILL_BY_BILL}
        render={({ field }) => (
          <Form.Item className="flex flex-row items-center justify-between rounded-lg mb-1 shadow-sm bg-surface md:col-span-2">
            <div className="flex flex-col gap-0.5">
              <Form.Label>Maintain balances bill by bill</Form.Label>
              <Text variant="body" className="text-xs text-muted-foreground">
                Track each bill separately for outstanding reports.
              </Text>
            </div>
            <Form.Control>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </Form.Control>
          </Form.Item>
        )}
      />

      {/* Block Sales Bill */}
      <Form.Field
        control={form.control}
        name={LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED}
        render={({ field }) => (
          <Form.Item className="flex flex-row items-center justify-between rounded-lg mb-3 shadow-sm bg-surface md:col-span-2">
            <div className="flex flex-col gap-0.5">
              <Form.Label>Block Sales Bill</Form.Label>
              <Text variant="body" className="text-xs text-muted-foreground">
                This is applicable if the credit limit exceeds.
              </Text>
            </div>
            <Form.Control>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </Form.Control>
          </Form.Item>
        )}
      />

      {/* Credit Limits */}
      <Form.Field
        control={form.control}
        name={LEDGER_FORM_FIELDS.CREDIT_PERIOD}
        render={({ field }) => (
          <Form.Item>
            <Form.Control>
              <TextInput
                {...field}
                label="Credit Period (Days)"
                labelVariant="in-field"
                placeholder="e.g. 30"
                type="number"
                leftSlot={<Icon name="Calendar" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={LEDGER_FORM_FIELDS.CREDIT_LIMIT}
        render={({ field }) => (
          <Form.Item>
            <Form.Control>
              <TextInput
                {...field}
                label="Credit Limit Amount"
                labelVariant="in-field"
                placeholder="e.g. 500000"
                type="number"
                leftSlot={<Icon name="Banknote" size={16} className="text-muted-foreground" />}
              />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      {/* Opening Balance */}
      <div className="col-span-1 md:col-span-2 grid grid-cols-[1fr_auto] gap-2 items-start mt-2">
        <Form.Field
          control={form.control}
          name={LEDGER_FORM_FIELDS.OPENING_BALANCE}
          render={({ field }) => (
            <Form.Item>
              <Form.Control>
                <TextInput
                  {...field}
                  label="Opening Balance"
                  labelVariant="in-field"
                  placeholder="0.00"
                  type="number"
                  leftSlot={<Icon name="Wallet" size={16} className="text-muted-foreground" />}
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name={LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE}
          render={({ field }) => (
            <Form.Item className="mt-1">
              <Form.Control>
                <SegmentedControl.Root value={field.value} onValueChange={field.onChange}>
                  <SegmentedControl.Item value="Dr">Debit</SegmentedControl.Item>
                  <SegmentedControl.Item value="Cr">Credit</SegmentedControl.Item>
                </SegmentedControl.Root>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>
    </div>
  );
};
