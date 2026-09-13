'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { FormWizard, Icon, useFormWizardContext } from '@prime/ui';

import { companyFormSchema, type CompanyFormValues } from './schema';
import { COMPANY_FORM_FIELDS, COMPANY_WIZARD_STEPS } from './constants';

import { CompanyProfileStep } from './components/CompanyProfileStep';
import { ContactLocationStep } from './components/ContactLocationStep';
import { CompanyProfileGraphic } from './components/graphics/CompanyProfileGraphic';
import { ContactLocationGraphic } from './components/graphics/ContactLocationGraphic';

import { useCreateCompany } from './components/useCreateCompany';

const WizardContent = ({ form }: { form: any }) => {
  const { currentStep } = useFormWizardContext();

  return (
    <FormWizard.Content>
      <div className="space-y-6 max-w-2xl mx-auto mt-4">
        {currentStep === 1 && <CompanyProfileStep form={form} />}
        {currentStep === 2 && <ContactLocationStep form={form} />}
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
  const stepConfig = COMPANY_WIZARD_STEPS.find((s) => s.id === currentStep);

  return (
    <FormWizard.Header
      graphic={getHeaderIcon(currentStep)}
      title={stepConfig?.title || 'Create Company'}
      subtitle={stepConfig?.description}
    />
  );
};

const CreateCompanyPage = () => {
  const navigate = useNavigate();
  const { onSubmit, isLoading, isSuccess, isError } = useCreateCompany();

  const form = useForm<CompanyFormValues>({
    mode: 'onChange',
    resolver: zodResolver(companyFormSchema) as any,
    defaultValues: {
      [COMPANY_FORM_FIELDS.NAME]: '',
      [COMPANY_FORM_FIELDS.MAILING_NAME]: '',
      [COMPANY_FORM_FIELDS.TIMEZONE]: '',
      [COMPANY_FORM_FIELDS.COUNTRY]: '',
      [COMPANY_FORM_FIELDS.STATE]: '',
      [COMPANY_FORM_FIELDS.ADDRESS]: '',
      [COMPANY_FORM_FIELDS.PINCODE]: '',
      [COMPANY_FORM_FIELDS.EMAIL]: '',
      [COMPANY_FORM_FIELDS.MOBILE_NUMBER]: '',
      [COMPANY_FORM_FIELDS.WHATSAPP_NUMBER]: '',
      [COMPANY_FORM_FIELDS.LANDLINE_NO]: '',
      [COMPANY_FORM_FIELDS.REGISTRATION_TYPE]: '',
      [COMPANY_FORM_FIELDS.REGISTRATION_NUMBER]: '',
      [COMPANY_FORM_FIELDS.DECIMAL_COUNT]: 2,
    },
  });

  const getHeaderIcon = (step: number) => {
    switch (step) {
      case 1:
        return <CompanyProfileGraphic className="w-54 h-auto" primaryOffset={{ x: 10, y: -10 }} />;
      case 2:
        return <ContactLocationGraphic className="w-54 h-auto" primaryOffset={{ x: 0, y: 15 }} />;
      default:
        return <Icon name="Building2" size={48} className="stroke-[1.25]" />;
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col h-[100dvh] bg-background items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface p-8 rounded-2xl border shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <Icon name="CheckCircle" size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Company Created</h2>
          <p className="text-muted-foreground mb-8">
            Your new company profile has been successfully set up and is ready to use.
          </p>
          <button
            onClick={() => navigate({ to: '/' })}
            className="w-full bg-primary text-primary-foreground font-medium h-11 rounded-md hover:opacity-90 transition-opacity"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={COMPANY_WIZARD_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title="Create New Company" />

        <FormWizard.Container>
          <FormWizardHeaderWithContext getHeaderIcon={getHeaderIcon} />

          {isError && (
            <div className="mx-6 mt-4 p-4 rounded-md bg-danger/10 border border-danger/20 text-danger text-sm flex items-center gap-3">
              <Icon name="AlertTriangle" size={16} />
              <p>Failed to create company. Please check your inputs and try again.</p>
            </div>
          )}

          <WizardContent form={form} />

          <FormWizard.Footer onCancel={() => navigate({ to: '/' })} isSubmitting={isLoading} />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export default CreateCompanyPage;
