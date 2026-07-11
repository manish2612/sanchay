import * as React from "react"
import { useFormField } from "./useFormField"

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField()

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={className}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"
