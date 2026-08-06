import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormWizard, Form, useFormWizardContext } from '../../../index';
import { Monitor } from 'lucide-react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const meta = {
  title: 'Components/FormWizard/MultiStep',
  component: FormWizard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FormWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  accountName: z.string().min(1, 'Account Name is required'),
  accountCode: z.string().min(1, 'Account Code is required'),
  internalNotes: z.string().optional(),
});

const STEPS = [
  {
    id: 1,
    title: 'Initial Setup',
    description: 'Basic details',
    fields: ['accountName', 'accountCode'],
  },
  {
    id: 2,
    title: 'General Details',
    description: 'Name, code & classification',
    isOptional: true,
    fields: ['internalNotes'],
  },
  {
    id: 3,
    title: 'Tax & Compliance',
    description: 'VAT, PAN & rates',
  },
];

const DemoWizardContent = ({ form }: { form: any }) => {
  const { currentStep } = useFormWizardContext();

  return (
    <FormWizard.Content>
      <div className="space-y-6">
        {currentStep === 1 && (
          <>
            <Form.Field
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Account Name *</Form.Label>
                  <Form.Control>
                    <input
                      {...field}
                      className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
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
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Account Code *</Form.Label>
                  <Form.Control>
                    <input
                      {...field}
                      className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
                      placeholder="e.g. 1000"
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </>
        )}

        {currentStep === 2 && (
          <>
            <Form.Field
              control={form.control}
              name="internalNotes"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Internal Notes (Optional)</Form.Label>
                  <Form.Control>
                    <textarea
                      {...field}
                      rows={4}
                      className="w-full p-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground resize-none"
                      placeholder="Add any internal classification notes here..."
                    />
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />
          </>
        )}

        {currentStep === 3 && (
          <div className="py-8 text-center text-muted-fg">
            <p>Tax and compliance details go here.</p>
            <p className="text-sm mt-2">Click Submit to finish the setup.</p>
          </div>
        )}
      </div>
    </FormWizard.Content>
  );
};

const MultiStepDemo = () => {
  const form = useForm({
    mode: 'onChange',
    resolver: zodResolver(formSchema),
    defaultValues: {
      accountName: '',
      accountCode: '',
      internalNotes: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Submitted data:', data);
    alert('Form submitted! See console for data.');
  };

  return (
    <div className="h-[100dvh] w-full bg-bg relative">
      <FormWizard form={form} initialStep={1} steps={STEPS} onSubmit={onSubmit}>
        <FormWizard.StepNav title="Create Account" />

        <FormWizard.Container>
          <FormWizard.Header
            graphic={<Monitor className="w-12 h-12 stroke-[1.25]" />}
          />

          <DemoWizardContent form={form} />

          <FormWizard.Footer
            onCancel={() => console.log('Cancelled')}
            onSave={() => console.log('Saved draft')}
          />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export const Default: Story = {
  render: () => <MultiStepDemo />,
};
