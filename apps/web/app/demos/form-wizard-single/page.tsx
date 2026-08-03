"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { FormWizard, Form } from "@prime/ui";
import { User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SingleStepFormWizardDemo() {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Submitted single step data:", data);
    alert("Profile saved! See console for data.");
  };

  return (
    <div className="h-screen w-screen bg-bg p-8">
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
        steps={[{ id: 1, title: "Profile Details" }]}
        onSubmit={onSubmit}
      >
        <FormWizard.StepNav />

        <FormWizard.Container>
          <FormWizard.Header
            graphic={<User className="w-12 h-12 stroke-[1.25]" />}
            title="Edit Profile"
            subtitle="Update your personal information."
          />

          <FormWizard.Content>
            <div className="space-y-6 max-w-md mx-auto mt-4">
              <Form.Field
                control={form.control}
                name="firstName"
                render={({ field }: any) => (
                  <Form.Item>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control>
                      <input
                        {...field}
                        className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. John"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name="lastName"
                render={({ field }: any) => (
                  <Form.Item>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control>
                      <input
                        {...field}
                        className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="e.g. Doe"
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
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
}
