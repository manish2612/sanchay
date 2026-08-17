'use client';

import * as React from 'react';
import { Icon } from '../../primitives/Icon/Icon.dom';
import { Button } from '../../primitives/Button';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
} from '../../primitives/Modal';
import type { UseFormLeaveGuardReturn } from '../../hooks/useFormLeaveGuard.dom';

export type LeavePromptDialogProps = UseFormLeaveGuardReturn;

/**
 * LeavePromptDialog
 *
 * Accessible confirmation dialog shown when a user attempts to navigate away
 * from a dirty form. Rendered via the existing Modal primitive (Radix Dialog).
 *
 * Wire this component's props with the return value of useFormLeaveGuard or
 * the LeavePromptDialog prop returned by useLeavePrompt.
 *
 * @example
 * const { LeavePromptDialog } = useLeavePrompt({ form });
 * return (
 *   <>
 *     <MyForm />
 *     <LeavePromptDialog />
 *   </>
 * );
 */
export const LeavePromptDialog: React.FC<LeavePromptDialogProps> = ({
  isOpen,
  proceed,
  reset,
  title,
  description,
  confirmLabel,
  cancelLabel,
}) => {
  // Intercept Radix's built-in close (Escape key or overlay click) so we
  // always route through `reset` — ensuring the blocker is properly cancelled.
  const handleOpenChange = (open: boolean) => {
    if (!open) reset();
  };

  return (
    <Modal open={isOpen} onOpenChange={handleOpenChange}>
      <ModalContent
        // Prevent the auto-focus from landing on the close (X) button;
        // we want focus to go to the "Keep editing" (safe) action instead.
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {/* Warning icon above the header */}
        <div className="flex justify-center mb-2 mt-1" aria-hidden="true">
          <span className="flex items-center justify-center h-12 w-12 rounded-full bg-danger/10">
            <Icon name="TriangleAlert" size={24} className="text-danger" />
          </span>
        </div>

        <ModalHeader className="text-center sm:text-center">
          <ModalTitle>{title}</ModalTitle>
          <ModalDescription>{description}</ModalDescription>
        </ModalHeader>

        <ModalFooter className="mt-2 sm:flex-row sm:justify-center gap-3">
          {/* Safe action — focused first, keyboard-accessible */}
          <Button
            type="button"
            variant="outline"
            onClick={reset}
            // autoFocus ensures the safe option is focused when dialog opens
            autoFocus
          >
            {cancelLabel}
          </Button>

          {/* Destructive action — discard changes and proceed with navigation */}
          <Button type="button" variant="destructive" onClick={proceed}>
            {confirmLabel}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

LeavePromptDialog.displayName = 'LeavePromptDialog';
