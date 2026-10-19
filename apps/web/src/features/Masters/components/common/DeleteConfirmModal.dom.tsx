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

export interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  itemName?: string | null;
  itemType?: string;
  description?: React.ReactNode;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
  confirmLabel?: string;
}

export function DeleteConfirmModal({
  isOpen,
  title,
  itemName,
  itemType = 'item',
  description,
  isDeleting,
  onClose,
  onConfirm,
  confirmLabel,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  const modalTitle = title ?? `Delete ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`;
  const confirmButtonText =
    confirmLabel ?? (isDeleting ? 'Deleting...' : `Delete ${itemType.charAt(0).toUpperCase() + itemType.slice(1)}`);

  return (
    <Modal open={isOpen} onOpenChange={(open) => !open && !isDeleting && onClose()}>
      <ModalContent className="sm:max-w-[420px]">
        <ModalHeader>
          <div className="flex items-center gap-2 text-destructive mb-1">
            <Icon name="TriangleAlert" size={20} />
            <ModalTitle className="text-base font-bold text-foreground">
              {modalTitle}
            </ModalTitle>
          </div>
          <ModalDescription className="text-xs text-muted-foreground leading-relaxed pt-1">
            {description ? (
              description
            ) : (
              <>
                Are you sure you want to delete {itemType ? `the ${itemType.toLowerCase()}` : 'this item'}{' '}
                {itemName && (
                  <strong className="text-foreground font-semibold">
                    &ldquo;{itemName}&rdquo;
                  </strong>
                )}
                ? Any dependent records may be affected. This action cannot be undone.
              </>
            )}
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
            <span>{confirmButtonText}</span>
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
