import React from 'react';
import {
  LocalSalesTaxField,
  ExportSalesTaxField,
  LocalPurchaseTaxField,
  ExportPurchaseTaxField,
} from '@/components/shared-fields/AccountingFields';

export const TaxationStep = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <LocalSalesTaxField control={form.control} />
      <ExportSalesTaxField control={form.control} />
      <LocalPurchaseTaxField control={form.control} />
      <ExportPurchaseTaxField control={form.control} />
    </div>
  );
};
