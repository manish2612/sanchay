import React, { useEffect } from 'react';
import { useWatch } from 'react-hook-form';
import { FormWizard, Icon, useFormWizardContext } from '@prime/ui';
import { AlertCircle } from 'lucide-react';

import { VOUCHER_TYPE_FIELDS, DYNAMIC_STEPS } from '../constants';
import { BasicDetailsStep } from './BasicDetailsStep';
import { VoucherNumberingTable } from './VoucherNumberingTable';
import { DefaultLedgersStep } from './DefaultLedgersStep';
import { ConfigurationsStep } from './ConfigurationsStep';
import { useGetVoucherTypesQuery } from '../../api';

export const WizardContent = ({ form, error, clearError }: { form: any; error: any; clearError: () => void }) => {
  const { currentStep, addStep, removeStep, steps } = useFormWizardContext();
  const errorRef = React.useRef<HTMLDivElement>(null);

  const parentValue = useWatch({
    control: form.control,
    name: VOUCHER_TYPE_FIELDS.PARENT,
  });

  const { data: voucherTypes = [] } = useGetVoucherTypesQuery();

  const currentParentLabel = React.useMemo(() => {
    return voucherTypes.find((vt) => vt.id === parentValue)?.name || '';
  }, [voucherTypes, parentValue]);

  useEffect(() => {
    if (currentParentLabel.toLowerCase() === 'sales') {
      addStep(DYNAMIC_STEPS[0], 'voucher-numbering');
      addStep(DYNAMIC_STEPS[1], 'default-ledgers');
    } else {
      removeStep('default-ledgers');
      removeStep('configurations');
    }
  }, [currentParentLabel, addStep, removeStep]);

  useEffect(() => {
    if (error && errorRef.current) {
      setTimeout(() => {
        errorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [error]);

  const activeStepId = steps[currentStep - 1]?.id;

  const isStep1 = activeStepId === 1;
  const isStep2 = activeStepId === 'voucher-numbering';
  const isDefaultLedgers = activeStepId === 'default-ledgers';
  const isConfigurations = activeStepId === 'configurations';

  const isTableStep = activeStepId === 'voucher-numbering';
  const maxWidthClass = isTableStep ? 'max-w-6xl' : 'max-w-4xl';

  const errorMessage = error?.data?.message || error?.message || 'An error occurred while creating the voucher type. Please check your data and try again.';

  return (
    <FormWizard.Content>
      <div className={`flex flex-col gap-6 mx-auto mt-4 transition-all duration-300 ${maxWidthClass}`}>
        {error && (
          <div ref={errorRef} className="bg-danger/10 text-danger border border-danger/20 p-4 rounded-xl flex items-start gap-3.5 shadow-sm animate-in fade-in slide-in-from-top-4 duration-500 ease-out relative group">
            <div className="bg-danger/20 p-1.5 rounded-full shrink-0">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div className="flex flex-col gap-0.5 mt-0.5 pr-6">
              <span className="text-sm font-semibold tracking-tight">Submission Failed</span>
              <span className="text-sm text-danger/90 leading-relaxed">
                {errorMessage}
              </span>
            </div>
            <button 
              onClick={clearError}
              type="button" 
              className="absolute right-3 top-3 p-1.5 rounded-md hover:bg-danger/10 text-danger/70 hover:text-danger transition-colors"
              aria-label="Dismiss error"
            >
              <Icon name="X" size={16} />
            </button>
          </div>
        )}

        {isStep1 && <BasicDetailsStep form={form} />}
        {isStep2 && <VoucherNumberingTable form={form} />}
        {isDefaultLedgers && <DefaultLedgersStep form={form} />}
        {isConfigurations && <ConfigurationsStep form={form} />}
      </div>
    </FormWizard.Content>
  );
};

export const FormWizardHeaderWithContext = () => {
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

export const WizardContainerWithWidth = ({ children }: { children: React.ReactNode }) => {
  const { currentStep, steps } = useFormWizardContext();
  const activeStepId = steps[currentStep - 1]?.id;
  const isTableStep = activeStepId === 'voucher-numbering';
  
  const containerWidthClass = isTableStep ? '!max-w-6xl' : '';

  return (
    <FormWizard.Container className={`transition-all duration-300 ${containerWidthClass}`}>
      {children}
    </FormWizard.Container>
  );
};
