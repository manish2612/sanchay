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
      className={`hidden lg:flex flex-shrink-0 relative lg:flex-row xl:flex-col lg:items-center xl:items-center lg:justify-start xl:justify-center lg:text-left xl:text-center px-7 lg:py-5 xl:py-7 border-b border-surface-border lg:gap-5 xl:gap-0 ${className}`}
    >
      {graphic && (
        <div className="relative flex-shrink-0 flex items-center justify-center bg-transparent border-none text-primary lg:mb-0 xl:mb-4 lg:transform lg:scale-[0.85] xl:scale-100 lg:origin-left xl:origin-center">
          {graphic}
        </div>
      )}
      <div className="flex flex-col lg:items-start xl:items-center gap-1 xl:gap-1.5 w-full min-w-0">
        <div className="font-head lg:text-xl xl:text-[26px] font-semibold text-fg lg:tracking-normal xl:tracking-tight">
          {displayTitle}
        </div>
        {displaySubtitle && (
          <div className="lg:text-sm xl:text-base text-muted-fg leading-relaxed max-w-[480px]">
            {displaySubtitle}
          </div>
        )}
      </div>
    </div>
  );
};
