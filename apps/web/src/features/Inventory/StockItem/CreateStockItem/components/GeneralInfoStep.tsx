import React from 'react';
import { Form, TextInput, AutoSuggest, Icon, DropdownMenu } from '@prime/ui';
import { MasterNameField, MasterParentField } from '@/components/shared-fields/MasterFields';
import { STOCK_ITEM_FORM_FIELDS } from '../constants';

import { useGeneralInfoStep } from './useGeneralInfoStep';

export const GeneralInfoStep = ({ form }: { form: any }) => {
  const {
    stockGroupOptions,
    isLoadingStockGroups,
    categoryOptions,
    isLoadingCategories,
    unitOptions,
    isLoadingUnits,
  } = useGeneralInfoStep();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MasterNameField />
      
      <MasterParentField
        label="Stock Group"
        name={STOCK_ITEM_FORM_FIELDS.PARENT_ID}
        placeholder="Select Stock Group..."
        options={stockGroupOptions}
        isLoading={isLoadingStockGroups}
      />

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
                  placeholder={isLoadingCategories ? 'Loading categories...' : 'Select Stock Category...'} 
                  leftSlot={<Icon name="Search" size={16} className="text-muted-foreground" />}
                  disabled={isLoadingCategories}
                />
                <AutoSuggest.Content>
                  <AutoSuggest.List>
                    <AutoSuggest.Empty>
                      {isLoadingCategories ? 'Loading categories...' : 'No category found.'}
                    </AutoSuggest.Empty>
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
        render={({ field }) => {
          const selectedUnit = unitOptions.find((u) => u.value === field.value);
          const triggerLabel = selectedUnit
            ? selectedUnit.label
            : field.value
              ? field.value
              : isLoadingUnits
                ? 'Loading units...'
                : 'Select Base Unit...';

          return (
            <Form.Item>
              <Form.Label>Unit</Form.Label>
              <Form.Control>
                <DropdownMenu
                  labelVariant="hidden"
                  triggerLabel={triggerLabel}
                  disabled={isLoadingUnits}
                  items={
                    unitOptions.length > 0
                      ? unitOptions.map((u) => ({
                          id: u.value,
                          label: u.label,
                          onSelect: () => field.onChange(u.value),
                        }))
                      : [
                          {
                            id: 'empty',
                            label: isLoadingUnits ? 'Loading units...' : 'No units available',
                            disabled: true,
                            onSelect: () => {},
                          },
                        ]
                  }
                />
              </Form.Control>
              <Form.Message />
            </Form.Item>
          );
        }}
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
