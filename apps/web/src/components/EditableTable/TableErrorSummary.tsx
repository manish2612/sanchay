import React from 'react';
import { Icon, Button } from '@prime/ui';
import type { TableErrorSummaryProps } from './types';

export const TableErrorSummary: React.FC<TableErrorSummaryProps> = ({
  errorsList,
  tableRootError,
  onResetRow,
  className = '',
}) => {
  if (errorsList.length === 0 && !tableRootError) return null;

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`border-t border-danger/20 bg-danger/5 px-3 py-2 text-xs text-danger ${className}`}
    >
      <div className="flex items-start gap-2">
        <Icon name="CircleAlert" size={15} className="mt-0.5 shrink-0 text-danger" />
        <div className="flex-1 space-y-1.5 min-w-0">
          {tableRootError && (
            <div className="font-medium text-danger">{tableRootError}</div>
          )}

          {errorsList.length > 0 && (
            <div className="space-y-1 divide-y divide-danger/10">
              {errorsList.map((row) => (
                <div
                  key={row.rowIndex}
                  className="pt-1 first:pt-0 flex flex-wrap items-center justify-between gap-2"
                >
                  <div className="flex flex-wrap items-center gap-1.5 min-w-0">
                    <span className="inline-flex items-center px-1.5 py-0.2 rounded font-semibold text-[10px] bg-danger/15 text-danger uppercase tracking-wider shrink-0">
                      Row {row.rowNumber}
                    </span>
                    <span className="text-foreground/80 font-normal">
                      {row.messages.join(' • ')}
                    </span>
                  </div>

                  {onResetRow && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 px-1.5 text-[11px] text-danger hover:bg-danger/10 hover:text-danger shrink-0 font-medium"
                      onClick={() => onResetRow(row.rowIndex)}
                      title={`Discard Row ${row.rowNumber}`}
                    >
                      <Icon name="RotateCcw" size={12} className="mr-1" />
                      Discard
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
