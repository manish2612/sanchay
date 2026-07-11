"use client"

import * as React from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import {
  Form,
  TextInput,
  Button,
  Text
} from "@sanchay/ui"

const formSchema = z.object({
  departmentName: z.string().min(2, "Department name must be at least 2 characters."),
  employees: z.array(
    z.object({
      firstName: z.string().min(1, "First name is required"),
      role: z.string().min(1, "Role is required"),
    })
  ).min(1, "At least one employee is required"),
})

type FormValues = z.infer<typeof formSchema>

export function FormDemo() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departmentName: "",
      employees: [{ firstName: "", role: "" }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    name: "employees",
    control: form.control,
  })

  function onSubmit(data: FormValues) {
    console.log("Form Submitted:", data)
    alert(JSON.stringify(data, null, 2))
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <Text variant="heading1">RHF Composition Demo</Text>
        <Text variant="body1" className="text-gray-500 mt-2">
          This form demonstrates the highly-performant composition pattern using React Hook Form, Zod validation, and UI primitives.
        </Text>
      </div>

      <div className="border p-6 rounded-xl bg-white shadow-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Standard Field */}
            <Form.Field
              control={form.control}
              name="departmentName"
              render={({ field }) => (
                <Form.Item>
                  <Form.Label>Department Name</Form.Label>
                  <Form.Control>
                    <TextInput.Root>
                      <TextInput.Input placeholder="e.g. Engineering" {...field} />
                    </TextInput.Root>
                  </Form.Control>
                  <Form.Message />
                </Form.Item>
              )}
            />

            <hr className="my-8" />

            {/* Dynamic Array / Table-like Structure */}
            <div>
              <Text variant="heading4" className="mb-4">Employees (Dynamic Rows)</Text>
              
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
                              <TextInput.Root>
                                <TextInput.Input placeholder="John" {...field} />
                              </TextInput.Root>
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
                              <TextInput.Root>
                                <TextInput.Input placeholder="Developer" {...field} />
                              </TextInput.Root>
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
                <p className="text-red-500 text-sm mt-2">
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
            </div>

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
