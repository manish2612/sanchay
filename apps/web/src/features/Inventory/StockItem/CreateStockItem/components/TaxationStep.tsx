import React from 'react';
import { TaxClassificationField } from '@/components/shared-fields/AccountingFields';
import { STOCK_ITEM_FORM_FIELDS } from '../constants';

import { useTaxationStep, TAXATION_SUBCATEGORIES } from './useTaxationStep';

export const TaxationStep = ({ form }: { form: any }) => {
  const {
    localSalesFilter,
    exportSalesFilter,
    localPurchaseFilter,
    exportPurchaseFilter,
  } = useTaxationStep();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <TaxClassificationField 
        control={form.control} 
        name={STOCK_ITEM_FORM_FIELDS.LOCAL_SALES_TAX} 
        label="Local / Interstate Sales" 
        subCategory={TAXATION_SUBCATEGORIES.LOCAL_SALES}
        filter={localSalesFilter}
      />
      
      <TaxClassificationField 
        control={form.control} 
        name={STOCK_ITEM_FORM_FIELDS.EXPORT_SALES_TAX} 
        label="Export Sales" 
        subCategory={TAXATION_SUBCATEGORIES.EXPORT_SALES}
        filter={exportSalesFilter}
      />

      <TaxClassificationField 
        control={form.control} 
        name={STOCK_ITEM_FORM_FIELDS.LOCAL_PURCHASE_TAX} 
        label="Local / Interstate Purchase" 
        subCategory={TAXATION_SUBCATEGORIES.LOCAL_PURCHASE}
        filter={localPurchaseFilter}
      />
      
      <TaxClassificationField 
        control={form.control} 
        name={STOCK_ITEM_FORM_FIELDS.EXPORT_PURCHASE_TAX} 
        label="Export Purchase" 
        subCategory={TAXATION_SUBCATEGORIES.EXPORT_PURCHASE}
        filter={exportPurchaseFilter}
      />
    </div>
  );
};

