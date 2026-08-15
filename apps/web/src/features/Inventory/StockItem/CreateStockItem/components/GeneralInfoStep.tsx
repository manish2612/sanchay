import React from 'react';
import { Form, TextInput, AutoSuggest, Icon } from '@prime/ui';
import { MasterNameField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { STOCK_ITEM_FORM_FIELDS } from '../constants';

export const GeneralInfoStep = ({ form }: { form: any }) => {
  const categoryOptions = [
    { label: 'Primary Category', value: 'c1' },
    { label: 'Secondary Category', value: 'c2' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MasterNameField control={form.control} />
      
      <MasterParentField control={form.control} label="Stock Group" placeholder="Select Stock Group..." />

      <Form.Field
        control={form.control}
        name={STOCK_ITEM_FORM_FIELDS.CATEGORY_ID}
        render={({ field }) => (
          <Form.Item>
            <Form.Label>Stock Category</Form.Label>
            <Form.Control>
              <AutoSuggest
                value={field.value ?? ''}
                onChange={field.onChange}
                options={categoryOptions}
              >
                <AutoSuggest.Input 
                  placeholder="Select Stock Category..." 
                  leftSlot={<Icon name="Search" size={16} className="text-muted-foreground" />}
                />
                <AutoSuggest.Content>
                  <AutoSuggest.List>
                    <AutoSuggest.Empty>No category found.</AutoSuggest.Empty>
                    {categoryOptions.map((opt) => (
                      <AutoSuggest.Item key={opt.value} value={opt.value} keywords={[opt.label]}>
                        {opt.label}
                      </AutoSuggest.Item>
                    ))}
                  </AutoSuggest.List>
                </AutoSuggest.Content>
              </AutoSuggest>
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />

      <Form.Field
        control={form.control}
        name={STOCK_ITEM_FORM_FIELDS.UNIT}
        render={({ field }) => (
          <Form.Item>
            <Form.Label>Unit</Form.Label>
            <Form.Control>
              <TextInput type="number" placeholder="Enter Base Unit..." {...field} />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
      
      <Form.Field
        control={form.control}
        name={STOCK_ITEM_FORM_FIELDS.HSN_SAC}
        render={({ field }) => (
          <Form.Item>
            <Form.Label>HSN/SAC</Form.Label>
            <Form.Control>
              <TextInput placeholder="Enter HSN/SAC..." {...field} />
            </Form.Control>
            <Form.Message />
          </Form.Item>
        )}
      />
    </div>
  );
};
