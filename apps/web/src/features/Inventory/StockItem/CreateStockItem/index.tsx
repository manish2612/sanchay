import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { FormWizard, Icon, Button, useFormWizardContext } from '@prime/ui';

import { stockItemSchema, type StockItemFormValues } from './schema';
import { STOCK_ITEM_FORM_FIELDS, STOCK_ITEM_WIZARD_STEPS } from './constants';
import { transformStockItemPayload, transformStockItemResponseToForm } from './transformers';
import {
  useCreateStockItemMutation,
  useGetStockItemByIdQuery,
  useUpdateStockItemMutation,
} from '../api';
import { useCompanySettings } from '@/features/Company/CompanySettings';

import { GeneralInfoStep } from './components/GeneralInfoStep';
import { TaxationStep } from './components/TaxationStep';
import { AdvancedDetailsStep } from './components/AdvancedDetailsStep';
import { OpeningBalanceStep } from './components/OpeningBalanceStep';
import { useLeavePromptSlot } from '@/providers/LeavePromptProvider';

export interface StockItemFormPageProps {
  id?: string;
  mode?: 'create' | 'edit';
}

const WizardContent = ({ form, isEditMode }: { form: any; isEditMode?: boolean }) => {
  const { currentStep } = useFormWizardContext();

  return (
    <FormWizard.Content>
      <div className="space-y-6 max-w-4xl mx-auto mt-4">
        {currentStep === 1 && <GeneralInfoStep form={form} />}
        {currentStep === 2 && <TaxationStep form={form} />}
        {currentStep === 3 && <AdvancedDetailsStep form={form} />}
        {currentStep === 4 && <OpeningBalanceStep form={form} isEditMode={isEditMode} />}
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
  const stepConfig = STOCK_ITEM_WIZARD_STEPS.find((s) => s.id === currentStep);

  const title = isEditMode
    ? `${stepConfig?.title || 'Edit Stock Item'}${itemName ? ` — ${itemName}` : ''}`
    : stepConfig?.title || 'Create Stock Item';

  return (
    <FormWizard.Header
      graphic={getHeaderIcon(currentStep)}
      title={title}
      subtitle={stepConfig?.description}
    />
  );
};

const CreateStockItemPage = ({ id, mode }: StockItemFormPageProps = {}) => {
  const navigate = useNavigate();
  const isEditMode = mode === 'edit' || Boolean(id);

  // Queries & Mutations
  const {
    data: itemData,
    isLoading: isLoadingItem,
    isError: isItemError,
  } = useGetStockItemByIdQuery(id!, { skip: !id || !isEditMode });

  const [createStockItem, { isLoading: isCreating }] = useCreateStockItemMutation();
  const [updateStockItem, { isLoading: isUpdating }] = useUpdateStockItemMutation();
  const isSubmitting = isCreating || isUpdating;

  const [serverError, setServerError] = useState<string | null>(null);
  const [createdItem, setCreatedItem] = useState<{ id?: string; name: string } | null>(null);

  const { enable_godowns, enable_batches } = useCompanySettings();

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
      [STOCK_ITEM_FORM_FIELDS.MAINTAIN_BATCHES]: Boolean(enable_batches),
      [STOCK_ITEM_FORM_FIELDS.IS_BRANCH_ENABLED]: false,
      [STOCK_ITEM_FORM_FIELDS.LOCAL_SALES_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.EXPORT_SALES_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.LOCAL_PURCHASE_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.EXPORT_PURCHASE_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT]: false,
      [STOCK_ITEM_FORM_FIELDS.MULTI_UNITS]: [],
      [STOCK_ITEM_FORM_FIELDS.ENABLE_STANDARD_RATES]: false,
      [STOCK_ITEM_FORM_FIELDS.STANDARD_RATES]: [],
      [STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION]: Boolean(enable_godowns),
      [STOCK_ITEM_FORM_FIELDS.TRACK_MFG_DATE]: false,
      [STOCK_ITEM_FORM_FIELDS.TRACK_EXPIRY_DATE]: false,
      [STOCK_ITEM_FORM_FIELDS.OPENING_QUANTITY]: 0,
      [STOCK_ITEM_FORM_FIELDS.OPENING_RATE]: 0,
      [STOCK_ITEM_FORM_FIELDS.OPENING_AMOUNT]: 0,
      [STOCK_ITEM_FORM_FIELDS.GODOWN_ALLOCATIONS]: [],
    },
  });

  // Hydrate form in Edit mode when item data is loaded
  useEffect(() => {
    if (itemData && isEditMode) {
      const formValues = transformStockItemResponseToForm(itemData);
      form.reset(formValues);
    }
  }, [itemData, isEditMode, form]);

  // Keep form values in sync with company settings (Create mode only)
  useEffect(() => {
    if (isEditMode) return;
    if (enable_godowns !== undefined) {
      form.setValue(STOCK_ITEM_FORM_FIELDS.ENABLE_GODOWN_ALLOCATION, Boolean(enable_godowns));
    }
    if (enable_batches !== undefined) {
      form.setValue(STOCK_ITEM_FORM_FIELDS.MAINTAIN_BATCHES, Boolean(enable_batches));
      if (!enable_batches) {
        form.setValue(STOCK_ITEM_FORM_FIELDS.TRACK_MFG_DATE, false);
        form.setValue(STOCK_ITEM_FORM_FIELDS.TRACK_EXPIRY_DATE, false);
      }
    }
  }, [enable_godowns, enable_batches, form, isEditMode]);

  const onSubmit = async (data: StockItemFormValues) => {
    setServerError(null);
    try {
      const payload = transformStockItemPayload(data);
      if (isEditMode && id) {
        await updateStockItem({ id, data: payload }).unwrap();
        setCreatedItem({ id, name: data.name });
      } else {
        const result = await createStockItem(payload).unwrap();
        setCreatedItem({ id: result?.id, name: data.name });
      }
    } catch (err: any) {
      const status = err?.status || err?.originalStatus;
      let message = isEditMode
        ? 'Failed to update stock item. Please check your inputs and try again.'
        : 'Failed to create stock item. Please check your inputs and try again.';
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

  if (isEditMode && isLoadingItem) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center p-6">
        <div className="flex flex-col items-center gap-3 text-muted-foreground">
          <Icon name="RefreshCw" size={32} className="animate-spin text-primary" />
          <p className="text-sm font-medium">Loading stock item details...</p>
        </div>
      </div>
    );
  }

  if (isEditMode && (isItemError || (!isLoadingItem && !itemData))) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-border text-center shadow-sm">
          <div className="w-16 h-16 bg-danger/10 text-danger rounded-full flex items-center justify-center mb-6 mx-auto">
            <Icon name="CircleAlert" size={32} />
          </div>
          <h2 className="text-xl font-bold text-foreground mb-2">Stock Item Not Found</h2>
          <p className="text-xs text-muted-foreground mb-6">
            The requested stock item could not be retrieved or has been removed.
          </p>
          <Button
            variant="primary"
            onClick={() => navigate({ to: '/inventory/masters/stock-item' })}
            className="w-full"
          >
            Back to Stock Items
          </Button>
        </div>
      </div>
    );
  }

  if (createdItem) {
    return (
      <div className="flex flex-col h-full bg-background items-center justify-center p-6">
        <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
            <Icon name="CircleCheck" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {isEditMode ? 'Stock Item Updated' : 'Stock Item Created'}
          </h2>
          <p className="text-muted-foreground mb-6">
            <span className="font-semibold text-foreground">{createdItem.name}</span> has been
            successfully {isEditMode ? 'updated' : 'created and added to your inventory'}.
          </p>
          <div className="flex flex-col gap-3 w-full">
            {!isEditMode && (
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
            )}
            <Button
              type="button"
              variant={isEditMode ? 'primary' : 'outline'}
              onClick={() => navigate({ to: '/inventory/masters/stock-item' })}
              className="w-full"
            >
              Back to Stock Items
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const stepNavTitle = isEditMode
    ? `Edit Stock Item: ${itemData?.name || ''}`
    : 'Create New Stock Item';
  const submitLabel = isSubmitting
    ? isEditMode
      ? 'Saving...'
      : 'Creating...'
    : isEditMode
      ? 'Update Stock Item'
      : 'Create Stock Item';

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={STOCK_ITEM_WIZARD_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title={stepNavTitle} />

        <FormWizard.Container>
          <FormWizardHeaderWithContext
            getHeaderIcon={getHeaderIcon}
            isEditMode={isEditMode}
            itemName={itemData?.name}
          />

          {serverError && (
            <div className="mx-6 mt-4 p-4 rounded-md bg-danger/10 border border-danger/20 text-danger text-sm flex items-center gap-3">
              <Icon name="CircleAlert" size={16} className="shrink-0" />
              <p>{serverError}</p>
            </div>
          )}

          <WizardContent form={form} isEditMode={isEditMode} />

          <FormWizard.Footer
            onCancel={() => navigate({ to: '/inventory/masters/stock-item' })}
            isSubmitting={isSubmitting}
            submitLabel={submitLabel}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export default CreateStockItemPage;


