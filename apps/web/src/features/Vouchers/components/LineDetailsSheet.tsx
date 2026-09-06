import React, { useEffect, useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  TextInput,
  Button,
} from '@prime/ui';

export interface LineDetailsSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rowIndex: number | null;
  row: any;
  updateData?: (rowIndex: number, columnId: string, value: unknown) => void;
}

export function LineDetailsSheet({
  open,
  onOpenChange,
  rowIndex,
  row,
  updateData,
}: LineDetailsSheetProps) {
  const [description, setDescription] = useState('');

  // Sync state when row changes
  useEffect(() => {
    if (row && open) {
      setDescription(row.description || '');
    }
  }, [row, open]);

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleSave = () => {
    if (rowIndex !== null && updateData) {
      updateData(rowIndex, 'description', description);
    }
    handleClose();
  };

  const itemName = row?.name || row?.item || 'Unknown Item';

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader className="pb-3 mb-6 border-b border-border/50">
          <SheetTitle className="text-xl text-foreground">{itemName}</SheetTitle>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
            Line Item Details
          </p>
          <SheetDescription className="sr-only">
            Edit additional details and narrations for {itemName}
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="description"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Description / Narration
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter additional details for this line item..."
              className="flex min-h-[120px] w-full rounded-md border border-input bg-surface px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="ghost" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Details</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
