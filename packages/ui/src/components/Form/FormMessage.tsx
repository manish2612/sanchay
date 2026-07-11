import * as React from "react"
import { useFormField } from "./useFormField"

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message) : children

  if (!body) {
    return null
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={className}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"
