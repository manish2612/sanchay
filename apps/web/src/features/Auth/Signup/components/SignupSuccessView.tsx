import React from 'react';
import { Button, Icon, UniversalLink } from '@prime/ui';

interface SignupSuccessViewProps {
  email: string;
}

export function SignupSuccessView({ email }: SignupSuccessViewProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center text-primary">
        <Icon name="Mail" size={40} />
      </div>
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight text-foreground">
          Check your email
        </h2>
        <p className="text-muted-foreground max-w-sm">
          We've sent a verification link to{' '}
          <span className="font-medium text-foreground">{email}</span>. Please click the
          link to verify your account.
        </p>
      </div>
      <div className="w-full space-y-4 pt-4">
        <Button variant="primary" className="w-full h-12 text-base font-semibold" asChild>
          <UniversalLink href="/login">Return to Login</UniversalLink>
        </Button>
        <div className="text-sm text-muted-foreground">
          Didn't receive the email?{' '}
          <button className="font-semibold text-primary hover:underline hover:text-primary-hover transition-colors">
            Resend
          </button>
        </div>
      </div>
    </div>
  );
}
