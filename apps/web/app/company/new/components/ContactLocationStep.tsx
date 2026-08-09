"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { CompanyFormValues } from "../schema";
import { COMPANY_FORM_FIELDS } from "../constants";
import { CountrySelectField, StateSelectField, AddressTextareaField, PincodeInputField } from "../../../../components/shared-fields/AddressFields";
import { EmailInputField, MobileInputField, WhatsappInputField, TelephoneInputField } from "../../../../components/shared-fields/ContactFields";

interface ContactLocationStepProps {
  form: UseFormReturn<CompanyFormValues>;
}

export const ContactLocationStep = ({ form }: ContactLocationStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CountrySelectField control={form.control} name={COMPANY_FORM_FIELDS.COUNTRY} getValues={form.getValues} />
      <StateSelectField control={form.control} name={COMPANY_FORM_FIELDS.STATE} getValues={form.getValues} />
      
      <AddressTextareaField 
        control={form.control} 
        name={COMPANY_FORM_FIELDS.ADDRESS} 
        className="col-span-1 md:col-span-2" 
      />
      
      <PincodeInputField control={form.control} name={COMPANY_FORM_FIELDS.PINCODE} />
      <EmailInputField control={form.control} name={COMPANY_FORM_FIELDS.EMAIL} />
      <MobileInputField control={form.control} name={COMPANY_FORM_FIELDS.MOBILE_NUMBER} />
      <WhatsappInputField control={form.control} name={COMPANY_FORM_FIELDS.WHATSAPP_NUMBER} />
      <TelephoneInputField control={form.control} name={COMPANY_FORM_FIELDS.LANDLINE_NO} />
    </div>
  );
};
