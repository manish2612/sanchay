import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button, Icon } from '@prime/ui';

export interface CreateLedgerSuccessProps {
  itemName?: string;
  onCreateAnother?: () => void;
  onBackToList?: () => void;
}

export const CreateLedgerSuccess = ({
  itemName,
  onCreateAnother,
  onBackToList,
}: CreateLedgerSuccessProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBackToList) {
      onBackToList();
    } else {
      navigate({ to: '/accounts/masters/ledger' as any });
    }
  };

  return (
    <div className="flex flex-col h-full bg-background items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="max-w-md w-full bg-surface p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6">
          <Icon name="CircleCheck" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Ledger Created</h2>
        <p className="text-muted-foreground mb-6">
          {itemName ? (
            <>
              <span className="font-semibold text-foreground">{itemName}</span> has been successfully created and added to your ledgers.
            </>
          ) : (
            'The new ledger has been successfully configured and is ready to use.'
          )}
        </p>
        <div className="flex flex-col gap-3 w-full">
          <Button
            type="button"
            variant="primary"
            onClick={onCreateAnother || (() => window.location.reload())}
            className="w-full"
          >
            Create Another Ledger
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleBack}
            className="w-full"
          >
            Back to Ledger List
          </Button>
        </div>
      </div>
    </div>
  );
};
