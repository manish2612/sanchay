"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormValues } from "../schema";

import { BasicProfileSection } from "./BasicProfileSection";
import { OperationsComplianceSection } from "./OperationsComplianceSection";

interface CompanyProfileStepProps {
  form: UseFormReturn<CompanyFormValues>;
}

export const CompanyProfileStep = ({ form }: CompanyProfileStepProps) => {
  return (
    <>
      <BasicProfileSection form={form} />
      <OperationsComplianceSection form={form} />
    </>
  );
};

