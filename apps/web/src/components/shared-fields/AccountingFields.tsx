import React from 'react';
import { Form, TextInput, SegmentedControl } from '@prime/ui';
import { Control, useWatch } from 'react-hook-form';

interface OpeningBalanceFieldProps {
  control: Control<any>;
  label?: string;
  placeholder?: string;
}

export function OpeningBalanceField({ control, label = 'Opening Balance', placeholder = '0.00' }: OpeningBalanceFieldProps) {
  // Watch the value to know if we should default the segmented control or if it is already set
  
  return (
    <div className="flex gap-4 items-start">
      <div className="flex-1">
        <Form.Field
          control={control}
          name="openingBalance"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>{label}</Form.Label>
              <Form.Control>
                <TextInput type="number" placeholder={placeholder} {...field} value={field.value ?? ''} />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>
      
      <div className="w-32">
        <Form.Field
          control={control}
          name="openingBalanceType"
          render={({ field }) => (
            <Form.Item>
              <Form.Label>&nbsp;</Form.Label>
              <Form.Control>
                <SegmentedControl.Root value={field.value} onValueChange={field.onChange}>
                  <SegmentedControl.Item value="Dr">Dr</SegmentedControl.Item>
                  <SegmentedControl.Item value="Cr">Cr</SegmentedControl.Item>
                </SegmentedControl.Root>
              </Form.Control>
              <Form.Message />
            </Form.Item>
          )}
        />
      </div>
    </div>
  );
}
