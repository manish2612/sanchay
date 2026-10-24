'use client';

import React from 'react';
import { Button, FormWizard, Icon } from '@prime/ui';
import { INITIAL_STEPS } from './constants';
import { useCreateVoucherForm } from './hooks/useCreateVoucherForm';
import { CreateVoucherSuccess } from './components/CreateVoucherSuccess';
import {
  WizardContent,
  FormWizardHeaderWithContext,
  WizardContainerWithWidth,
} from './components/CreateVoucherWizardLayout';

export interface CreateVoucherTypeProps {
  id?: string;
  mode?: 'create' | 'edit';
}

export const CreateVoucherType = ({ id, mode }: CreateVoucherTypeProps = {}) => {
  const {
    form,
    navigate,
    LeavePromptDialog,
    onSubmit,
    isSuccess,
    createdItemName,
    error,
    reset,
    isEditMode,
    isLoadingVoucherType,
    isVoucherTypeError,
    voucherTypeData,
  } = useCreateVoucherForm({ id, mode });

  if (isEditMode && isLoadingVoucherType) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-background gap-3">
        <Icon name="Loader2" size={32} className="animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading voucher type details...</p>
      </div>
    );
  }

  if (isEditMode && isVoucherTypeError) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-background gap-4 p-6">
        <div className="w-12 h-12 bg-danger/10 text-danger rounded-full flex items-center justify-center">
          <Icon name="CircleAlert" size={24} />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-semibold text-foreground">Voucher Type Not Found</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Unable to load the requested voucher type. It may have been removed.
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate({ to: '/accounts/masters/voucher-type' as any })}
        >
          Back to Voucher Type List
        </Button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <CreateVoucherSuccess
        itemName={createdItemName || voucherTypeData?.name}
        isEditMode={isEditMode}
        onCreateAnother={reset}
      />
    );
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={INITIAL_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title={isEditMode ? 'Edit Voucher Type' : 'Create New Voucher Type'} />

        <WizardContainerWithWidth>
          <FormWizardHeaderWithContext
            isEditMode={isEditMode}
            itemName={voucherTypeData?.name}
          />

          <WizardContent form={form} error={error} clearError={reset} />

          <FormWizard.Footer
            onCancel={() => navigate({ to: '/accounts/masters/voucher-type' as any })}
          />
        </WizardContainerWithWidth>
      </FormWizard>

      <LeavePromptDialog />
    </div>
  );
};

export default CreateVoucherType;
