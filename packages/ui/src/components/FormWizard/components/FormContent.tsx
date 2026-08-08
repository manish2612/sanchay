'use client';

import React, { ReactNode, useEffect, useRef } from 'react';
import { useFormWizardContext } from '../hooks/useFormWizard';

export interface FormContentProps {
  children: ReactNode;
  className?: string;
}

export const FormContent = ({ children, className = '' }: FormContentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { currentStep } = useFormWizardContext();

  // Automatically focus the first input field whenever the step changes on Desktop screens (>= 1024px).
  // On mobile screens (< 1024px), auto-focus is skipped to prevent native virtual keyboards from popping up.
  useEffect(() => {
    // Only auto-focus on desktop viewports
    const isDesktop =
      typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    if (containerRef.current) {
      // We use requestAnimationFrame to ensure the DOM has fully rendered the new step's fields
      // before we attempt to query and focus them.
      const frameId = requestAnimationFrame(() => {
        const firstInput = containerRef.current?.querySelector<HTMLElement>(
          'input:not([type="hidden"]):not([disabled]), textarea:not([disabled]), select:not([disabled])',
        );
        if (firstInput) {
          // Native .focus() highlights the field without triggering popovers/dropdown open states
          firstInput.focus();
        }
      });
      return () => cancelAnimationFrame(frameId);
    }
  }, [currentStep]);

  return (
    <div
      ref={containerRef}
      className={`flex-1 overflow-y-auto overflow-x-hidden px-4 py-4 lg:px-7 lg:py-6 ${className}`}
    >
      {children}
    </div>
  );
};
