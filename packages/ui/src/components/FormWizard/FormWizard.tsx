"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Form } from "../Form";
import { FormWizardContext, useFormWizard } from "./hooks/useFormWizard";
import { FormWizardProps } from "./types";

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
  className = "",
}: FormWizardRootProps) => {
  const wizard = useFormWizard(initialStep, steps);

  return (
    <FormWizardContext.Provider value={wizard}>
      <Form {...form}>
        <form
          onSubmit={onSubmit ? form.handleSubmit(onSubmit) : undefined}
          className={`flex h-full w-full overflow-hidden ${className}`}
        >
          {children}
        </form>
      </Form>
    </FormWizardContext.Provider>
  );
};
