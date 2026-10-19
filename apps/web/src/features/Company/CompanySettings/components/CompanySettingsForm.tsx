import React from 'react';
import { MinimalSectionHeader } from './MinimalSectionHeader';
import { ToggleRow } from './ToggleRow';
import { DropdownMenu } from '@prime/ui';
import { CompanySettings, StockValuationMethod } from '../types';
import {
  STOCK_VALUATION_OPTIONS,
  ACCOUNTING_SWITCHES,
  INVENTORY_SWITCHES,
  LOGISTICS_SWITCHES,
  ORGANIZATION_SWITCHES,
} from '../constants';

interface CompanySettingsFormProps {
  draft: CompanySettings;
  setField: <K extends keyof CompanySettings>(key: K, value: CompanySettings[K]) => void;
  disabled?: boolean;
}

export function CompanySettingsForm({ draft, setField, disabled }: CompanySettingsFormProps) {
  const currentValuationOption = STOCK_VALUATION_OPTIONS.find(
    (opt) => opt.value === draft.default_stock_valuation_method
  );

  return (
    <div className="space-y-4">
      {/* 1. Organization & Multi-Branch */}
      <section aria-labelledby="section-organization">
        <MinimalSectionHeader title="Organization & Branches" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {ORGANIZATION_SWITCHES.map((item) => (
            <ToggleRow
              key={item.key}
              id={item.key}
              label={item.label}
              description={item.description}
              checked={Boolean(draft[item.key])}
              disabled={disabled}
              onChange={(val) => setField(item.key, val)}
            />
          ))}
        </div>
      </section>

      {/* 2. Accounting & Financial Controls */}
      <section aria-labelledby="section-accounting">
        <MinimalSectionHeader title="Accounting & Financials" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {ACCOUNTING_SWITCHES.map((item) => (
            <ToggleRow
              key={item.key}
              id={item.key}
              label={item.label}
              description={item.description}
              checked={Boolean(draft[item.key])}
              disabled={disabled}
              onChange={(val) => setField(item.key, val)}
            />
          ))}
        </div>
      </section>

      {/* 3. Inventory & Stock Controls */}
      <section aria-labelledby="section-inventory">
        <MinimalSectionHeader title="Inventory & Stock Controls" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {INVENTORY_SWITCHES.map((item) => (
            <ToggleRow
              key={item.key}
              id={item.key}
              label={item.label}
              description={item.description}
              checked={Boolean(draft[item.key])}
              disabled={disabled}
              onChange={(val) => setField(item.key, val)}
            />
          ))}
        </div>
      </section>

      {/* 4. Fulfillment & Logistics */}
      <section aria-labelledby="section-logistics">
        <MinimalSectionHeader title="Fulfillment & Logistics" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
          {LOGISTICS_SWITCHES.map((item) => (
            <ToggleRow
              key={item.key}
              id={item.key}
              label={item.label}
              description={item.description}
              checked={Boolean(draft[item.key])}
              disabled={disabled}
              onChange={(val) => setField(item.key, val)}
            />
          ))}
        </div>
      </section>

      {/* 5. Inventory Valuation Method (Dropdown) */}
      <section aria-labelledby="section-valuation">
        <MinimalSectionHeader title="Inventory Valuation & Costing" />
        <div className="p-3.5 rounded-xl border border-border bg-surface mt-1 space-y-2.5">
          <div className="flex flex-col gap-0.5">
            <label className="text-sm font-medium text-foreground">
              Default Stock Valuation Method
            </label>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Determines how closing stock value and Cost of Goods Sold (COGS) are computed across financial statements.
            </p>
          </div>

          <div className="max-w-md">
            <DropdownMenu
              label="Stock Valuation Method"
              labelVariant="in-field"
              triggerLabel={currentValuationOption?.label || 'Select valuation method'}
              items={STOCK_VALUATION_OPTIONS.map((opt) => ({
                id: opt.value,
                label: opt.label,
                onSelect: () => setField('default_stock_valuation_method', opt.value),
              }))}
              disabled={disabled}
            />
          </div>

          {currentValuationOption && (
            <p className="text-[11px] font-mono text-muted-foreground bg-muted/60 px-2.5 py-1.5 rounded-md">
              ℹ️ {currentValuationOption.description}
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
