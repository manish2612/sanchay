'use client';

import { createContext, useContext, useReducer, useState, useCallback, useRef } from 'react';
import { FormWizardContextValue, FormWizardStep } from '../types';

// ─── Reducer ────────────────────────────────────────────────────────────────
// Single atomic state keeps `steps` and `currentStep` in sync.
// Both always update in one render — no intermediate state where steps changed
// but the cursor hasn't adjusted yet.

type WizardState = {
  steps: FormWizardStep[];
  currentStep: number;
};

type WizardAction =
  | { type: 'ADD_STEP'; step: FormWizardStep; afterStepId?: FormWizardStep['id'] }
  | { type: 'REMOVE_STEP'; stepId: FormWizardStep['id'] }
  | { type: 'UPDATE_STEP'; stepId: FormWizardStep['id']; patch: Partial<FormWizardStep> }
  | { type: 'RESET_STEPS'; steps: FormWizardStep[] }
  | { type: 'GO_TO'; step: number }
  | { type: 'NEXT' }
  | { type: 'PREV' };

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'ADD_STEP': {
      // Idempotency: silently no-op on duplicate id (warning emitted in hook)
      if (state.steps.some((s) => s.id === action.step.id)) return state;

      const total = state.steps.length;
      let insertIdx = total; // default: append to end

      if (action.afterStepId != null) {
        const afterIdx = state.steps.findIndex((s) => s.id === action.afterStepId);
        // Unknown afterStepId falls back to append (warning emitted in hook)
        insertIdx = afterIdx === -1 ? total : afterIdx + 1;
      }

      const newSteps = [
        ...state.steps.slice(0, insertIdx),
        action.step,
        ...state.steps.slice(insertIdx),
      ];

      // Shift cursor forward when inserting at or before the current position
      // so the user remains on the same step they were editing.
      // insertIdx is 0-based; currentStep is 1-based → compare (insertIdx + 1) <= currentStep
      const newCurrentStep =
        insertIdx + 1 <= state.currentStep ? state.currentStep + 1 : state.currentStep;

      return { steps: newSteps, currentStep: newCurrentStep };
    }

    case 'REMOVE_STEP': {
      const idx = state.steps.findIndex((s) => s.id === action.stepId);
      // Unknown id is a no-op (warning emitted in hook)
      if (idx === -1) return state;

      const newSteps = state.steps.filter((s) => s.id !== action.stepId);
      const removedStepNumber = idx + 1; // convert 0-based index to 1-based step number
      // Pull cursor back only when the removed step was at or before current position
      const newCurrentStep =
        removedStepNumber <= state.currentStep
          ? Math.max(state.currentStep - 1, 1)
          : state.currentStep;

      return { steps: newSteps, currentStep: newCurrentStep };
    }

    case 'UPDATE_STEP':
      return {
        ...state,
        steps: state.steps.map((s) =>
          s.id === action.stepId ? { ...s, ...action.patch } : s,
        ),
      };

    case 'RESET_STEPS':
      return { steps: action.steps, currentStep: 1 };

    case 'GO_TO': {
      const { step } = action;
      if (step < 1 || step > (state.steps.length || 1)) return state;
      return { ...state, currentStep: step };
    }

    case 'NEXT':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.steps.length || 1),
      };

    case 'PREV':
      return { ...state, currentStep: Math.max(state.currentStep - 1, 1) };

    default:
      return state;
  }
}
// ────────────────────────────────────────────────────────────────────────────

export const FormWizardContext = createContext<FormWizardContextValue | null>(null);

export const useFormWizardContext = () => {
  const context = useContext(FormWizardContext);
  if (!context) {
    throw new Error('useFormWizardContext must be used within a FormWizard');
  }
  return context;
};

export const useFormWizard = (initialStep = 1, initialSteps: FormWizardStep[] = []) => {
  const [{ steps, currentStep }, dispatch] = useReducer(wizardReducer, {
    steps: initialSteps,
    currentStep: initialStep,
  });

  // Transient animation state — independent from step/cursor transitions
  const [rejectedStepIndex, setRejectedStepIndex] = useState<number | null>(null);

  // Ref gives dev-time warnings synchronous access to latest steps without
  // adding `steps` to callback deps arrays (which would make them unstable)
  const stepsRef = useRef(steps);
  stepsRef.current = steps;

  // ─── Navigation ───────────────────────────────────────────────────────────
  // All dispatch calls — empty deps, permanently stable references

  const nextStep = useCallback(() => dispatch({ type: 'NEXT' }), []);
  const prevStep = useCallback(() => dispatch({ type: 'PREV' }), []);
  const goToStep = useCallback((step: number) => dispatch({ type: 'GO_TO', step }), []);

  // ─── Step Mutators ────────────────────────────────────────────────────────

  const addStep = useCallback((step: FormWizardStep, afterStepId?: FormWizardStep['id']) => {
    if (process.env.NODE_ENV !== 'production') {
      if (stepsRef.current.some((s) => s.id === step.id)) {
        console.warn(`[FormWizard] addStep: step with id "${step.id}" already exists — no-op.`);
      } else if (afterStepId != null && !stepsRef.current.some((s) => s.id === afterStepId)) {
        console.warn(
          `[FormWizard] addStep: afterStepId "${afterStepId}" not found — step will be appended.`,
        );
      }
    }
    dispatch({ type: 'ADD_STEP', step, afterStepId });
  }, []);

  const removeStep = useCallback((stepId: FormWizardStep['id']) => {
    if (process.env.NODE_ENV !== 'production') {
      if (!stepsRef.current.some((s) => s.id === stepId)) {
        console.warn(`[FormWizard] removeStep: step with id "${stepId}" not found — no-op.`);
      }
    }
    dispatch({ type: 'REMOVE_STEP', stepId });
  }, []);

  const updateStep = useCallback(
    (stepId: FormWizardStep['id'], patch: Partial<FormWizardStep>) => {
      if (process.env.NODE_ENV !== 'production') {
        if (!stepsRef.current.some((s) => s.id === stepId)) {
          console.warn(`[FormWizard] updateStep: step with id "${stepId}" not found — no-op.`);
        }
      }
      dispatch({ type: 'UPDATE_STEP', stepId, patch });
    },
    [],
  );

  const resetSteps = useCallback((newSteps: FormWizardStep[]) => {
    dispatch({ type: 'RESET_STEPS', steps: newSteps });
  }, []);

  return {
    currentStep,
    totalSteps: steps.length || 1,
    steps,
    rejectedStepIndex,
    setRejectedStepIndex,
    nextStep,
    prevStep,
    goToStep,
    addStep,
    removeStep,
    updateStep,
    resetSteps,
  };
};

