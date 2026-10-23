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
      className={`hidden lg:flex flex-row flex-shrink-0 relative items-center justify-start text-left px-7 py-5 border-b border-surface-border gap-5 ${className}`}
    >
      {graphic && (
        <div className="relative flex-shrink-0 flex items-center justify-center bg-transparent border-none text-primary transform scale-[0.85] origin-left">
          {graphic}
        </div>
      )}
      <div className="flex flex-col items-start gap-1 w-full min-w-0">
        <div className="font-head text-xl font-semibold text-fg tracking-normal">
          {displayTitle}
        </div>
        {displaySubtitle && (
          <div className="text-sm text-muted-fg leading-relaxed max-w-[480px]">
            {displaySubtitle}
          </div>
        )}
      </div>
    </div>
  );
};
