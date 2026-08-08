import React from 'react';

export interface FormSeparatorProps {
  className?: string;
}

export const FormSeparator = ({ className = '' }: FormSeparatorProps) => {
  return (
    <div
      className={`h-[1px] bg-gradient-to-r from-primary/30 to-transparent my-6 ${className}`}
      role="separator"
    />
  );
};
