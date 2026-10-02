import React, { useState } from 'react';
import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetContent,
  SheetHeader,
  SheetTitle,
  ToastRoot,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from '@prime/ui';
import { useGlobalMasterSheet } from './MasterFormSheetContext';
import { useLeavePromptTrigger } from '@/providers/LeavePromptProvider';
import { Suspense } from 'react';

const GroupForm = React.lazy(() => import('@master-forms/group/GroupForm').then(m => ({ default: m.GroupForm })));
const CostCategoryForm = React.lazy(() => import('@master-forms/cost-category/CostCategoryForm').then(m => ({ default: m.CostCategoryForm })));
const CostCenterForm = React.lazy(() => import('@master-forms/cost-center/CostCenterForm').then(m => ({ default: m.CostCenterForm })));
const StockGroupForm = React.lazy(() => import('@master-forms/stock-group/StockGroupForm').then(m => ({ default: m.StockGroupForm })));
const StockCategoryForm = React.lazy(() => import('@master-forms/stock-category/StockCategoryForm').then(m => ({ default: m.StockCategoryForm })));
const UnitOfMeasureForm = React.lazy(() => import('@master-forms/unit-of-measure/UnitOfMeasureForm').then(m => ({ default: m.UnitOfMeasureForm })));
const GodownForm = React.lazy(() => import('@master-forms/godown/GodownForm').then(m => ({ default: m.GodownForm })));

function FormSkeleton() {
  return (
    <div className="p-6 space-y-6 flex-1">
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-1/4 animate-pulse" />
        <div className="h-9 bg-muted rounded w-full animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-1/5 animate-pulse" />
        <div className="h-9 bg-muted rounded w-full animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-1/3 animate-pulse" />
        <div className="h-9 bg-muted rounded w-full animate-pulse" />
      </div>
    </div>
  );
}

export function MasterFormSheet() {
  const { isOpen, closeMasterSheet, activeMaster } = useGlobalMasterSheet();
  const triggerPrompt = useLeavePromptTrigger();
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; variant?: 'success' | 'destructive' | 'default' } | null>(null);

  const handleClose = () => {
    triggerPrompt(() => {
      closeMasterSheet();
    }, activeMaster ? `${activeMaster}-form` : undefined);
  };

  const handleSuccess = (title: string, desc: string) => {
    setToastMessage({ title, desc, variant: 'success' });
    closeMasterSheet(); // success means it's submitted, so form is not dirty anymore
  };

  const handleError = (title: string, desc: string) => {
    setToastMessage({ title, desc, variant: 'destructive' });
  };

  const renderForm = () => {
    switch (activeMaster) {
      case 'group':
        return (
          <GroupForm
            onCancel={handleClose}
            onSuccess={() => handleSuccess('Group Created', 'Successfully created new Group')}
            onError={handleError}
          />
        );
      case 'cost-category':
        return (
          <CostCategoryForm
            onCancel={handleClose}
            onSuccess={() =>
              handleSuccess('Cost Category Created', 'Successfully created new Cost Category')
            }
            onError={handleError}
          />
        );
      case 'cost-center':
      case 'cost-centre':
        return (
          <CostCenterForm
            onCancel={handleClose}
            onSuccess={() =>
              handleSuccess('Cost Center Created', 'Successfully created new Cost Center')
            }
            onError={handleError}
          />
        );
      case 'stock-group':
        return (
          <StockGroupForm
            onCancel={handleClose}
            onSuccess={() =>
              handleSuccess('Stock Group Created', 'Successfully created new Stock Group')
            }
            onError={handleError}
          />
        );
      case 'stock-category':
        return (
          <StockCategoryForm
            onCancel={handleClose}
            onSuccess={() =>
              handleSuccess('Stock Category Created', 'Successfully created new Stock Category')
            }
            onError={handleError}
          />
        );
      case 'unit-of-measure':
        return (
          <UnitOfMeasureForm
            onCancel={handleClose}
            onSuccess={() =>
              handleSuccess('Unit of Measure Created', 'Successfully created new Unit of Measure')
            }
            onError={handleError}
          />
        );
      case 'godown':
        return (
          <GodownForm
            onCancel={handleClose}
            onSuccess={() => handleSuccess('Godown Created', 'Successfully created new Godown')}
            onError={handleError}
          />
        );
      default:
        return null;
    }
  };

  const titles: Record<string, string> = {
    group: 'Create Group',
    'cost-category': 'Create Cost Category',
    'cost-center': 'Create Cost Center',
    'cost-centre': 'Create Cost Centre',
    'stock-group': 'Create Stock Group',
    'stock-category': 'Create Stock Category',
    'unit-of-measure': 'Create Unit of Measure',
    godown: 'Create Godown',
  };

  const isWide = activeMaster === 'cost-center' || activeMaster === 'cost-centre';

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <SheetPortal>
          <SheetOverlay />
          <SheetContent 
            className={`flex flex-col p-0 overflow-hidden ${isWide ? 'sm:max-w-2xl sm:w-[600px]' : ''}`} 
            aria-describedby={undefined}
          >
            <SheetHeader className="p-4 border-b border-border/30">
              <SheetTitle>{activeMaster ? titles[activeMaster] : 'Create Master'}</SheetTitle>
            </SheetHeader>
            <Suspense fallback={<FormSkeleton />}>
              {renderForm()}
            </Suspense>
          </SheetContent>
        </SheetPortal>
      </Sheet>

      <ToastRoot
        open={!!toastMessage}
        onOpenChange={(open) => !open && setToastMessage(null)}
        variant={toastMessage?.variant || 'default'}
      >
        <ToastTitle>{toastMessage?.title}</ToastTitle>
        <ToastDescription>{toastMessage?.desc}</ToastDescription>
        <ToastClose />
      </ToastRoot>
    </>
  );
}
