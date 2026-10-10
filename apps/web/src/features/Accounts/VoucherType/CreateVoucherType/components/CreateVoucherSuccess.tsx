import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '@prime/ui';
import { CheckCircle2 } from 'lucide-react';

export const CreateVoucherSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6 text-center animate-in fade-in zoom-in duration-500">
      <div className="bg-primary/10 p-6 rounded-full">
        <CheckCircle2 size={64} className="text-primary" />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Voucher Type Created!</h2>
        <p className="text-muted-foreground max-w-sm">
          The new voucher type has been successfully configured and is ready to use.
        </p>
      </div>
      <div className="flex gap-4 pt-4">
        <Button variant="outline" onClick={() => navigate({ to: '/accounts/masters' as any })}>
          Go to Masters
        </Button>
        <Button onClick={() => window.location.reload()}>
          Create Another
        </Button>
      </div>
    </div>
  );
};
