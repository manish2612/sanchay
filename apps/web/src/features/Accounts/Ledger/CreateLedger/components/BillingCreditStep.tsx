'use client';

import React from 'react';
import { Form, TextInput, SegmentedControl, Icon, Text, AnimatedNumber } from '@prime/ui';
import { UseFormReturn, useWatch } from 'react-hook-form';
import { LedgerFormValues } from '../schema';
import { LEDGER_FORM_FIELDS } from '../constants';
import { CostCenterAllocationTable } from '@/features/CostCenter/components/CostCenterAllocationTable';
import { TaxRatesTable } from '@/components/TaxRatesTable';
import { SwitchCard } from '@/components/TableCells/SwitchCard';

interface BillingCreditStepProps {
  form: UseFormReturn<LedgerFormValues>;
}

export const BillingCreditStep = ({ form }: BillingCreditStepProps) => {
  const openingBalance =
    useWatch({
      control: form.control,
      name: LEDGER_FORM_FIELDS.OPENING_BALANCE,
    }) || '0';

  const isCostCenterEnabled =
    useWatch({
      control: form.control,
      name: LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED,
    }) || false;

  const costCenterAllocations =
    useWatch({
      control: form.control,
      name: LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS,
    }) || [];

  const targetAmount = parseFloat(openingBalance.replace(/[^0-9.-]+/g, '')) || 0;

  const allocatedAmount = costCenterAllocations.reduce((sum, row: any) => {
    if (row.isPhantom) return sum;
    const amtString = typeof row.amount === 'string' ? row.amount : String(row.amount || '');
    const amt = parseFloat(amtString.replace(/[^0-9.-]+/g, '')) || 0;
    return sum + amt;
  }, 0);

  const isBalanced = Math.abs(allocatedAmount - targetAmount) < 0.001;
  const remainingAmount = Math.max(0, targetAmount - allocatedAmount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Bill by Bill & Block Sales Bill side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 col-span-1 md:col-span-2">
        <SwitchCard
          control={form.control}
          name={LEDGER_FORM_FIELDS.IS_BILL_BY_BILL}
          label="Bill by Bill"
          description="Track bills separately"
          className="p-3"
        />

        <SwitchCard
          control={form.control}
          name={LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED}
          label="Block Sales Bill"
          description="When limit exceeds"
          className="p-3"
        />
      </div>

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

      {/* Opening Balance, Debit/Credit & Enable Cost Center */}
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row gap-3 items-stretch md:items-start mt-2">
        <div className="flex-1 min-w-[200px]">
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
        </div>

        <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
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

          <SwitchCard
            control={form.control}
            name={LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED}
            label="Enable Cost Center"
            className="px-3.5 py-2 h-10 mt-1 min-w-[185px]"
          />
        </div>
      </div>

      {/* Cost Center Allocations */}
      {isCostCenterEnabled && targetAmount > 0 && (
        <Form.Field
          control={form.control}
          name={LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS}
          render={({ field }) => (
            <Form.Item className="col-span-1 md:col-span-2 mt-4">
              <Form.Control>
                <div className="flex flex-col gap-2 bg-surface/50 overflow-hidden">
                  <div className="flex justify-between items-center mb-2">
                    <Text variant="body" className="font-medium text-foreground">
                      Cost Centre Allocations
                    </Text>
                    {isBalanced ? (
                      <span className="text-xs font-medium text-success flex items-center gap-1">
                        <Icon name="Check" size={14} /> Balanced
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-destructive flex items-center gap-1">
                        Remaining:
                        <AnimatedNumber value={remainingAmount} formatOptions={{ style: 'currency', currency: 'INR' }} />
                      </span>
                    )}
                  </div>
                  <div className="relative min-h-0 flex-1">
                    <CostCenterAllocationTable
                      initialAllocations={field.value || []}
                      targetAmount={targetAmount}
                      onChange={field.onChange}
                    />
                  </div>
                </div>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      )}

      {/* Tax Rates Table */}
      <div className="col-span-1 md:col-span-2 mt-4 pt-4 border-t border-border/60">
        <div className="flex flex-col gap-2 bg-surface/50 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <div>
              <Text variant="body" className="font-semibold text-foreground text-sm">
                Tax Rates
              </Text>
              <Text variant="caption" className="text-muted-foreground text-xs">
                Configure tax groups and applicable rates for this ledger.
              </Text>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Press Tab or Enter on row to add more
            </span>
          </div>
          <div className="relative min-h-0 flex-1">
            <TaxRatesTable form={form} />
          </div>
        </div>
      </div>
    </div>
  );
};
