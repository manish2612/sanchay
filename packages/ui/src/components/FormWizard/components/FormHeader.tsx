import React, { ReactNode } from "react";
import { useFormWizardContext } from "../hooks/useFormWizard";

export interface FormHeaderProps {
  graphic?: ReactNode;
  title?: string;
  subtitle?: ReactNode;
}

export const FormHeader = ({ graphic, title, subtitle }: FormHeaderProps) => {
  const { steps, currentStep } = useFormWizardContext();
  const currentStepInfo = steps[currentStep - 1];

  const displayTitle = title || currentStepInfo?.title || "";
  const displaySubtitle = subtitle || currentStepInfo?.description;

  return (
    <div className="flex-shrink-0 relative flex flex-col items-center text-center px-7 py-7 border-b border-surface-border">
      {graphic && (
        <div className="relative flex-shrink-0 flex items-center justify-center w-[140px] h-[80px] bg-transparent border-none text-primary">
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
