import React from 'react';
import { Form, TextInput, AutoSuggest, Icon } from '@prime/ui';
import { Control } from 'react-hook-form';

interface BaseMasterFieldProps {
  control: Control<any>;
}

export function MasterNameField({ control }: BaseMasterFieldProps) {
  return (
    <Form.Field
      control={control}
      name="name"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>Name</Form.Label>
          <Form.Control>
            <TextInput placeholder="Enter name" {...field} />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}

export function MasterAliasField({ control }: BaseMasterFieldProps) {
  return (
    <Form.Field
      control={control}
      name="alias"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>
            Alias <span className="text-[11px] font-normal text-muted-foreground ml-1">(Optional)</span>
          </Form.Label>
          <Form.Control>
            <TextInput placeholder="Enter alias" {...field} value={field.value ?? ''} />
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}

interface MasterParentFieldProps extends BaseMasterFieldProps {
  label: string;
  placeholder?: string;
}

export function MasterParentField({ control, label, placeholder = 'Search parent...' }: MasterParentFieldProps) {
  const dummyOptions = [
    { label: 'Primary', value: 'p1' },
    { label: 'Secondary', value: 'p2' },
  ];

  return (
    <Form.Field
      control={control}
      name="parentId"
      render={({ field }) => (
        <Form.Item>
          <Form.Label>{label}</Form.Label>
          <Form.Control>
            <AutoSuggest
              value={field.value ?? ''}
              onChange={field.onChange}
              options={dummyOptions}
              virtualized={true}
            >
              <AutoSuggest.Input 
                placeholder={placeholder} 
                leftSlot={<Icon name="Search" size={16} className="text-muted-foreground" />}
              />
              <AutoSuggest.Content>
                <AutoSuggest.VirtualizedList
                  emptyMessage="No parents found."
                  renderItem={(opt) => (
                    <AutoSuggest.Item key={opt.value} value={opt.value}>
                      {opt.label}
                    </AutoSuggest.Item>
                  )}
                />
              </AutoSuggest.Content>
            </AutoSuggest>
          </Form.Control>
          <Form.Message />
        </Form.Item>
      )}
    />
  );
}
