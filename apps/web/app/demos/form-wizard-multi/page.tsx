"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FormWizard, Form } from "@prime/ui";
import { Monitor } from "lucide-react";
import { useRouter } from "next/navigation";

const STEPS = [
  { id: 1, title: "Initial Setup", description: "Basic details" },
  { id: 2, title: "General Details", description: "Name, code & classification" },
  { id: 3, title: "Tax & Compliance", description: "VAT, PAN & rates" },
];

export default function MultiStepFormWizardDemo() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      accountName: "",
      accountCode: "",
      internalNotes: "",
    },
  });

  const handleNext = () => {
    // In a real app, we might trigger form validation here
    // For the demo, we'll just let the wizard handle moving to the next step
    // by relying on the default behavior if onNext isn't prevented.
    // Wait, the FormFooter uses the context nextStep.
    // To do it properly we can just let it be handled by default by omitting onNext
    // or by passing a custom handler that does form.trigger().
  };

  const onSubmit = (data: any) => {
    console.log("Submitted data:", data);
    alert("Form submitted! See console for data.");
  };

  return (
    <div className="h-screen w-screen bg-bg">
      <div className="absolute top-4 right-4 z-50">
        <button
          type="button"
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-surface hover:bg-surface-hover border border-border rounded-md text-sm font-medium"
        >
          Back to Demos
        </button>
      </div>

      <FormWizard
        form={form}
        initialStep={1}
        steps={STEPS}
        onSubmit={onSubmit}
      >
        <FormWizard.StepNav />

        <FormWizard.Container>
          <FormWizard.Header
            graphic={<Monitor className="w-12 h-12 stroke-[1.25]" />}
            title="General Details"
            subtitle="Set the ledger account name, code, and operational classification."
          />

          <FormWizard.Content>
            {/* We can use the RHF Form components from @prime/ui here if they are exported */}
            <div className="space-y-6">
              <Form.Field
                control={form.control}
                name="accountName"
                render={({ field }: any) => (
                  <Form.Item>
                    <Form.Label>Account Name *</Form.Label>
                    <Form.Control>
                      <input
                        {...field}
                        className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Current Assets"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
              
              <FormWizard.Separator />

              <Form.Field
                control={form.control}
                name="accountCode"
                render={({ field }: any) => (
                  <Form.Item>
                    <Form.Label>Account Code</Form.Label>
                    <Form.Control>
                      <input
                        {...field}
                        className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. 1000"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </div>
          </FormWizard.Content>

          <FormWizard.Footer
            onCancel={() => router.push("/")}
            onSkip={() => console.log("Skipped")}
            onSave={() => console.log("Saved draft")}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
}
