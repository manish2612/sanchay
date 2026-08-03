"use client";

import React from "react";
import { useFormWizardContext } from "../hooks/useFormWizard";

export interface FormFooterProps {
  onNext?: () => void;
  onPrev?: () => void;
  onSave?: () => void;
  onSkip?: () => void;
  onCancel?: () => void;
  nextLabel?: string;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export const FormFooter = ({
  onNext,
  onPrev,
  onSave,
  onSkip,
  onCancel,
  nextLabel = "Continue",
  submitLabel = "Submit",
  isSubmitting = false,
}: FormFooterProps) => {
  const { currentStep, totalSteps, nextStep, prevStep } = useFormWizardContext();

  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  const handleNext = () => {
    if (onNext) onNext();
    else nextStep();
  };

  const handlePrev = () => {
    if (onPrev) onPrev();
    else prevStep();
  };

  return (
    <div className="flex-shrink-0 bg-surface/95 backdrop-blur-sm border-t border-surface-border px-7 py-3.5 flex items-center gap-2.5">
      {onCancel && (
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm font-medium text-fg bg-surface-variant hover:bg-surface-hover border border-border rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Cancel
        </button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {onSkip && !isLastStep && (
        <button
          type="button"
          onClick={onSkip}
          className="px-4 py-2 text-sm font-medium text-muted-fg hover:text-fg hover:bg-surface-hover rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Skip
        </button>
      )}

      {totalSteps > 1 && !isFirstStep && (
        <button
          type="button"
          onClick={handlePrev}
          className="px-4 py-2 text-sm font-medium text-fg bg-surface-variant hover:bg-surface-hover border border-border rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Previous
        </button>
      )}

      {onSave && (
        <button
          type="button"
          onClick={onSave}
          className="px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 border border-primary/30 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          Save Draft
        </button>
      )}

      <button
        type={isLastStep ? "submit" : "button"}
        onClick={!isLastStep ? handleNext : undefined}
        disabled={isSubmitting}
        className="px-5 py-2 text-sm font-bold text-primary-fg bg-primary hover:bg-primary-hover rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLastStep ? submitLabel : nextLabel}
      </button>
    </div>
  );
};
