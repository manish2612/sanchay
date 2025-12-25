import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const textVariants = cva(
  "text-foreground", // default base class
  {
    variants: {
      variant: {
        body: "font-body",
        heading: "font-heading",
        mono: "font-mono",
      },
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
      },
      weight: {
        light: "font-light",
        regular: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      },
      color: {
        // We can map these to text-{color} classes provided by Tailwind
        // which uses the CSS variables from the theme adapter
        foreground: "text-foreground",
        muted: "text-muted",
        mutedForeground: "text-muted-foreground",
        primary: "text-primary",
        primaryForeground: "text-primary-foreground",
        secondary: "text-secondary",
        secondaryForeground: "text-secondary-foreground",
        danger: "text-danger",
        dangerForeground: "text-danger-foreground",
        success: "text-success",
        successForeground: "text-success-foreground",
        warning: "text-warning",
        warningForeground: "text-warning-foreground",
        info: "text-info",
        infoForeground: "text-info-foreground",
      },
      truncate: {
        true: "truncate",
      },
    },
    defaultVariants: {
      variant: "body",
      size: "md",
      weight: "regular",
      color: "foreground",
    },
  }
);

export interface TextProps
  extends
    Omit<React.HTMLAttributes<HTMLDivElement>, "color">,
    VariantProps<typeof textVariants> {
  asChild?: boolean;
}

const Text = React.forwardRef<HTMLDivElement, TextProps>(
  (
    {
      className,
      variant,
      size,
      weight,
      align,
      color,
      truncate,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "span";
    return (
      <Comp
        className={cn(
          textVariants({
            variant,
            size,
            weight,
            align,
            color,
            truncate,
            className,
          })
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Text.displayName = "Text";

export { Text, textVariants };
