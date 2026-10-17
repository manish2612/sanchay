import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWizard, Icon, Button, useFormWizardContext } from '@prime/ui';

import { stockItemSchema, type StockItemFormValues } from './schema';
import { STOCK_ITEM_FORM_FIELDS, STOCK_ITEM_WIZARD_STEPS } from './constants';
import { transformStockItemPayload } from './transformers';
import { useCreateStockItemMutation } from '../api';

import { GeneralInfoStep } from './components/GeneralInfoStep';
import { TaxationStep } from './components/TaxationStep';
import { AdvancedDetailsStep } from './components/AdvancedDetailsStep';
import { OpeningBalanceStep } from './components/OpeningBalanceStep';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

const WizardContent = ({ form }: { form: any }) => {
  const { currentStep } = useFormWizardContext();

  return (
    <FormWizard.Content>
      <div className="space-y-6 max-w-4xl mx-auto mt-4">
        {currentStep === 1 && <GeneralInfoStep form={form} />}
        {currentStep === 2 && <TaxationStep form={form} />}
        {currentStep === 3 && <AdvancedDetailsStep form={form} />}
        {currentStep === 4 && <OpeningBalanceStep form={form} />}
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
  const stepConfig = STOCK_ITEM_WIZARD_STEPS.find((s) => s.id === currentStep);

  return (
    <FormWizard.Header
      graphic={getHeaderIcon(currentStep)}
      title={stepConfig?.title || 'Create Stock Item'}
      subtitle={stepConfig?.description}
    />
  );
};

const CreateStockItemPage = () => {
  const [createStockItem, { isLoading }] = useCreateStockItemMutation();
  const [serverError, setServerError] = useState<string | null>(null);
  const [createdItem, setCreatedItem] = useState<{ id?: string; name: string } | null>(null);

  const form = useForm<StockItemFormValues>({
    mode: 'onChange',
    resolver: zodResolver(stockItemSchema as any),
    defaultValues: {
      [STOCK_ITEM_FORM_FIELDS.NAME]: '',
      [STOCK_ITEM_FORM_FIELDS.PARENT_ID]: '',
      [STOCK_ITEM_FORM_FIELDS.CATEGORY_ID]: '',
      [STOCK_ITEM_FORM_FIELDS.UNIT]: '',
      [STOCK_ITEM_FORM_FIELDS.HSN_SAC]: '',
      [STOCK_ITEM_FORM_FIELDS.PART_NUMBER]: '',
      [STOCK_ITEM_FORM_FIELDS.MAINTAIN_BATCHES]: false,
      [STOCK_ITEM_FORM_FIELDS.IS_BRANCH_ENABLED]: false,
      [STOCK_ITEM_FORM_FIELDS.LOCAL_SALES_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.EXPORT_SALES_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.LOCAL_PURCHASE_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.EXPORT_PURCHASE_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT]: false,
      [STOCK_ITEM_FORM_FIELDS.MULTI_UNITS]: [],
      [STOCK_ITEM_FORM_FIELDS.ENABLE_STANDARD_RATES]: false,
      [STOCK_ITEM_FORM_FIELDS.STANDARD_RATES]: [],
      [STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION]: false,
      [STOCK_ITEM_FORM_FIELDS.TRACK_MFG_DATE]: false,
      [STOCK_ITEM_FORM_FIELDS.TRACK_EXPIRY_DATE]: false,
      [STOCK_ITEM_FORM_FIELDS.OPENING_QUANTITY]: 0,
      [STOCK_ITEM_FORM_FIELDS.OPENING_RATE]: 0,
      [STOCK_ITEM_FORM_FIELDS.OPENING_AMOUNT]: 0,
      [STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS]: [],
    },
  });

  const onSubmit = async (data: StockItemFormValues) => {
    setServerError(null);
    try {
      const payload = transformStockItemPayload(data);
      const result = await createStockItem(payload).unwrap();
      setCreatedItem({ id: result?.id, name: data.name });
    } catch (err: any) {
      const status = err?.status || err?.originalStatus;
      let message = 'Failed to create stock item. Please check your inputs and try again.';
      if (status === 409) {
        message = 'A stock item with this name, code, or part number already exists.';
      } else if (status === 400 && err?.data?.message) {
        message = err.data.message;
      } else if (status === 500) {
        message = 'A server error occurred. Please try again later.';
      } else if (err?.data?.message) {
        message = err.data.message;
      } else if (typeof err?.error === 'string') {
        message = err.error;
      }
      setServerError(message);
    }
  };

  useLeavePromptSlot({
    id: 'stock-item',
    isDirty: form.formState.isDirty && !form.formState.isSubmitSuccessful && !createdItem,
    priority: 0,
  });

  const getHeaderIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Icon name="Info" size={48} className="stroke-[1.25] text-primary" />;
      case 2:
        return <Icon name="FileText" size={48} className="stroke-[1.25] text-primary" />;
      case 3:
        return <Icon name="Settings" size={48} className="stroke-[1.25] text-primary" />;
      case 4:
        return <Icon name="Database" size={48} className="stroke-[1.25] text-primary" />;
      default:
        return <Icon name="Package" size={48} className="stroke-[1.25] text-primary" />;
    }
  };

  if (createdItem) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Icon name="CircleCheck" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Stock Item Created</h2>
          <p className="text-muted-foreground mb-6">
            <span className="font-semibold text-foreground">{createdItem.name}</span> has been successfully created and added to your inventory.
          </p>
          <div className="flex flex-col gap-3 w-full">
            <Button
              type="button"
              variant="primary"
              onClick={() => {
                form.reset();
                setCreatedItem(null);
                setServerError(null);
              }}
              className="w-full"
            >
              Create Another Stock Item
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              Back to Inventory
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={STOCK_ITEM_WIZARD_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title="Create New Stock Item" />

        <FormWizard.Container>
          <FormWizardHeaderWithContext getHeaderIcon={getHeaderIcon} />

          {serverError && (
            <div className="mx-6 mt-4 p-4 rounded-md bg-danger/10 border border-danger/20 text-danger text-sm flex items-center gap-3">
              <Icon name="CircleAlert" size={16} className="shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

          <WizardContent form={form} />

          <FormWizard.Footer
            onCancel={() => window.history.back()}
            isSubmitting={isLoading}
            submitLabel={isLoading ? 'Creating...' : 'Create Stock Item'}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export default CreateStockItemPage;

