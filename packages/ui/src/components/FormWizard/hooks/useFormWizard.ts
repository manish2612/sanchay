"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { FormWizardContextValue, FormWizardStep } from "../types";

export const FormWizardContext = createContext<FormWizardContextValue | null>(null);

export const useFormWizardContext = () => {
  const context = useContext(FormWizardContext);
  if (!context) {
    throw new Error("useFormWizardContext must be used within a FormWizard");
  }
  return context;
};

export const useFormWizard = (initialStep = 1, steps: FormWizardStep[] = []) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [rejectedStepIndex, setRejectedStepIndex] = useState<number | null>(null);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length || 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const goToStep = useCallback((step: number) => {
    if (step >= 1 && step <= (steps.length || 1)) {
      setCurrentStep(step);
    }
  }, [steps.length]);

  return {
    currentStep,
    totalSteps: steps.length || 1,
    steps,
    rejectedStepIndex,
    setRejectedStepIndex,
    nextStep,
    prevStep,
    goToStep,
  };
};
