"use client"

import * as React from "react"
import { cn } from "../../utils"
import { Text } from "../../primitives/Text/Text.dom"

export interface FormSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
}

export const FormSection = React.forwardRef<HTMLDivElement, FormSectionProps>(
  ({ className, title, description, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("space-y-6", className)} {...props}>
        <div>
          <Text variant="heading" size="lg" className="mb-1">{title}</Text>
          {description && (
            <Text variant="body" size="sm" className="text-gray-500">
              {description}
            </Text>
          )}
        </div>
        <div className="space-y-4">
          {children}
        </div>
        <hr className="my-8 border-gray-200" />
      </div>
    )
  }
)
FormSection.displayName = "FormSection"
