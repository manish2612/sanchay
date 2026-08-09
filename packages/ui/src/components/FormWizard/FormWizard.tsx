'use client';

import React, { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '../Form';
import { FormWizardContext, useFormWizard } from './hooks/useFormWizard';
import { FormWizardProps } from './types';

export interface FormWizardRootProps extends FormWizardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any, any, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit?: (data: any) => void;
}

export const FormWizardRoot = ({
  form,
  onSubmit,
  initialStep,
  steps,
  children,
  className = '',
}: FormWizardRootProps) => {
  const wizard = useFormWizard(initialStep, steps);

  // A validation-aware jump function that safely handles step navigation logic.
  // This is passed into the context so it can be invoked by the Next button,
  // Sidebar clicks, and Keyboard shortcuts uniformly.
  const validatedGoToStep = async (targetStep: number) => {
    if (targetStep === wizard.currentStep) return;

    // Jumping backward is always allowed without triggering validation
    if (targetStep < wizard.currentStep) {
      wizard.goToStep(targetStep);
      return;
    }

    // Restrict forward jumps to next immediate step only to prevent bypassing validation
    // on intermediate steps. E.g. Prevents jumping from Step 1 straight to Step 3.
    if (targetStep > wizard.currentStep + 1) {
      wizard.setRejectedStepIndex(wizard.currentStep);
      return;
    }

    // Jumping forward requires validation of the current step
    const currentStepInfo = wizard.steps[wizard.currentStep - 1];
    if (currentStepInfo?.fields && currentStepInfo.fields.length > 0) {
      const isStepValid = await form.trigger(currentStepInfo.fields);
      // If validation fails, block the jump and shake the current step to indicate error
      if (!isStepValid) {
        wizard.setRejectedStepIndex(wizard.currentStep);
        return;
      }
    }

    // Validation passed (or no validation required), execute the jump
    wizard.goToStep(targetStep);
  };

  // Global hotkey listener for Power Users to navigate steps via keyboard
  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      // Listen for Option (Mac) or Alt (Windows) + Number keys
      if (!e.altKey) return;

      // Use e.code instead of e.key because Mac Option+Number emits special characters (e.g., Option+1 = "¡")
      const match = e.code.match(/^(?:Digit|Numpad)(\d)$/);
      if (!match) return;

      const num = parseInt(match[1], 10);
      if (isNaN(num) || num < 1 || num > (wizard.steps?.length || 0)) return;

      e.preventDefault();

      // Execute the unified jump handler
      await validatedGoToStep(num);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [
    wizard.currentStep,
    wizard.steps,
    wizard.goToStep,
    wizard.setRejectedStepIndex,
    form,
    validatedGoToStep,
  ]);

  const contextValue = {
    ...wizard,
    goToStep: validatedGoToStep,
  };

  return (
    <FormWizardContext.Provider value={contextValue}>
      <Form {...form}>
        <form
          onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
          className={`flex flex-col lg:flex-row h-full w-full overflow-hidden ${className}`}
        >
          {children}
        </form>
      </Form>
    </FormWizardContext.Provider>
  );
};
