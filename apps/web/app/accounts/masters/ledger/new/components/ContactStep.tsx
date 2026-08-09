"use client";

import React from "react";
import { UseFormReturn } from "react-hook-form";
import { LedgerFormValues } from "../schema";
import { LEDGER_FORM_FIELDS } from "../constants";
import { 
  ContactPersonInputField,
  EmailInputField, 
  MobileInputField, 
  WhatsappInputField, 
  TelephoneInputField 
} from "../../../../../../components/shared-fields/ContactFields";

interface ContactStepProps {
  form: UseFormReturn<LedgerFormValues>;
}

export const ContactStep = ({ form }: ContactStepProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <ContactPersonInputField control={form.control} name={LEDGER_FORM_FIELDS.CONTACT_PERSON} />
      <EmailInputField control={form.control} name={LEDGER_FORM_FIELDS.EMAIL} />
      <MobileInputField control={form.control} name={LEDGER_FORM_FIELDS.MOBILE_NUMBER} />
      <WhatsappInputField control={form.control} name={LEDGER_FORM_FIELDS.WHATSAPP_NUMBER} />
      <TelephoneInputField control={form.control} name={LEDGER_FORM_FIELDS.LANDLINE_NO} />
    </div>
  );
};
