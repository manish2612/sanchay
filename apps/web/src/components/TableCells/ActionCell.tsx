import React from 'react';
import { Button, Icon, Tooltip, TooltipTrigger, TooltipContent } from '@prime/ui';

export const ActionCell = ({ row, table }: any) => {
  const meta = (table.options.meta || {}) as any;
  const removeRow = meta.actions?.removeRow || meta.removeRow;
  const resetRow = meta.actions?.resetRow || meta.resetRow;
  const onRowCommit = meta.actions?.onRowCommit || meta.onRowCommit;
  const isPhantom =
    meta.phantomRowConfig?.isPhantom?.(row) || Boolean((row.original as any)?.isPhantom);

  const rowError =
    meta?.state?.rowErrors?.[row.index] || meta?.rowErrors?.[row.index];
  const hasError = Boolean(
    rowError &&
      (typeof rowError === 'object' ? Object.keys(rowError).length > 0 : rowError)
  );
  const errorMessage =
    typeof rowError === 'object' && rowError !== null
      ? Object.values(rowError).find(
          (val) =>
            typeof val === 'string' ||
            (typeof val === 'object' && (val as any)?.message)
        )
      : undefined;
  const displayMsg =
    typeof errorMessage === 'string'
      ? errorMessage
      : (errorMessage as any)?.message;

  const isRowEmpty = meta?.state?.isRowEmpty?.(row);
  const isDirtyDraft = isPhantom && isRowEmpty === false;

  // Untouched phantom rows with no errors remain blank
  if (isPhantom && !isDirtyDraft && !hasError) {
    return null;
  }

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

      {isPhantom ? (
        // Dirty or invalid phantom row allows committing or discarding back to pristine
        <div className="flex items-center justify-center gap-1">
          {onRowCommit && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-primary hover:text-primary hover:bg-primary/10 shrink-0"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onRowCommit(row.index);
                  }}
                  aria-label="Commit row"
                >
                  <Icon className="text-primary" name="Check" size={15} />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-popover text-popover-foreground text-xs border border-border">
                Commit row (Enter)
              </TooltipContent>
            </Tooltip>
          )}

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-7 w-7 text-muted-fg hover:text-danger hover:bg-danger/10 shrink-0"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (resetRow) {
                    resetRow(row.index);
                  } else if (removeRow) {
                    removeRow(row.index);
                  }
                }}
                aria-label="Discard draft row"
              >
                <Icon className="text-danger" name="RotateCcw" size={15} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-popover text-popover-foreground text-xs border border-border">
              Discard draft row (Esc)
            </TooltipContent>
          </Tooltip>
        </div>
      ) : (
        // Committed rows have delete action
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
