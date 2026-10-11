import React from 'react';
import { Form, TextInput, SegmentedControl, AutoSuggest, Icon } from '@prime/ui';
import { Control, useWatch, useFormContext } from 'react-hook-form';
import { useLedgerOptions, LedgerFilterFn } from '@/features/Accounts/Ledger/hooks/useLedgerOptions';

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

export interface TaxClassificationFieldProps {
  control?: Control<any>;
  name: string;
  label: string;
  placeholder?: string;
  /**
   * Filter ledgers by sub_category (e.g. 'sales', 'purchase', etc.)
   */
  subCategory?: string;
  /**
   * Custom filter predicate function: (ledger: Ledger) => boolean
   */
  filter?: LedgerFilterFn;
  /**
   * Pre-computed options override if provided by caller
   */
  options?: { label: string; value: string }[];
  /**
   * Loading state override
   */
  isLoading?: boolean;
}

export function TaxClassificationField({
  control,
  name,
  label,
  placeholder = 'Select classification...',
  subCategory,
  filter,
  options: externalOptions,
  isLoading: externalIsLoading,
}: TaxClassificationFieldProps) {
  const formContext = useFormContext();
  const effectiveControl = control || formContext?.control;

  const { options: ledgerOptions, isLoading: isLedgersLoading } = useLedgerOptions({
    subCategory,
    filter,
    options: externalOptions,
  });

  const finalOptions = externalOptions || ledgerOptions;
  const isLoading = externalIsLoading ?? isLedgersLoading;

  return (
    <Form.Field
      control={effectiveControl}
      name={name}
      render={({ field }) => (
        <Form.Item>
          <Form.Label>{label}</Form.Label>
          <Form.Control>
            <AutoSuggest
              value={field.value ?? ''}
              onChange={field.onChange}
              options={finalOptions}
            >
              <AutoSuggest.Input
                placeholder={isLoading ? 'Loading classifications...' : placeholder}
                leftSlot={<Icon name="Search" size={16} className="text-muted-foreground" />}
                disabled={isLoading}
              />
              <AutoSuggest.Content>
                <AutoSuggest.List>
                  <AutoSuggest.Empty>
                    {isLoading ? 'Loading classifications...' : 'No classification found.'}
                  </AutoSuggest.Empty>
                  {finalOptions.map((opt) => (
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
