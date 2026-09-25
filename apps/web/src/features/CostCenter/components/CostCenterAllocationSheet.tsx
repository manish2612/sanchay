import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  Button,
  Switch,
  Icon,
} from '@prime/ui';
import { CostCenterAllocationTable } from './CostCenterAllocationTable';
import type { CostCenterAllocationRow } from './CostCenterAllocationTable/columns';
import { useCostCenterAllocationSheet } from '../hooks/useCostCenterAllocationSheet';

export interface CostCenterAllocationSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetAmount: number;
  ledgerName: string;
  initialAllocations?: CostCenterAllocationRow[];
  onSave: (allocations: CostCenterAllocationRow[]) => void;
}

export function CostCenterAllocationSheet(props: CostCenterAllocationSheetProps) {
  const {
    open,
    onOpenChange,
    targetAmount,
    ledgerName,
    initialAllocations = [],
  } = props;

  const {
    allocations,
    setAllocations,
    autoCloseEnabled,
    handleToggleAutoClose,
    isAutoClosing,
    progressWidth,
    isBalanced,
    handleManualSave,
    handleClose,
  } = useCostCenterAllocationSheet(props);

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent side="right" className="w-[500px] sm:w-[600px] flex flex-col p-0">
        <div className="px-6 pt-6 pb-4 border-b border-border/50 flex-shrink-0">
          <SheetHeader>
            <SheetTitle className="text-xl text-foreground">{ledgerName || 'Ledger'}</SheetTitle>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
              Cost Centre Allocations
            </p>
            <SheetDescription className="sr-only">
              Allocate amounts to cost centers for {ledgerName}
            </SheetDescription>
          </SheetHeader>
        </div>
        
        <div className="flex-1 overflow-hidden p-6 relative flex flex-col min-h-0">
          <CostCenterAllocationTable
            initialAllocations={initialAllocations}
            targetAmount={targetAmount}
            onChange={setAllocations}
          />
        </div>

        <div className="px-6 py-4 border-t border-border/50 bg-surface-variant/30 flex items-center justify-between flex-shrink-0 relative">
          {isAutoClosing && (
            <div className="absolute top-0 left-0 h-1 bg-success/20 w-full overflow-hidden">
              <div 
                className="h-full bg-success transition-[width] duration-[800ms] ease-linear" 
                style={{ width: progressWidth }}
              ></div>
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Switch 
              checked={autoCloseEnabled} 
              onCheckedChange={handleToggleAutoClose} 
              id="auto-close-toggle" 
              className="scale-75"
            />
            <label htmlFor="auto-close-toggle" className="text-xs text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors">
              Auto-close when balanced
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleManualSave} 
              disabled={!isBalanced || isAutoClosing}
              className="min-w-[140px] relative overflow-hidden transition-all duration-300"
              variant={isBalanced ? "primary" : "secondary"}
            >
              {isAutoClosing ? (
                <span className="flex items-center gap-2">
                  <Icon name="Loader2" className="animate-spin" size={14} />
                  Saving...
                </span>
              ) : (
                'Save Allocations'
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
