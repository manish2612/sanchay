"use client";

import React, { ReactNode } from "react";
import { useFormWizardContext } from "../hooks/useFormWizard";

export interface FormContainerProps {
  children: ReactNode;
  className?: string;
}

export const FormContainer = ({ children, className = "" }: FormContainerProps) => {
  const { totalSteps } = useFormWizardContext();
  
  // If no steps, it takes full width without the overlapping card design
  const isSingleStep = totalSteps <= 1;

  return (
    <div
      className={`flex flex-col flex-1 min-w-0 bg-bg relative z-10 
      ${isSingleStep ? "p-0" : "lg:py-6 lg:pr-7"}`}
    >
      <div
        className={`flex flex-col flex-1 bg-surface overflow-hidden 
        ${
          isSingleStep
            ? "w-full h-full lg:h-auto lg:max-w-[800px] lg:mx-auto lg:rounded-[16px] lg:shadow-sm lg:my-6 lg:min-h-[500px]"
            : "lg:-ml-11 lg:max-w-[800px] lg:rounded-[16px] lg:shadow-[-8px_0_32px_rgba(0,31,63,0.12),0_8px_32px_rgba(0,31,63,0.10),0_2px_8px_rgba(0,31,63,0.06)] min-h-0"
        } ${className}`}
      >
        {/* Top gradient accent for multi-step */}
        {!isSingleStep && (
          <div className="hidden lg:block h-[3px] bg-gradient-to-r from-primary via-secondary to-focus-ring flex-shrink-0" />
        )}
        
        {children}
      </div>
    </div>
  );
};
