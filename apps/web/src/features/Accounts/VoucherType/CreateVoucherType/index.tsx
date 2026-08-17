'use client';

import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { FormWizard, Icon, useFormWizardContext } from '@prime/ui';
import { useLeavePrompt } from '@/hooks/useLeavePrompt';

import { voucherTypeSchema, type VoucherTypeFormValues } from './schema';
import { VOUCHER_TYPE_FIELDS, INITIAL_STEPS, DYNAMIC_STEPS } from './constants';

import { BasicDetailsStep } from './components/BasicDetailsStep';
import { VoucherNumberingTable } from './components/VoucherNumberingTable';
import { DefaultLedgersStep } from './components/DefaultLedgersStep';
import { ConfigurationsStep } from './components/ConfigurationsStep';

const WizardContent = ({ form }: { form: any }) => {
  const { currentStep, addStep, removeStep, steps } = useFormWizardContext();
  const parentValue = useWatch({
    control: form.control,
    name: VOUCHER_TYPE_FIELDS.PARENT,
  });

  useEffect(() => {
    if (parentValue?.toLowerCase() === 'sales') {
      addStep(DYNAMIC_STEPS[0], 'voucher-numbering'); // default-ledgers
      addStep(DYNAMIC_STEPS[1], 'default-ledgers'); // configurations
    } else {
      removeStep('default-ledgers');
      removeStep('configurations');
    }
  }, [parentValue, addStep, removeStep]);

  const activeStepId = steps[currentStep - 1]?.id;

  const isStep1 = activeStepId === 1;
  const isStep2 = activeStepId === 'voucher-numbering';
  const isDefaultLedgers = activeStepId === 'default-ledgers';
  const isConfigurations = activeStepId === 'configurations';

  const isTableStep = activeStepId === 'voucher-numbering';
  const maxWidthClass = isTableStep ? 'max-w-6xl' : 'max-w-4xl';

  return (
    <FormWizard.Content>
      <div className={`space-y-6 mx-auto mt-4 transition-all duration-300 ${maxWidthClass}`}>
        {isStep1 && <BasicDetailsStep form={form} />}
        {isStep2 && <VoucherNumberingTable form={form} />}
        {isDefaultLedgers && <DefaultLedgersStep form={form} />}
        {isConfigurations && <ConfigurationsStep form={form} />}
      </div>
    </FormWizard.Content>
  );
};

const FormWizardHeaderWithContext = () => {
  const { currentStep, steps } = useFormWizardContext();
  const stepConfig = steps.find((s) => s.id === currentStep);

  return (
    <FormWizard.Header
      graphic={<Icon name="FileText" size={48} className="stroke-[1.25] text-primary" />}
      title={stepConfig?.title || 'Create Voucher Type'}
      subtitle={stepConfig?.description}
    />
  );
};

const WizardContainerWithWidth = ({ children }: { children: React.ReactNode }) => {
  const { currentStep, steps } = useFormWizardContext();
  const activeStepId = steps[currentStep - 1]?.id;
  const isTableStep = activeStepId === 'voucher-numbering';
  
  // Use Tailwind's !important modifier to override FormContainer's baked-in max-w-[800px]
  const containerWidthClass = isTableStep ? '!max-w-6xl' : '';

  return (
    <FormWizard.Container className={`transition-all duration-300 ${containerWidthClass}`}>
      {children}
    </FormWizard.Container>
  );
};

export const CreateVoucherType = () => {
  const navigate = useNavigate();

  const form = useForm<VoucherTypeFormValues>({
    mode: 'onChange',
    resolver: zodResolver(voucherTypeSchema),
    defaultValues: {
      [VOUCHER_TYPE_FIELDS.NAME]: '',
      [VOUCHER_TYPE_FIELDS.PARENT]: '',
      [VOUCHER_TYPE_FIELDS.DEFAULT_VIEWING_MODE]: '',
      [VOUCHER_TYPE_FIELDS.SET_AS_DEFAULT]: false,
      [VOUCHER_TYPE_FIELDS.DECLARATION]: '',
      [VOUCHER_TYPE_FIELDS.APPLY_TAX]: '',
      [VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING]: [],
      [VOUCHER_TYPE_FIELDS.CASH_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.BANK_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.SALES_PURCHASE_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.EXPORT_IMPORT_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.DISCOUNT_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.ROUNDING_OFF_LEDGER]: '',
      [VOUCHER_TYPE_FIELDS.EXCISE_DUTY_APPLICABLE]: false,
      [VOUCHER_TYPE_FIELDS.DISCOUNT_AT_BILL_LEVEL]: false,
      [VOUCHER_TYPE_FIELDS.DISCOUNT_AT_ITEM_LEVEL]: false,
      [VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_ITEM]: false,
      [VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_LEDGER]: false,
      [VOUCHER_TYPE_FIELDS.USE_FOR_POS]: false,
      [VOUCHER_TYPE_FIELDS.PRINT_CONFIGURABLE]: false,
      [VOUCHER_TYPE_FIELDS.PRINT_AFTER_SAVE]: false,
      [VOUCHER_TYPE_FIELDS.NEW_MODE_AFTER_SAVE]: false,
      [VOUCHER_TYPE_FIELDS.COL_FREE_QTY]: false,
      [VOUCHER_TYPE_FIELDS.COL_ALT_QTY]: false,
      [VOUCHER_TYPE_FIELDS.COL_RATE]: false,
      [VOUCHER_TYPE_FIELDS.COL_NET_RATE]: false,
      [VOUCHER_TYPE_FIELDS.COL_GROSS_AMOUNT]: false,
    },
  });

  const { LeavePromptDialog } = useLeavePrompt({
    form,
    disabled: form.formState.isSubmitSuccessful,
  });

  const onSubmit = (data: VoucherTypeFormValues) => {
    console.log('Submitted voucher type data:', data);
    alert('Voucher Type created successfully! Check console for details.');
    // In actual app, navigate somewhere. Using a placeholder path.
    navigate({ to: '/accounts/masters' as any });
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={INITIAL_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title="Create New Voucher Type" />

        <WizardContainerWithWidth>
          <FormWizardHeaderWithContext />

          <WizardContent form={form} />

          <FormWizard.Footer onCancel={() => navigate({ to: '/accounts/masters' as any })} />
        </WizardContainerWithWidth>
      </FormWizard>
      
      <LeavePromptDialog />
    </div>
  );
};
