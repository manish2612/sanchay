import React from 'react';
import { Form, TextInput, AutoSuggest, Icon } from '@prime/ui';
import { useFormContext } from 'react-hook-form';

export function MasterNameField() {
  const { control } = useFormContext();
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

export function MasterAliasField() {
  const { control } = useFormContext();
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

interface MasterParentFieldProps {
  label: string;
  name?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  isLoading?: boolean;
  required?: boolean;
}

export function MasterParentField({ 
  label, 
  name = "parentId", 
  placeholder = 'Search parent...', 
  options = [],
  isLoading,
  required,
}: MasterParentFieldProps) {
  const { control } = useFormContext();

  return (
    <Form.Field
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Form.Item>
          <Form.Label>
            {label}
            {required && <span className="text-danger ml-0.5">*</span>}
          </Form.Label>
          <Form.Control>
            <AutoSuggest
              value={field.value ?? ''}
              onChange={field.onChange}
              options={options}
            >
              <AutoSuggest.Input 
                placeholder={isLoading ? 'Loading...' : placeholder} 
                leftSlot={<Icon name="Search" size={16} className="text-muted-foreground" />}
                disabled={isLoading}
                error={!!fieldState.error}
              />
              <AutoSuggest.Content>
                <AutoSuggest.List>
                  <AutoSuggest.Empty>{isLoading ? 'Loading...' : 'No options found.'}</AutoSuggest.Empty>
                  {options.map((opt) => (
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
  );
}
