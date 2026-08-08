import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, TextInput, Button, Text } from '../../../index';

const meta = {
  title: 'Components/Form',
  component: Form,
  parameters: {
    layout: 'padded',
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

const formSchema = z.object({
  departmentName: z.string().min(2, 'Department name must be at least 2 characters.'),
  employees: z
    .array(
      z.object({
        firstName: z.string().min(1, 'First name is required'),
        role: z.string().min(1, 'Role is required'),
      }),
    )
    .min(1, 'At least one employee is required'),
});

type FormValues = z.infer<typeof formSchema>;

const RHFCompositionDemo = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentName: '',
      employees: [{ firstName: '', role: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    name: 'employees',
    control: form.control,
  });

  function onSubmit(data: FormValues) {
    console.log('Form Submitted:', data);
    alert(JSON.stringify(data, null, 2));
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 p-4">
      <div>
        <Text variant="heading">RHF Composition Demo</Text>
        <Text variant="body" className="text-gray-500 mt-2">
          This form demonstrates the highly-performant composition pattern using React Hook Form,
          Zod validation, and UI primitives.
        </Text>
      </div>

      <div className="border border-border p-6 rounded-xl bg-surface shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Form.Section
              title="Basic Information"
              description="General details about the department."
            >
              <Form.Field
                control={form.control}
                name="departmentName"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Control>
                      <TextInput
                        label="Department Name"
                        labelVariant="in-field"
                        placeholder="e.g. Engineering"
                        {...field}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </Form.Section>

            <Form.Section
              title="Employees (Dynamic Rows)"
              description="Add or remove employees for this department."
            >
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="flex gap-4 items-start p-4 border border-border rounded-lg bg-surface-variant"
                  >
                    <div className="flex-1">
                      <Form.Field
                        control={form.control}
                        name={`employees.${index}.firstName`}
                        render={({ field }) => (
                          <Form.Item>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control>
                              <TextInput placeholder="John" {...field} />
                            </Form.Control>
                            <Form.Message />
                          </Form.Item>
                        )}
                      />
                    </div>
                    <div className="flex-1">
                      <Form.Field
                        control={form.control}
                        name={`employees.${index}.role`}
                        render={({ field }) => (
                          <Form.Item>
                            <Form.Label>Role</Form.Label>
                            <Form.Control>
                              <TextInput placeholder="Developer" {...field} />
                            </Form.Control>
                            <Form.Message />
                          </Form.Item>
                        )}
                      />
                    </div>
                    <div className="pt-8">
                      <Button type="button" variant="ghost" onClick={() => remove(index)}>
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {form.formState.errors.employees?.root && (
                <p className="text-danger text-sm mt-2">
                  {form.formState.errors.employees.root.message}
                </p>
              )}

              <Button
                type="button"
                variant="secondary"
                className="mt-4"
                onClick={() => append({ firstName: '', role: '' })}
              >
                + Add Employee
              </Button>
            </Form.Section>

            <div className="pt-6 border-t border-border flex justify-end">
              <Button type="submit" variant="primary">
                Save Department
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export const Composition: Story = {
  render: () => <RHFCompositionDemo />,
};
