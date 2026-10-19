import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalFooter,
  Button,
  Icon,
} from '@prime/ui';
import type { Group } from '@/features/Masters/api/groupsApi';

export interface DeleteGroupModalProps {
  isOpen: boolean;
  group: Group | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteGroupModal({
  isOpen,
  group,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteGroupModalProps) {
  if (!group) return null;

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <ModalContent className="sm:max-w-[420px]">
        <ModalHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <Icon name="TriangleAlert" size={20} />
            <ModalTitle className="text-base font-bold text-foreground">
              Delete Group
            </ModalTitle>
          </div>
          <ModalDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
            Are you sure you want to delete the group{' '}
            <strong className="text-foreground font-semibold">
              &ldquo;{group.name}&rdquo;
            </strong>
            ? Any ledgers or subgroups dependent on this group may be affected. This action cannot be undone.
          </ModalDescription>
        </ModalHeader>

        <ModalFooter className="mt-5 gap-2 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            disabled={isDeleting}
            type="button"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onConfirm}
            disabled={isDeleting}
            className="gap-1.5"
            type="button"
          >
            {isDeleting ? (
              <Icon name="RefreshCw" size={14} className="animate-spin" />
            ) : (
              <Icon name="Trash2" size={14} />
            )}
            <span>{isDeleting ? 'Deleting...' : 'Delete Group'}</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
