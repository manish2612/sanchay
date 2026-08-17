import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { FormWizard, Icon, useFormWizardContext } from '@prime/ui';

import { stockItemSchema, type StockItemFormValues } from './schema';
import { STOCK_ITEM_FORM_FIELDS, STOCK_ITEM_WIZARD_STEPS } from './constants';

import { GeneralInfoStep } from './components/GeneralInfoStep';
import { TaxationStep } from './components/TaxationStep';
import { AdvancedDetailsStep } from './components/AdvancedDetailsStep';
import { OpeningBalanceStep } from './components/OpeningBalanceStep';

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
  // const navigate = useNavigate();

  const form = useForm<StockItemFormValues>({
    mode: 'onChange',
    resolver: zodResolver(stockItemSchema as any),
    defaultValues: {
      [STOCK_ITEM_FORM_FIELDS.NAME]: '',
      [STOCK_ITEM_FORM_FIELDS.PARENT_ID]: '',
      [STOCK_ITEM_FORM_FIELDS.CATEGORY_ID]: '',
      [STOCK_ITEM_FORM_FIELDS.UNIT]: 0,
      [STOCK_ITEM_FORM_FIELDS.HSN_SAC]: '',
      [STOCK_ITEM_FORM_FIELDS.LOCAL_SALES_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.EXPORT_SALES_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.LOCAL_PURCHASE_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.EXPORT_PURCHASE_TAX]: '',
      [STOCK_ITEM_FORM_FIELDS.ENABLE_MULTI_UNIT]: false,
      [STOCK_ITEM_FORM_FIELDS.MULTI_UNITS]: [],
      [STOCK_ITEM_FORM_FIELDS.ENABLE_STANDARD_RATES]: false,
      [STOCK_ITEM_FORM_FIELDS.STANDARD_RATES]: [],
      [STOCK_ITEM_FORM_FIELDS.OPENING_QUANTITY]: 0,
      [STOCK_ITEM_FORM_FIELDS.OPENING_RATE]: 0,
      [STOCK_ITEM_FORM_FIELDS.OPENING_AMOUNT]: 0,
    },
  });

  const onSubmit = (data: StockItemFormValues) => {
    console.log('Submitted stock item data:', data);
    alert('Stock Item created successfully! Check console for details.');
  };

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

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard form={form} initialStep={1} steps={STOCK_ITEM_WIZARD_STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title="Create New Stock Item" />

        <FormWizard.Container>
          <FormWizardHeaderWithContext getHeaderIcon={getHeaderIcon} />

          <WizardContent form={form} />

          <FormWizard.Footer onCancel={() => window.history.back()} />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export default CreateStockItemPage;
