import React from 'react';
import { Form, TextInput, AnimatedNumber } from '@prime/ui';
import { SwitchCard } from '@/components/TableCells/SwitchCard';
import { STOCK_ITEM_FORM_FIELDS } from '../constants';
import { GodownAllocationTable } from './GodownAllocationTable';

export const OpeningBalanceStep = ({ form }: { form: any }) => {
  const enableGodownAllocation = form.watch(STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION);
  const openingQuantity = Number(form.watch(STOCK_ITEM_FORM_FIELDS.OPENING_QUANTITY)) || 0;

  // If godown is enabled and OQI > 0, rate and amount become read-only animated numbers
  const isGodownActive = enableGodownAllocation && openingQuantity > 0;

  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4 border-b border-border/40">
        <SwitchCard
          control={form.control}
          name={STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION}
          label="Enable Godown Allocation"
        />
        <SwitchCard
          control={form.control}
          name={STOCK_ITEM_FORM_FIELDS.MAINTAIN_BATCHES}
          label="Maintain Batches"
        />
        <SwitchCard
          control={form.control}
          name={STOCK_ITEM_FORM_FIELDS.TRACK_MFG_DATE}
          label="Track Manufacturing Date"
        />
        <SwitchCard
          control={form.control}
          name={STOCK_ITEM_FORM_FIELDS.TRACK_EXPIRY_DATE}
          label="Track Expiry Date"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Form.Field
          control={form.control}
          name={STOCK_ITEM_FORM_FIELDS.OPENING_QUANTITY}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Quantity</Form.Label>
              <Form.Control>
                <TextInput type="number" placeholder="0" {...field} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name={STOCK_ITEM_FORM_FIELDS.OPENING_RATE}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Rate</Form.Label>
              <Form.Control>
                {isGodownActive ? (
                  <div className="h-9 flex items-center justify-end px-3 text-sm text-foreground w-full tabular-nums font-medium">
                    <AnimatedNumber
                      value={Number(field.value) || 0}
                      formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                    />
                  </div>
                ) : (
                  <TextInput type="number" placeholder="0.00" {...field} />
                )}
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />

        <Form.Field
          control={form.control}
          name={STOCK_ITEM_FORM_FIELDS.OPENING_AMOUNT}
          render={({ field }) => (
            <Form.Item>
              <Form.Label>Amount</Form.Label>
              <Form.Control>
                {isGodownActive ? (
                  <div className="h-9 flex items-center justify-end px-3 text-sm text-foreground w-full tabular-nums font-medium">
                    <AnimatedNumber
                      value={Number(field.value) || 0}
                      formatOptions={{ minimumFractionDigits: 2, maximumFractionDigits: 2 }}
                    />
                  </div>
                ) : (
                  <TextInput type="number" placeholder="0.00" {...field} />
                )}
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>

      <GodownAllocationTable form={form} />
    </div>
  );
};
