'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { FormWizard, Icon, useFormWizardContext } from '@prime/ui';

import { ledgerFormSchema, type LedgerFormValues } from './schema';
import { LEDGER_FORM_FIELDS, LEDGER_WIZARD_STEPS } from './constants';

import { GeneralInfoStep } from './components/GeneralInfoStep';
import { BillingCreditStep } from './components/BillingCreditStep';
import { AddressStep } from './components/AddressStep';
import { ContactStep } from './components/ContactStep';
import { GeneralInfoGraphic } from './components/graphics/GeneralInfoGraphic';
import { BillingCreditGraphic } from './components/graphics/BillingCreditGraphic';
import { ContactGraphic } from './components/graphics/ContactGraphic';
import { ContactLocationGraphic } from '@/features/Company/CreateCompany/components/graphics/ContactLocationGraphic';

const WizardContent = ({ form }: { form: any }) => {
  const { currentStep } = useFormWizardContext();

  return (
    <FormWizard.Content>
      <div className="space-y-6 max-w-2xl mx-auto mt-4">
        {currentStep === 1 && <GeneralInfoStep form={form} />}
        {currentStep === 2 && <BillingCreditStep form={form} />}
        {currentStep === 3 && <AddressStep form={form} />}
        {currentStep === 4 && <ContactStep form={form} />}
      </div>
    </FormWizard.Content>
  );
};

const FormWizardHeaderWithContext = ({
  getHeaderIcon,
}: {
  getHeaderIcon: (step: number) => React.ReactNode;
}) => {
  const { currentStep } = useFormWizardContext();
  const stepConfig = LEDGER_WIZARD_STEPS.find((s) => s.id === currentStep);

  return (
    <FormWizard.Header
      graphic={getHeaderIcon(currentStep)}
      title={stepConfig?.title || 'Create Ledger'}
      subtitle={stepConfig?.description}
    />
  );
};

const CreateLedgerPage = () => {
  const navigate = useNavigate();

  const form = useForm<LedgerFormValues>({
    mode: 'onChange',
    resolver: zodResolver(ledgerFormSchema),
    defaultValues: {
      [LEDGER_FORM_FIELDS.NAME]: '',
      [LEDGER_FORM_FIELDS.ALIAS]: '',
      [LEDGER_FORM_FIELDS.UNDER]: '',
      [LEDGER_FORM_FIELDS.ACCOUNT_CODE]: '',
      [LEDGER_FORM_FIELDS.REGISTRATION_TYPE]: '',
      [LEDGER_FORM_FIELDS.REGISTRATION_NUMBER]: '',
      [LEDGER_FORM_FIELDS.IS_BILL_BY_BILL]: false,
      [LEDGER_FORM_FIELDS.CREDIT_PERIOD]: '',
      [LEDGER_FORM_FIELDS.CREDIT_LIMIT]: '',
      [LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED]: false,
      [LEDGER_FORM_FIELDS.OPENING_BALANCE]: '',
      [LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE]: 'Dr',
      [LEDGER_FORM_FIELDS.COUNTRY]: '',
      [LEDGER_FORM_FIELDS.STATE]: '',
      [LEDGER_FORM_FIELDS.ADDRESS]: '',
      [LEDGER_FORM_FIELDS.PINCODE]: '',
      [LEDGER_FORM_FIELDS.CONTACT_PERSON]: '',
      [LEDGER_FORM_FIELDS.EMAIL]: '',
      [LEDGER_FORM_FIELDS.MOBILE_NUMBER]: '',
      [LEDGER_FORM_FIELDS.WHATSAPP_NUMBER]: '',
      [LEDGER_FORM_FIELDS.LANDLINE_NO]: '',
    },
  });

  const onSubmit = (data: LedgerFormValues) => {
    console.log('Submitted ledger data:', data);
    alert('Ledger created successfully! Check console for details.');
    navigate({ to: '/accounts/masters/ledger' });
  };

  const getHeaderIcon = (step: number) => {
    switch (step) {
      case 1:
        return <GeneralInfoGraphic className="w-64 h-auto" primaryOffset={{ x: 20, y: 15 }} />;
      case 2:
        return <BillingCreditGraphic className="w-64 h-auto" primaryOffset={{ x: 0, y: 16 }} />;
      case 3:
        return <ContactLocationGraphic className="w-64 h-auto" primaryOffset={{ x: 0, y: -8 }} />;
      case 4:
        return <ContactGraphic className="w-64 h-auto" primaryOffset={{ x: 0, y: -15 }} />;
      default:
        return <Icon name="Book" size={48} className="stroke-[1.25] text-primary" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={LEDGER_WIZARD_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title="Create New Ledger" />

        <FormWizard.Container>
          <FormWizardHeaderWithContext getHeaderIcon={getHeaderIcon} />

          <WizardContent form={form} />

          <FormWizard.Footer onCancel={() => navigate({ to: '/accounts/masters/ledger' })} />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export default CreateLedgerPage;
