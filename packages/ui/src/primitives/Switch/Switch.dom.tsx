import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../utils";

const switchRootVariants = cva(
  "w-[2.2em] h-[1.2em] p-[0.1em] peer inline-flex shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
  {
    variants: {
      size: {
        sm: "text-[length:var(--space-4)]",
        default: "text-[length:var(--space-5)]",
        lg: "text-[length:var(--space-6)]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

const switchThumbVariants = cva(
  "w-[1em] h-[1em] pointer-events-none block rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=unchecked]:translate-x-0 data-[state=checked]:translate-x-full",
  {
    variants: {
      size: {
        sm: "",
        default: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface SwitchProps
  extends
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchRootVariants> {
  label?: string;
  labelVariant?: "default" | "in-field" | "inline" | "hidden";
  labelPosition?: "left" | "right";
}

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, size, label, labelVariant = "inline", labelPosition = "right", id: idProp, disabled, ...props }, ref) => {
  const switchId = React.useId();
  const id = idProp || switchId;

  const switchElement = (
    <SwitchPrimitives.Root
      id={id}
      disabled={disabled}
      className={cn(switchRootVariants({ size, className }))}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb className={cn(switchThumbVariants({ size }))} />
    </SwitchPrimitives.Root>
  );

  if (!label) return switchElement;

  if (labelVariant === "hidden") {
    return (
      <div className="flex items-center">
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
        {switchElement}
      </div>
    );
  }

  if (labelVariant === "inline" || labelVariant === "in-field") {
    return (
      <div className={cn("flex items-center gap-3", labelPosition === "left" && "justify-between w-full")}>
        {labelPosition === "left" && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none cursor-pointer select-none",
              disabled && "cursor-not-allowed opacity-70"
            )}
          >
            {label}
          </label>
        )}
        {switchElement}
        {labelPosition === "right" && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none cursor-pointer select-none",
              disabled && "cursor-not-allowed opacity-70"
            )}
          >
            {label}
          </label>
        )}
      </div>
    );
  }

  // Default vertical stacking
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label
        htmlFor={id}
        className={cn(
          "text-sm font-medium leading-none cursor-pointer select-none",
          disabled && "cursor-not-allowed opacity-70"
        )}
      >
        {label}
      </label>
      {switchElement}
    </div>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
