import React from 'react';
import { Form, TextInput } from '@prime/ui';
import { STOCK_ITEM_FORM_FIELDS } from '../constants';

export const OpeningBalanceStep = ({ form }: { form: any }) => {
  return (
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
              <TextInput type="number" placeholder="0.00" {...field} />
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
              <TextInput type="number" placeholder="0.00" {...field} />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
    </div>
  );
};
