'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, FormWizard, Icon, useFormWizardContext } from '@prime/ui';

import { ledgerFormSchema, type LedgerFormValues } from './schema';
import { LEDGER_FORM_FIELDS, LEDGER_WIZARD_STEPS } from './constants';
import { transformLedgerResponseToForm } from './transformers';
import { useGetLedgerByIdQuery } from '../api';
import { useGetCostCentersQuery } from '@/features/Masters/api/costCentersApi';
import { useGetTaxGroupsQuery } from '@/features/Masters/api/taxGroupsApi';

import { GeneralInfoStep } from './components/GeneralInfoStep';
import { BillingCreditStep } from './components/BillingCreditStep';
import { AddressStep } from './components/AddressStep';
import { ContactStep } from './components/ContactStep';
import { GeneralInfoGraphic } from './components/graphics/GeneralInfoGraphic';
import { BillingCreditGraphic } from './components/graphics/BillingCreditGraphic';
import { ContactGraphic } from './components/graphics/ContactGraphic';
import { ContactLocationGraphic } from '@/features/Company/CreateCompany/components/graphics/ContactLocationGraphic';

import { useCreateLedger } from './hooks/useCreateLedger';
import { CreateLedgerSuccess } from './components/CreateLedgerSuccess';
import { FormSubmissionError } from '@/components/FormSubmissionError';

export interface CreateLedgerPageProps {
  id?: string;
  mode?: 'create' | 'edit';
}

const WizardContent = ({
  form,
  submitError,
  clearSubmitError,
}: {
  form: any;
  submitError?: string | null;
  clearSubmitError?: () => void;
}) => {
  const { currentStep } = useFormWizardContext();

  return (
    <FormWizard.Content>
      <div className="space-y-6 max-w-2xl mx-auto mt-4">
        <FormSubmissionError error={submitError} onDismiss={clearSubmitError} />
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
  isEditMode,
  itemName,
}: {
  getHeaderIcon: (step: number) => React.ReactNode;
  isEditMode?: boolean;
  itemName?: string;
}) => {
  const { currentStep } = useFormWizardContext();
  const stepConfig = LEDGER_WIZARD_STEPS.find((s) => s.id === currentStep);

  const title = isEditMode
    ? `${stepConfig?.title || 'Edit Ledger'}${itemName ? ` — ${itemName}` : ''}`
    : stepConfig?.title || 'Create Ledger';

  return (
    <FormWizard.Header
      graphic={getHeaderIcon(currentStep)}
      title={title}
      subtitle={stepConfig?.description}
    />
  );
};

const CreateLedgerPage = ({ id, mode }: CreateLedgerPageProps = {}) => {
  const isEditMode = mode === 'edit' || Boolean(id);

  // Queries for edit hydration
  const {
    data: ledgerData,
    isLoading: isLoadingLedger,
    isError: isLedgerError,
  } = useGetLedgerByIdQuery(id!, { skip: !id || !isEditMode });

  const { data: costCenters = [] } = useGetCostCentersQuery();
  const { data: taxGroups = [] } = useGetTaxGroupsQuery();

  const form = useForm<LedgerFormValues>({
    mode: 'onChange',
    resolver: zodResolver(ledgerFormSchema),
    defaultValues: {
      [LEDGER_FORM_FIELDS.NAME]: '',
      [LEDGER_FORM_FIELDS.ALIAS]: '',
      [LEDGER_FORM_FIELDS.PARENT]: '',
      [LEDGER_FORM_FIELDS.ACCOUNT_CODE]: '',
      [LEDGER_FORM_FIELDS.REGISTRATION_TYPE]: '',
      [LEDGER_FORM_FIELDS.REGISTRATION_NUMBER]: '',
      [LEDGER_FORM_FIELDS.IS_BILL_BY_BILL]: false,
      [LEDGER_FORM_FIELDS.CREDIT_PERIOD]: '',
      [LEDGER_FORM_FIELDS.CREDIT_LIMIT]: '',
      [LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED]: false,
      [LEDGER_FORM_FIELDS.OPENING_BALANCE]: '',
      [LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE]: 'Dr',
      [LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED]: false,
      [LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS]: [],
      [LEDGER_FORM_FIELDS.TAX_RATES]: [],
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

  // Hydrate form in edit mode when ledger data arrives
  useEffect(() => {
    if (ledgerData && isEditMode) {
      const formValues = transformLedgerResponseToForm(ledgerData, {
        costCenters,
        taxGroups,
      });
      form.reset(formValues);
    }
  }, [ledgerData, isEditMode, form, costCenters, taxGroups]);

  const {
    onSubmit,
    isSubmitting,
    isSuccess,
    createdItemName,
    resetSuccess,
    navigate,
    submitError,
    clearSubmitError,
  } = useCreateLedger(form, { id, mode });

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

  if (isEditMode && isLoadingLedger) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-background gap-3">
        <Icon name="Loader2" size={32} className="animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading ledger details...</p>
      </div>
    );
  }

  if (isEditMode && isLedgerError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-background gap-4 p-6">
        <div className="w-12 h-12 bg-danger/10 text-danger rounded-full flex items-center justify-center">
          <Icon name="CircleAlert" size={24} />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">Ledger Not Found</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Unable to load the requested ledger details. It may have been removed.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate({ to: '/accounts/masters/ledger' as any })}
        >
          Back to Ledger List
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <CreateLedgerSuccess
        itemName={createdItemName || ledgerData?.name}
        isEditMode={isEditMode}
        onCreateAnother={resetSuccess}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={LEDGER_WIZARD_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title={isEditMode ? 'Edit Ledger' : 'Create New Ledger'} />

        <FormWizard.Container>
          <FormWizardHeaderWithContext
            getHeaderIcon={getHeaderIcon}
            isEditMode={isEditMode}
            itemName={ledgerData?.name}
          />

          <WizardContent
            form={form}
            submitError={submitError}
            clearSubmitError={clearSubmitError}
          />

          <FormWizard.Footer
            onCancel={() => navigate({ to: '/accounts/masters/ledger' as any })}
            isSubmitting={isSubmitting}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export default CreateLedgerPage;
