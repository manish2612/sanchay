'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useLeavePrompt } from '../../hooks/useLeavePrompt';

export interface FormLeavePromptProps {
  /**
   * Custom message to show when leaving the form.
   * If not provided, a default message is used.
   * Note: Modern browsers may ignore this for tab close/refresh.
   */
  message?: string;
}

/**
 * A component that automatically reads the dirty state of the form
 * and prompts the user before they navigate away with unsaved changes.
 */
export const FormLeavePrompt: React.FC<FormLeavePromptProps> = ({ message }) => {
  const { formState } = useFormContext();
  
  // Prompt if the form has unsaved changes (dirty) and is not currently submitting
  const shouldPrompt = formState.isDirty && !formState.isSubmitting;
  
  useLeavePrompt(shouldPrompt, message);

  return null;
};
