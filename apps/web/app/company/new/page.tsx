"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { FormWizard, Icon, useFormWizardContext } from "@prime/ui";

import { companyFormSchema, type CompanyFormValues } from "./schema";
import { COMPANY_FORM_FIELDS, COMPANY_WIZARD_STEPS } from "./constants";

import { CompanyProfileStep } from "./components/CompanyProfileStep";
import { ContactLocationStep } from "./components/ContactLocationStep";
import { OperationsComplianceStep } from "./components/OperationsComplianceStep";

const WizardContent = ({ form }: { form: any }) => {
  const { currentStep } = useFormWizardContext();

  return (
    <FormWizard.Content>
      <div className="space-y-6 max-w-2xl mx-auto mt-4">
        {currentStep === 1 && <CompanyProfileStep form={form} />}
        {currentStep === 2 && <ContactLocationStep form={form} />}
        {currentStep === 3 && <OperationsComplianceStep form={form} />}
      </div>
    </FormWizard.Content>
  );
};

const FormWizardHeaderWithContext = ({ getHeaderIcon }: { getHeaderIcon: (step: number) => React.ReactNode }) => {
  const { currentStep } = useFormWizardContext();
  const stepConfig = COMPANY_WIZARD_STEPS.find((s) => s.id === currentStep);

  return (
    <FormWizard.Header
      graphic={getHeaderIcon(currentStep)}
      title={stepConfig?.title || "Create Company"}
      subtitle={stepConfig?.description}
    />
  );
};

const CreateCompanyPage = () => {
  const router = useRouter();

  const form = useForm<CompanyFormValues>({
    mode: "onChange",
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      [COMPANY_FORM_FIELDS.NAME]: "",
      [COMPANY_FORM_FIELDS.MAILING_NAME]: "",
      [COMPANY_FORM_FIELDS.TIMEZONE]: "",
      [COMPANY_FORM_FIELDS.COUNTRY]: "",
      [COMPANY_FORM_FIELDS.STATE]: "",
      [COMPANY_FORM_FIELDS.ADDRESS]: "",
      [COMPANY_FORM_FIELDS.PINCODE]: "",
      [COMPANY_FORM_FIELDS.EMAIL]: "",
      [COMPANY_FORM_FIELDS.MOBILE_NUMBER]: "",
      [COMPANY_FORM_FIELDS.WHATSAPP_NUMBER]: "",
      [COMPANY_FORM_FIELDS.LANDLINE_NO]: "",
      [COMPANY_FORM_FIELDS.REGISTRATION_TYPE]: "",
      [COMPANY_FORM_FIELDS.REGISTRATION_NUMBER]: "",
    },
  });

  const onSubmit = (data: CompanyFormValues) => {
    console.log("Submitted company data:", data);
    alert("Company created successfully! Check console for details.");
    router.push("/");
  };

  const getHeaderIcon = (step: number) => {
    switch (step) {
      case 1:
        return <Icon name="Building2" size={48} className="stroke-[1.25]" />;
      case 2:
        return <Icon name="MapPin" size={48} className="stroke-[1.25]" />;
      case 3:
        return <Icon name="Briefcase" size={48} className="stroke-[1.25]" />;
      default:
        return <Icon name="Building2" size={48} className="stroke-[1.25]" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <FormWizard
        form={form}
        initialStep={1}
        steps={COMPANY_WIZARD_STEPS}
        onSubmit={onSubmit}
      >
        <FormWizard.StepNav />

        <FormWizard.Container>
          <FormWizardHeaderWithContext getHeaderIcon={getHeaderIcon} />
          
          <WizardContent form={form} />

          <FormWizard.Footer
            onCancel={() => router.push("/")}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export default CreateCompanyPage;
