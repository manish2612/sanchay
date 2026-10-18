import React from 'react';
import { Icon, cn } from '@prime/ui';

export interface FormSubmissionErrorProps {
  error: string | null | undefined;
  onDismiss?: () => void;
  className?: string;
}

export function FormSubmissionError({
  error,
  onDismiss,
  className,
}: FormSubmissionErrorProps) {
  if (!error) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        'p-3.5 rounded-lg bg-danger/10 border border-danger/20 text-danger flex items-start gap-3 shadow-xs animate-in fade-in slide-in-from-top-1 duration-200',
        className
      )}
    >
      <div className="p-0.5 shrink-0 text-danger mt-0.5">
        <Icon name="CircleAlert" size={16} />
      </div>
      <div className="flex-1 text-sm font-medium leading-relaxed break-words">
        {error}
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="p-1 -mr-1 -mt-1 rounded-md text-danger/70 hover:text-danger hover:bg-danger/15 transition-colors shrink-0"
          aria-label="Dismiss error"
        >
          <Icon name="X" size={14} />
        </button>
      )}
    </div>
  );
}
