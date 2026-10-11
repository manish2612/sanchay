import React from 'react';
import { Button, Icon, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';

export const ActionCell = ({ row, table }: any) => {
  const meta = (table.options.meta || {}) as any;
  const removeRow = meta.actions?.removeRow || meta.removeRow;
  const isPhantom = meta.phantomRowConfig?.isPhantom?.(row) || (row.original as any).isPhantom;

  const rowError = meta?.state?.rowErrors?.[row.index] || meta?.rowErrors?.[row.index];
  const hasError = Boolean(
    rowError && (typeof rowError === 'object' ? Object.keys(rowError).length > 0 : rowError)
  );
  const errorMessage =
    typeof rowError === 'object' && rowError !== null
      ? Object.values(rowError).find(
          (val) => typeof val === 'string' || (typeof val === 'object' && (val as any)?.message)
        )
      : undefined;
  const displayMsg =
    typeof errorMessage === 'string' ? errorMessage : (errorMessage as any)?.message;

  if (isPhantom) return null;

  return (
    <div className="flex items-center justify-center gap-1 w-full h-full">
      {hasError && displayMsg && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="text-danger flex items-center justify-center cursor-help p-1">
              <Icon name="CircleAlert" size={16} />
            </span>
          </TooltipTrigger>
          <TooltipContent side="left" className="bg-danger text-white text-xs">
            {displayMsg}
          </TooltipContent>
        </Tooltip>
      )}
      {!isPhantom && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-fg hover:text-danger hover:bg-danger/10"
          onClick={() => removeRow?.(row.index)}
          aria-label="Remove row"
        >
          <Icon className="text-danger" name="Trash2" size={16} />
        </Button>
      )}
    </div>
  );
};
