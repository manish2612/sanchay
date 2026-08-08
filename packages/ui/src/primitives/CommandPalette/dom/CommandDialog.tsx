'use client';

import * as React from 'react';
import { Modal as Dialog, ModalContent as DialogContent } from '../../../primitives/Modal/dom';
import { CommandPalette } from './CommandPalette';
import { CommandDialogProps } from '../types';

const CommandDialog = ({ children, open, onOpenChange, ...props }: CommandDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent className="overflow-hidden p-0 shadow-lg">
        <CommandPalette className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5">
          {children}
        </CommandPalette>
      </DialogContent>
    </Dialog>
  );
};

export { CommandDialog };
