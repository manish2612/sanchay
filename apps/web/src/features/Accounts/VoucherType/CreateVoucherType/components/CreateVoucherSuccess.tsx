import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button, Icon } from '@prime/ui';

export interface CreateVoucherSuccessProps {
  itemName?: string;
  isEditMode?: boolean;
  onCreateAnother?: () => void;
  onBackToMasters?: () => void;
}

export const CreateVoucherSuccess = ({
  itemName,
  isEditMode = false,
  onCreateAnother,
  onBackToMasters,
}: CreateVoucherSuccessProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackToMasters) {
      onBackToMasters();
    } else {
      navigate({ to: '/accounts/masters/voucher-type' as any });
    }
  };

  const title = isEditMode ? 'Voucher Type Updated' : 'Voucher Type Created';
  const description = itemName ? (
    <>
      <span className="font-semibold text-foreground">{itemName}</span> has been successfully{' '}
      {isEditMode ? 'updated' : 'created and added to your voucher types'}.
    </>
  ) : isEditMode ? (
    'The voucher type has been successfully updated.'
  ) : (
    'The new voucher type has been successfully configured and is ready to use.'
  );

  return (
    <div className="flex flex-col h-full bg-background items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <Icon name="CircleCheck" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="flex flex-col gap-3 w-full">
          {!isEditMode && onCreateAnother && (
            <Button
              type="button"
              variant="primary"
              onClick={onCreateAnother}
              className="w-full"
            >
              Create Another Voucher Type
            </Button>
          )}
          <Button
            type="button"
            variant={isEditMode ? 'primary' : 'outline'}
            onClick={handleBack}
            className="w-full"
          >
            Back to Voucher Type List
          </Button>
        </div>
      </div>
    </div>
  );
};
