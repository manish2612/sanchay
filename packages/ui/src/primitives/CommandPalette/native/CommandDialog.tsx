import React from 'react';
import { Modal, ModalContent } from '../../../primitives/Modal'; // Assuming generic exports exist or index resolves
import { CommandPalette } from './CommandPalette';
import { CommandDialogProps } from '../types';
import { styles } from '../styles';

// We need to ensure we can pass children to CommandPalette inside Modal
export const CommandDialog = ({ children, open, onOpenChange, ...props }: CommandDialogProps) => {
  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent style={styles.dialogContent}>
        <CommandPalette {...props}>{children}</CommandPalette>
      </ModalContent>
    </Modal>
  );
};
