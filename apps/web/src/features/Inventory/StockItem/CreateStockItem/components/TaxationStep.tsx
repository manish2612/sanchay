import React from 'react';
import { Text } from '@prime/ui';
import {
  LocalSalesTaxField,
  ExportSalesTaxField,
  LocalPurchaseTaxField,
  ExportPurchaseTaxField,
} from '@/components/shared-fields/AccountingFields';
import { TaxRatesTable } from '@/components/TaxRatesTable';
import { STOCK_ITEM_FORM_FIELDS } from '../constants';

export const TaxationStep = ({ form }: { form: any }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <LocalSalesTaxField control={form.control} />
        <ExportSalesTaxField control={form.control} />
        <LocalPurchaseTaxField control={form.control} />
        <ExportPurchaseTaxField control={form.control} />
      </div>

      {/* Tax Rates Table */}
      <div className="pt-4 border-t border-border/60">
        <div className="flex flex-col gap-2 bg-surface/50 overflow-hidden">
          <div className="flex justify-between items-center mb-1">
            <div>
              <Text variant="body" className="font-semibold text-foreground text-sm">
                Tax Rates
              </Text>
              <Text variant="body" className="text-muted-foreground text-xs">
                Configure tax groups and applicable rates for this stock item.
              </Text>
            </div>
            <span className="text-xs text-muted-foreground hidden sm:inline">
              Press Tab or Enter on row to add more
            </span>
          </div>
          <div className="relative min-h-0 flex-1">
            <TaxRatesTable form={form} name={STOCK_ITEM_FORM_FIELDS.TAX_RATES} />
          </div>
        </div>
      </div>
    </div>
  );
};
