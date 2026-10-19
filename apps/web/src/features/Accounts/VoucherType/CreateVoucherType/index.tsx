'use client';

import React from 'react';
import { FormWizard } from '@prime/ui';
import { INITIAL_STEPS } from './constants';
import { useCreateVoucherForm } from './hooks/useCreateVoucherForm';
import { CreateVoucherSuccess } from './components/CreateVoucherSuccess';
import {
  WizardContent,
  FormWizardHeaderWithContext,
  WizardContainerWithWidth,
} from './components/CreateVoucherWizardLayout';

export const CreateVoucherType = () => {
  const {
    form,
    navigate,
    LeavePromptDialog,
    onSubmit,
    isSuccess,
    createdItemName,
    error,
    reset,
  } = useCreateVoucherForm();

  if (isSuccess) {
    return (
      <CreateVoucherSuccess
        itemName={createdItemName}
        onCreateAnother={reset}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={INITIAL_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title="Create New Voucher Type" />

        <WizardContainerWithWidth>
          <FormWizardHeaderWithContext />

          <WizardContent form={form} error={error} clearError={reset} />

          <FormWizard.Footer onCancel={() => navigate({ to: '/accounts/masters' as any })} />
        </WizardContainerWithWidth>
      </FormWizard>
      
      <LeavePromptDialog />
    </div>
  );
};
