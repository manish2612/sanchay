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
import { GroupForm } from '@master-forms/group/GroupForm';
import { CostCategoryForm } from '@master-forms/cost-category/CostCategoryForm';
import { CostCenterForm } from '@master-forms/cost-center/CostCenterForm';
import { StockGroupForm } from '@master-forms/stock-group/StockGroupForm';
import { StockCategoryForm } from '@master-forms/stock-category/StockCategoryForm';
import { UnitOfMeasureForm } from '@master-forms/unit-of-measure/UnitOfMeasureForm';
import { GodownForm } from '@master-forms/godown/GodownForm';

export function MasterFormSheet() {
  const { isOpen, closeMasterSheet, activeMaster } = useGlobalMasterSheet();
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string } | null>(null);

  const handleSuccess = (title: string, desc: string) => {
    setToastMessage({ title, desc });
    closeMasterSheet();
  };

  const renderForm = () => {
    switch (activeMaster) {
      case 'group':
        return (
          <GroupForm
            onCancel={closeMasterSheet}
            onSuccess={() => handleSuccess('Group Created', 'Successfully created new Group')}
          />
        );
      case 'cost-category':
        return (
          <CostCategoryForm
            onCancel={closeMasterSheet}
            onSuccess={() =>
              handleSuccess('Cost Category Created', 'Successfully created new Cost Category')
            }
          />
        );
      case 'cost-center':
      case 'cost-centre':
        return (
          <CostCenterForm
            onCancel={closeMasterSheet}
            onSuccess={() =>
              handleSuccess('Cost Center Created', 'Successfully created new Cost Center')
            }
          />
        );
      case 'stock-group':
        return (
          <StockGroupForm
            onCancel={closeMasterSheet}
            onSuccess={() =>
              handleSuccess('Stock Group Created', 'Successfully created new Stock Group')
            }
          />
        );
      case 'stock-category':
        return (
          <StockCategoryForm
            onCancel={closeMasterSheet}
            onSuccess={() =>
              handleSuccess('Stock Category Created', 'Successfully created new Stock Category')
            }
          />
        );
      case 'unit-of-measure':
        return (
          <UnitOfMeasureForm
            onCancel={closeMasterSheet}
            onSuccess={() =>
              handleSuccess('Unit of Measure Created', 'Successfully created new Unit of Measure')
            }
          />
        );
      case 'godown':
        return (
          <GodownForm
            onCancel={closeMasterSheet}
            onSuccess={() => handleSuccess('Godown Created', 'Successfully created new Godown')}
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

  return (
    <>
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeMasterSheet()}>
        <SheetPortal>
          <SheetOverlay />
          <SheetContent className="flex flex-col p-0 overflow-hidden" aria-describedby={undefined}>
            <SheetHeader className="p-4 border-b border-border/30">
              <SheetTitle>{activeMaster ? titles[activeMaster] : 'Create Master'}</SheetTitle>
            </SheetHeader>
            {renderForm()}
          </SheetContent>
        </SheetPortal>
      </Sheet>

      <ToastRoot
        open={!!toastMessage}
        onOpenChange={(open) => !open && setToastMessage(null)}
        variant="success"
      >
        <ToastTitle>{toastMessage?.title}</ToastTitle>
        <ToastDescription>{toastMessage?.desc}</ToastDescription>
        <ToastClose />
      </ToastRoot>
    </>
  );
}
