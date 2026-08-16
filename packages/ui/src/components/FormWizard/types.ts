import { ReactNode } from 'react';

export interface FormWizardStep {
  id: string | number;
  title: string;
  description?: string;
  status?: 'pending' | 'in-progress' | 'done';
  isOptional?: boolean;
  fields?: string[];
}

export interface FormWizardContextValue {
  currentStep: number;
  totalSteps: number;
  steps: FormWizardStep[];
  rejectedStepIndex: number | null;
  setRejectedStepIndex: (step: number | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  /** Idempotent. Appends if no afterStepId. Corrects cursor when inserting before current position. */
  addStep: (step: FormWizardStep, afterStepId?: FormWizardStep['id']) => void;
  /** Removes step by id. Atomically corrects cursor. No-op if id not found. */
  removeStep: (stepId: FormWizardStep['id']) => void;
  /** Shallow-merges patch into matching step. No-op if id not found. */
  updateStep: (stepId: FormWizardStep['id'], patch: Partial<FormWizardStep>) => void;
  /** Replaces the entire step list and resets currentStep to 1. */
  resetSteps: (steps: FormWizardStep[]) => void;
}

export interface FormWizardProps {
  initialStep?: number;
  steps?: FormWizardStep[];
  children: ReactNode;
  className?: string;
  /**
   * When true (default), removing a step automatically unregisters its
   * react-hook-form fields, preventing orphaned values from being submitted.
   * Set to false if you need to preserve field values across step removal.
   */
  autoUnregisterFields?: boolean;
}
