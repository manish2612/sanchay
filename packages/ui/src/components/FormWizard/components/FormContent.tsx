"use client";

import React, { ReactNode, useEffect, useRef } from "react";
import { useFormWizardContext } from "../hooks/useFormWizard";

export interface FormContentProps {
  children: ReactNode;
  className?: string;
}

export const FormContent = ({ children, className = "" }: FormContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentStep } = useFormWizardContext();

  // Automatically focus the first input field whenever the step changes
  // This improves accessibility for keyboard users by keeping their hands on the keyboard
  useEffect(() => {
    if (containerRef.current) {
      // We use requestAnimationFrame to ensure the DOM has fully rendered the new step's fields
      // before we attempt to query and focus them.
      requestAnimationFrame(() => {
        const firstInput = containerRef.current?.querySelector<HTMLElement>(
          'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])',
        );
        if (firstInput) {
          firstInput.focus();
        }
      });
    }
  }, [currentStep]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 overflow-y-auto overflow-x-hidden px-7 py-6 ${className}`}
    >
      {children}
    </div>
  );
};
