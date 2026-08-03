import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

export const formSchema = z.object({
  departmentName: z.string().min(2, "Department name must be at least 2 characters."),
  employees: z.array(
    z.object({
      firstName: z.string().min(1, "First name is required"),
      role: z.string().min(1, "Role is required"),
    })
  ).min(1, "At least one employee is required"),
})

export type FormValues = z.infer<typeof formSchema>

export function useFormDemo() {
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

  return {
    form,
    fields,
    append,
    remove,
    onSubmit,
  }
}
