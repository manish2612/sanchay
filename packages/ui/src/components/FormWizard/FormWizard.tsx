'use client';

import React, { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Form } from '../Form';
import { FormWizardContext, useFormWizard } from './hooks/useFormWizard';
import { FormWizardProps, FormWizardStep } from './types';

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
  autoUnregisterFields = true,
}: FormWizardRootProps) => {
  const wizard = useFormWizard(initialStep, steps);

  // ── Stale-closure refs ────────────────────────────────────────────────────
  // Assigned synchronously each render so they always hold the latest value
  // inside async callbacks (e.g. after an `await form.trigger(...)` gap).
  const stepsRef = useRef<FormWizardStep[]>(wizard.steps);
  const currentStepRef = useRef<number>(wizard.currentStep);
  stepsRef.current = wizard.steps;
  currentStepRef.current = wizard.currentStep;
  // ─────────────────────────────────────────────────────────────────────────

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
    // Capture the step's identity (id) before the async gap so we can verify
    // it hasn't been removed or replaced while validation was in-flight.
    const validatingStepId = currentStepInfo?.id;

    if (currentStepInfo?.fields && currentStepInfo.fields.length > 0) {
      const isStepValid = await form.trigger(currentStepInfo.fields);

      // ── Stale-closure guard ───────────────────────────────────────────────
      // After the await, use refs (not closures) to read latest state.
      // If the step that was being validated no longer sits at the current
      // position (e.g. it was removed by a concurrent useEffect), abort silently
      // to avoid navigating to a stale or non-existent step.
      const latestCurrentStep = stepsRef.current[currentStepRef.current - 1];
      if (latestCurrentStep?.id !== validatingStepId) return;
      if (targetStep > stepsRef.current.length) return;
      // ─────────────────────────────────────────────────────────────────────

      // If validation fails, block the jump and shake the current step
      if (!isStepValid) {
        wizard.setRejectedStepIndex(currentStepRef.current);
        return;
      }
    }

    // Validation passed (or no validation required), execute the jump
    wizard.goToStep(targetStep);
  };

  // ── Field unregistration on step removal ──────────────────────────────────
  // Diffs wizard.steps against the previous render to detect removed steps.
  // Unregisters their RHF fields so orphaned values are not submitted.
  // Controlled by the autoUnregisterFields prop (default: true).
  const prevStepsRef = useRef<FormWizardStep[]>(wizard.steps);
  useEffect(() => {
    const prev = prevStepsRef.current;
    const current = wizard.steps;
    prevStepsRef.current = current;

    if (!autoUnregisterFields) return;

    const removedSteps = prev.filter((s) => !current.find((cs) => cs.id === s.id));
    removedSteps.forEach((step) => {
      if (step.fields?.length) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        form.unregister(step.fields as any);
      }
    });
    // `form` is a stable RHF object reference — safe to omit from deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wizard.steps, autoUnregisterFields]);
  // ─────────────────────────────────────────────────────────────────────────

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

