'use client';

import * as React from 'react';
import { useFormField } from './useFormField';
import { cn } from '../../utils';

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField();
  const errorMessage = error?.message ? String(error.message) : undefined;
  const body = errorMessage || children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-xs text-danger/90 mt-1', className)}
      {...props}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';
