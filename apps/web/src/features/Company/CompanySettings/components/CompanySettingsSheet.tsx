import React, { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Button,
  Icon,
} from '@prime/ui';
import { useCompanySettingsDrawer } from '../hooks/useCompanySettingsDrawer';
import { CompanySettingsForm } from './CompanySettingsForm';
import { DetailedCompany, LoginCompany } from '@/types/models/Company';

interface CompanySettingsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  company?: LoginCompany | DetailedCompany | null;
}

export function CompanySettingsSheet({ open, onOpenChange, company }: CompanySettingsSheetProps) {
  const { draft, setField, isDirty, isLoading, isSaving, error, reset, save } =
    useCompanySettingsDrawer(company?.id, open);

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSave = async () => {
    setErrorMessage(null);
    try {
      await save();
      setSaveSuccess(true);
      setTimeout(() => {
        setSaveSuccess(false);
        onOpenChange(false);
      }, 700);
    } catch (err: any) {
      setErrorMessage(
        err?.data?.message ||
          err?.message ||
          'Failed to update company settings. Please try again.',
      );
    }
  };

  const handleCancel = () => {
    reset();
    setErrorMessage(null);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:w-[580px] md:w-[720px] lg:w-[820px] xl:w-[880px] max-w-full sm:max-w-[95vw] flex flex-col p-0 gap-0 overflow-hidden"
        overlayClassName="!bg-foreground/15 supports-[backdrop-filter]:!backdrop-blur-[2px]"
      >
        {/* Header - Data-First Entity Hierarchy */}
        <SheetHeader className="p-5 pr-12 border-b border-border bg-surface shrink-0 text-left">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-primary/10 text-primary">
                <Icon name="Building" size={16} />
              </div>
              <SheetTitle className="text-xl font-bold text-foreground tracking-tight">
                {company?.name || 'Company Preferances'}
              </SheetTitle>
            </div>
            <SheetDescription className="text-xs text-muted-foreground flex flex-wrap items-center gap-2 pl-9">
              <span>Features & Operational Controls</span>
              {company?.tax_identifier && (
                <>
                  <span>•</span>
                  <span className="font-mono text-[11px] font-medium bg-muted/80 text-foreground/80 px-1.5 py-0.5 rounded">
                    REG: {company.tax_identifier}
                  </span>
                </>
              )}
            </SheetDescription>
          </div>
        </SheetHeader>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {errorMessage && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <Icon name="CircleAlert" size={16} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground gap-3">
              <Icon name="Loader" size={32} className="animate-spin text-primary" />
              <p className="text-sm">Loading Preferances...</p>
            </div>
          ) : (
            <CompanySettingsForm
              draft={draft}
              setField={setField}
              disabled={isLoading || isSaving}
            />
          )}
        </div>

        {/* Pinned Footer with Explicit Save & Cancel */}
        <SheetFooter className="p-4 border-t border-border bg-surface flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            disabled={!isDirty || isSaving || isLoading}
            className="text-xs text-muted-foreground hover:text-foreground justify-center sm:justify-start"
          >
            Discard Changes
          </Button>

          <div className="flex items-center gap-2.5 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isSaving}
              className="flex-1 sm:flex-initial"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleSave}
              disabled={!isDirty || isSaving || isLoading}
              className="flex-1 sm:flex-initial min-w-[130px] gap-2 font-medium"
            >
              {isSaving ? (
                <>
                  <Icon name="Loader" size={14} className="animate-spin" />
                  Saving...
                </>
              ) : saveSuccess ? (
                <>
                  <Icon name="Check" size={14} className="text-success" />
                  Saved!
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
