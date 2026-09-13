"use client";

import React from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { Form, Icon } from "@prime/ui";
import { CompanyFormValues } from "../schema";
import { COMPANY_FORM_FIELDS } from "../constants";
import { CountrySelectField, StateSelectField, AddressTextareaField, PincodeInputField } from "../../../../components/shared-fields/AddressFields";
import { EmailInputField, MobileInputField, WhatsappInputField, TelephoneInputField } from "../../../../components/shared-fields/ContactFields";
import { useGetGlobalMastersQuery } from "../../../Masters/api/globalMastersApi";

interface ContactLocationStepProps {
  form: UseFormReturn<CompanyFormValues>;
}

export const ContactLocationStep = ({ form }: ContactLocationStepProps) => {
  const selectedCountryId = useWatch({ control: form.control, name: COMPANY_FORM_FIELDS.COUNTRY });
  const { data } = useGetGlobalMastersQuery();
  
  const country = data?.countries?.find(c => c.id === selectedCountryId);
  const currencyInfo = country?.currency_info;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CountrySelectField control={form.control} name={COMPANY_FORM_FIELDS.COUNTRY} getValues={form.getValues} />
      
      {/* Base Currency Display (Read-Only, derived from Country) */}
      <div className="flex flex-col gap-1.5 h-[48px] justify-center px-3 border border-input rounded-md bg-muted/30">
        <label className="text-[10px] uppercase text-muted-foreground font-semibold leading-none tracking-wider">
          Base Currency
        </label>
        <div className="flex items-center gap-2 text-sm text-foreground">
          {currencyInfo ? (
            <>
              <span className="font-bold text-primary">{currencyInfo.symbol}</span>
              <span className="text-muted-foreground">- {currencyInfo.name}</span>
            </>
          ) : (
            <span className="text-muted-foreground opacity-70">Select a country first</span>
          )}
        </div>
      </div>

      <StateSelectField control={form.control} name={COMPANY_FORM_FIELDS.STATE} getValues={form.getValues} watchCountryName={COMPANY_FORM_FIELDS.COUNTRY} />
      
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
