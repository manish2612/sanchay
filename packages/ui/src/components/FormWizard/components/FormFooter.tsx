"use client";

import React from "react";
import { useFormWizardContext } from "../hooks/useFormWizard";
import { Button } from "../../../primitives/Button";
import { Icon } from "../../../primitives/Icon/Icon.dom";

import { useFormContext } from "react-hook-form";

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
  const { currentStep, totalSteps, nextStep, prevStep, steps } =
    useFormWizardContext();
  const { trigger, resetField, formState: { isDirty } } = useFormContext();

  const currentStepInfo = steps[currentStep - 1];
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  const handleNext = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (currentStepInfo?.fields && currentStepInfo.fields.length > 0) {
      const isStepValid = await trigger(currentStepInfo.fields);
      if (!isStepValid) return;
    }
    if (onNext) onNext();
    else nextStep();
  };

  const handleSkip = () => {
    if (currentStepInfo?.fields) {
      currentStepInfo.fields.forEach((field) => resetField(field));
    }
    if (onSkip) onSkip();
    else nextStep();
  };

  const handlePrev = () => {
    if (onPrev) onPrev();
    else prevStep();
  };

  return (
    <div className="flex-shrink-0 bg-surface/95 backdrop-blur-sm border-t border-surface-border px-7 py-3.5 flex items-center gap-2.5">
      {onCancel && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {currentStepInfo?.isOptional && !isLastStep && (
        <Button type="button" variant="ghost" onClick={handleSkip} className="text-muted-fg">
          Skip
        </Button>
      )}

      {totalSteps > 1 && !isFirstStep && (
        <Button type="button" variant="outline" onClick={handlePrev}>
          <Icon name="ChevronLeft" size={20} />
          Previous
        </Button>
      )}

      {onSave && (
        <Button
          type="button"
          variant="outline"
          onClick={onSave}
          disabled={!isDirty || isSubmitting}
          className="text-primary hover:bg-primary/10 border-primary/30 hover:text-primary disabled:border-border disabled:text-muted-fg disabled:hover:bg-transparent"
        >
          Save Draft
        </Button>
      )}

      <Button
        type={isLastStep ? "submit" : "button"}
        variant="primary"
        onClick={!isLastStep ? (e) => handleNext(e) : undefined}
        disabled={isSubmitting}
      >
        {isLastStep ? submitLabel : nextLabel}
        <Icon name="ChevronRight" size={20} />
      </Button>
    </div>
  );
};
