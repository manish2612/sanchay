import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';
import { FormWizard, Form } from '../../../index';
import { User } from 'lucide-react';

const meta = {
  title: 'Components/FormWizard/SingleStep',
  component: FormWizard,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof FormWizard>;

export default meta;
type Story = StoryObj<typeof meta>;

const SingleStepDemo = () => {
  const form = useForm({
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
    },
  });

  const onSubmit = (data: any) => {
    console.log('Submitted single step data:', data);
    alert('Profile saved! See console for data.');
  };

  return (
    <div className="h-[100dvh] w-full bg-bg relative">
      <FormWizard
        form={form}
        initialStep={1}
        steps={[{ id: 1, title: 'Profile Details' }]}
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
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control>
                      <input
                        {...field}
                        className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
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
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control>
                      <input
                        {...field}
                        className="w-full h-10 px-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-transparent text-foreground"
                        placeholder="e.g. Doe"
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </div>
          </FormWizard.Content>

          <FormWizard.Footer onCancel={() => console.log('Cancelled')} />
        </FormWizard.Container>
      </FormWizard>
    </div>
  );
};

export const Default: Story = {
  render: () => <SingleStepDemo />,
  args: {} as React.ComponentProps<typeof FormWizard>,
};
