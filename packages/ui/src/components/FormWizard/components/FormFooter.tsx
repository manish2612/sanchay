"use client";

import React from "react";
import { useFormWizardContext } from "../hooks/useFormWizard";
import { Button } from "../../../primitives/Button";
import { Icon } from "../../../primitives/Icon/Icon.dom";

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
  const { currentStep, totalSteps, nextStep, prevStep } =
    useFormWizardContext();

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
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {onSkip && !isLastStep && (
        <Button variant="ghost" onClick={onSkip} className="text-muted-fg">
          Skip
        </Button>
      )}

      {totalSteps > 1 && !isFirstStep && (
        <Button variant="outline" onClick={handlePrev}>
          <Icon name="ChevronLeft" size={20} />
          Previous
        </Button>
      )}

      {onSave && (
        <Button
          variant="outline"
          onClick={onSave}
          className="text-primary hover:bg-primary/10 border-primary/30 hover:text-primary"
        >
          Save Draft
        </Button>
      )}

      <Button
        type={isLastStep ? "submit" : "button"}
        variant="primary"
        onClick={!isLastStep ? handleNext : undefined}
        disabled={isSubmitting}
      >
        {isLastStep ? submitLabel : nextLabel}
        <Icon name="ChevronRight" size={20} />
      </Button>
    </div>
  );
};
