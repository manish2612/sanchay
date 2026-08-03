"use client"

import * as React from "react"
import { useFormDemo } from "./useFormDemo"
import {
  Form,
  TextInput,
  Button,
  Text
} from "@prime/ui"

export function FormDemo() {
  const { form, fields, append, remove, onSubmit } = useFormDemo()

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <Text variant="heading">RHF Composition Demo</Text>
        <Text variant="body" className="text-gray-500 mt-2">
          This form demonstrates the highly-performant composition pattern using React Hook Form, Zod validation, and UI primitives.
        </Text>
      </div>

      <div className="border p-6 rounded-xl bg-white shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <Form.Section title="Basic Information" description="General details about the department.">
              {/* Standard Field */}
              <Form.Field
                control={form.control}
                name="departmentName"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Department Name</Form.Label>
                    <Form.Control>
                      <TextInput placeholder="e.g. Engineering" {...field} />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />
            </Form.Section>

            <Form.Section title="Employees (Dynamic Rows)" description="Add or remove employees for this department.">
              <div className="space-y-4">
                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-4 items-start p-4 border rounded-lg bg-gray-50">
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
                      <Button 
                        type="button" 
                        variant="ghost" 
                        onClick={() => remove(index)}
                      >
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
                onClick={() => append({ firstName: "", role: "" })}
              >
                + Add Employee
              </Button>
            </Form.Section>

            <div className="pt-6 border-t flex justify-end">
              <Button type="submit" variant="primary">
                Save Department
              </Button>
            </div>

          </form>
        </Form>
      </div>
    </div>
  )
}
