import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button, Icon } from '@prime/ui';

export interface CreateVoucherSuccessProps {
  itemName?: string;
  onCreateAnother?: () => void;
  onBackToMasters?: () => void;
}

export const CreateVoucherSuccess = ({
  itemName,
  onCreateAnother,
  onBackToMasters,
}: CreateVoucherSuccessProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackToMasters) {
      onBackToMasters();
    } else {
      navigate({ to: '/accounts/masters' as any });
    }
  };

  return (
    <div className="flex flex-col h-full bg-background items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <Icon name="CircleCheck" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Voucher Type Created</h2>
        <p className="text-muted-foreground mb-6">
          {itemName ? (
            <>
              <span className="font-semibold text-foreground">{itemName}</span> has been successfully created and added to your voucher types.
            </>
          ) : (
            'The new voucher type has been successfully configured and is ready to use.'
          )}
        </p>
        <div className="flex flex-col gap-3 w-full">
          <Button
            type="button"
            variant="primary"
            onClick={onCreateAnother || (() => window.location.reload())}
            className="w-full"
          >
            Create Another Voucher Type
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="w-full"
          >
            Back to Masters
          </Button>
        </div>
      </div>
    </div>
  );
};
