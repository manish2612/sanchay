import React from 'react';
import { TaxClassificationField } from '@/components/shared-fields/AccountingFields';
import { STOCK_ITEM_FORM_FIELDS } from '../constants';

export const TaxationStep = ({ form }: { form: any }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TaxClassificationField 
        control={form.control} 
        name={STOCK_ITEM_FORM_FIELDS.LOCAL_SALES_TAX} 
        label="Local / Interstate Sales" 
      />
      
      <TaxClassificationField 
        control={form.control} 
        name={STOCK_ITEM_FORM_FIELDS.EXPORT_SALES_TAX} 
        label="Export Sales" 
      />

      <TaxClassificationField 
        control={form.control} 
        name={STOCK_ITEM_FORM_FIELDS.LOCAL_PURCHASE_TAX} 
        label="Local / Interstate Purchase" 
      />
      
      <TaxClassificationField 
        control={form.control} 
        name={STOCK_ITEM_FORM_FIELDS.EXPORT_PURCHASE_TAX} 
        label="Export Purchase" 
      />
    </div>
  );
};
