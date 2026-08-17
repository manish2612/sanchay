'use client';

import React from 'react';
import { Form, Switch, FormWizard } from '@prime/ui';
import { UseFormReturn } from 'react-hook-form';
import { VoucherTypeFormValues } from '../schema';
import { VOUCHER_TYPE_FIELDS } from '../constants';

import { SwitchCard } from '../../../../components/TableCells/SwitchCard';

interface ConfigurationsStepProps {
  form: UseFormReturn<VoucherTypeFormValues>;
}

export const ConfigurationsStep = ({ form }: ConfigurationsStepProps) => {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-lg font-medium whitespace-nowrap">General</h3>
          <FormWizard.Separator className="flex-1 my-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SwitchCard name={VOUCHER_TYPE_FIELDS.EXCISE_DUTY_APPLICABLE} label="Excise Duty Applicable" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.DISCOUNT_AT_BILL_LEVEL} label="Discount at Bill Level" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.DISCOUNT_AT_ITEM_LEVEL} label="Discount at Item Level" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_ITEM} label="Allow Zero Value Item" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_LEDGER} label="Allow Zero Value Ledger" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.USE_FOR_POS} label="Use for POS" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-lg font-medium whitespace-nowrap">Print Options</h3>
          <FormWizard.Separator className="flex-1 my-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SwitchCard name={VOUCHER_TYPE_FIELDS.PRINT_CONFIGURABLE} label="Configurable" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.PRINT_AFTER_SAVE} label="Print after Save" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.NEW_MODE_AFTER_SAVE} label="New Mode after Save" />
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4 mb-4">
          <h3 className="text-lg font-medium whitespace-nowrap">Column Visibility</h3>
          <FormWizard.Separator className="flex-1 my-0" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SwitchCard name={VOUCHER_TYPE_FIELDS.COL_FREE_QTY} label="Free Qty" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.COL_ALT_QTY} label="Alt Qty" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.COL_RATE} label="Rate" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.COL_NET_RATE} label="Net Rate" />
          <SwitchCard name={VOUCHER_TYPE_FIELDS.COL_GROSS_AMOUNT} label="Gross Amount" />
        </div>
      </div>
    </div>
  );
};
