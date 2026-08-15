import React from 'react';
import { MultiUnitTable } from './MultiUnitTable';
import { StandardRatesTable } from './StandardRatesTable';

export const AdvancedDetailsStep = ({ form }: { form: any }) => {
  return (
    <div className="space-y-8 max-w-4xl">
      <MultiUnitTable form={form} />
      <StandardRatesTable form={form} />
    </div>
  );
};
