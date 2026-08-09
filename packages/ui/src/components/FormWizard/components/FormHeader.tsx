import React, { ReactNode } from 'react';
import { useFormWizardContext } from '../hooks/useFormWizard';

export interface FormHeaderProps {
  graphic?: ReactNode;
  title?: string;
  subtitle?: ReactNode;
  className?: string;
}

export const FormHeader = ({ graphic, title, subtitle, className = '' }: FormHeaderProps) => {
  const { steps, currentStep } = useFormWizardContext();
  const currentStepInfo = steps[currentStep - 1];

  const displayTitle = title || currentStepInfo?.title || '';
  const displaySubtitle = subtitle || currentStepInfo?.description;

  return (
    <div
      className={`hidden lg:flex flex-shrink-0 relative flex-col items-center text-center px-7 py-7 border-b border-surface-border ${className}`}
    >
      {graphic && (
        <div className="relative flex-shrink-0 flex items-center justify-center bg-transparent border-none text-primary mb-4">
          {graphic}
        </div>
      )}
      <div className="flex flex-col items-center gap-1.5 w-full min-w-0">
        <div className="font-head text-[26px] font-semibold text-fg tracking-tight">
          {displayTitle}
        </div>
        {displaySubtitle && (
          <div className="text-base text-muted-fg leading-relaxed max-w-[480px]">
            {displaySubtitle}
          </div>
        )}
      </div>
    </div>
  );
};
