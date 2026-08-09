"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { LedgerFormValues } from "../schema";
import { LEDGER_FORM_FIELDS } from "../constants";
import { 
  CountrySelectField, 
  StateSelectField, 
  AddressTextareaField, 
  PincodeInputField 
} from "../../../../../../components/shared-fields/AddressFields";

interface AddressStepProps {
  form: UseFormReturn<LedgerFormValues>;
}

export const AddressStep = ({ form }: AddressStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CountrySelectField control={form.control} name={LEDGER_FORM_FIELDS.COUNTRY} getValues={form.getValues} />
      <StateSelectField control={form.control} name={LEDGER_FORM_FIELDS.STATE} getValues={form.getValues} />
      
      <AddressTextareaField 
        control={form.control} 
        name={LEDGER_FORM_FIELDS.ADDRESS} 
        className="col-span-1 md:col-span-2" 
      />
      
      <PincodeInputField control={form.control} name={LEDGER_FORM_FIELDS.PINCODE} />
    </div>
  );
};
