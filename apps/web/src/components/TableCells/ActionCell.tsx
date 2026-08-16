import React from 'react';
import { Button, Icon } from '@prime/ui';

export const ActionCell = ({ row, table }: any) => {
  const meta = (table.options.meta || {}) as any;
  const removeRow = meta.removeRow;

  return (
    <div className="flex items-center justify-center w-full h-full">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-fg hover:text-destructive hover:bg-destructive/10"
        onClick={() => removeRow?.(row.index)}
        aria-label="Remove row"
      >
        <Icon className="text-danger" name="Trash2" size={16} />
      </Button>
    </div>
  );
};
