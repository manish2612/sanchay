import React from 'react';
import { Icon, AnimatedNumber } from '@prime/ui';
import { cn } from '@prime/ui';

export interface AllocationTableLayoutProps {
  title: React.ReactNode;
  targetValue: number;
  currentValue: number;
  isOverAllocated: boolean;
  isFullyAllocated: boolean;
  formatOptions?: Intl.NumberFormatOptions;
  children: React.ReactNode;
  successMessage?: React.ReactNode;
  errorMessagePrefix?: string;
  errorMessageTargetLabel?: string;
}

export function AllocationTableLayout({
  title,
  targetValue,
  currentValue,
  isOverAllocated,
  isFullyAllocated,
  formatOptions,
  children,
  successMessage = "Total amount is fully allocated.",
  errorMessagePrefix = "Total allocated amount",
  errorMessageTargetLabel = "target amount"
}: AllocationTableLayoutProps) {
  return (
    <div className="flex flex-col space-y-3 h-full overflow-hidden">
      <div className="flex items-center justify-between flex-shrink-0">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <span className="text-xs text-muted-fg flex items-center gap-1">
          Allocated:
          <span className={cn(isOverAllocated && 'text-danger font-bold')}>
            <AnimatedNumber value={currentValue} formatOptions={formatOptions} />
          </span>
          / <AnimatedNumber value={targetValue} formatOptions={formatOptions} />
        </span>
      </div>
      
      <div className="rounded-md border border-border/40 bg-surface overflow-hidden flex-1 flex flex-col min-h-0">
        {children}
      </div>

      {isFullyAllocated && (
        <div className="flex items-center text-xs text-success bg-success/10 px-3 py-2 rounded-md border border-success/20 flex-shrink-0">
          <Icon name="CheckCircle2" size={16} className="mr-2 flex-shrink-0" />
          <span>{successMessage}</span>
        </div>
      )}

      {isOverAllocated && (
        <div className="flex items-center text-xs text-danger bg-danger/10 px-3 py-2 rounded-md border border-danger/20 flex-shrink-0">
          <Icon name="AlertCircle" size={16} className="mr-2 flex-shrink-0" />
          <span>
            {errorMessagePrefix} (
            <AnimatedNumber value={currentValue} formatOptions={formatOptions} />
            ) exceeds the {errorMessageTargetLabel} (
            <AnimatedNumber value={targetValue} formatOptions={formatOptions} />
            ). Please adjust your allocations.
          </span>
        </div>
      )}
    </div>
  );
}
