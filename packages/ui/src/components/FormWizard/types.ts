import { ReactNode } from "react";

export interface FormWizardStep {
  id: string | number;
  title: string;
  description?: string;
  status?: "pending" | "in-progress" | "done";
  isOptional?: boolean;
  fields?: string[];
}

export interface FormWizardContextValue {
  currentStep: number;
  totalSteps: number;
  steps: FormWizardStep[];
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

export interface FormWizardProps {
  initialStep?: number;
  steps?: FormWizardStep[];
  children: ReactNode;
  className?: string;
}
