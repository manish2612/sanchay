"use client";

import React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils";
import { WebTextInputProps } from "./types";
import { useTextInput } from "./useTextInput";

const rootVariants = cva(
  "flex items-center rounded-md border bg-transparent shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-danger focus-within:ring-danger",
        success: "border-success focus-within:ring-success",
      },
      disabled: {
        true: "opacity-50 cursor-not-allowed bg-surface-variant",
      },
      labelVariant: {
        default: "h-10 w-full px-3 py-2",
        "in-field": "min-h-[48px] w-full px-3 py-1.5",
        inline: "h-10 w-full px-3 py-2",
        hidden: "h-10 w-full px-3 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      labelVariant: "default",
    },
  },
);

export const TextInput = React.forwardRef<HTMLInputElement, WebTextInputProps>(
  (
    {
      className,
      inputClassName,
      variant,
      disabled,
      label,
      labelVariant = "default",
      leftSlot,
      rightSlot,
      prefixContent,
      id: idProp,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...props
    },
    ref,
  ) => {
    const { id, isFocused, onFocus, onBlur } = useTextInput(
      idProp,
      onFocusProp,
      onBlurProp,
    );

    const renderInputWrapper = (children: React.ReactNode) => (
      <div
        className={cn(
          rootVariants({ variant, disabled, labelVariant, className }),
        )}
      >
        {leftSlot && (
          <div className="text-muted-foreground mr-2 flex items-center justify-center">
            {leftSlot}
          </div>
        )}
        {children}
        {rightSlot && (
          <div className="text-muted-foreground ml-2 flex items-center justify-center">
            {rightSlot}
          </div>
        )}
      </div>
    );

    const innerInput = (
      <input
        ref={ref}
        id={id}
        disabled={disabled}
        onFocus={onFocus}
        onBlur={onBlur}
        className={cn(
          "flex-1 bg-transparent border-none outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed text-sm min-w-[60px]",
          labelVariant === "in-field" && "leading-tight text-foreground",
          inputClassName,
        )}
        {...props}
      />
    );

    const inputElement = prefixContent ? (
      <div className="flex flex-row flex-wrap items-center flex-1 w-full gap-1 py-0.5">
        {prefixContent}
        {innerInput}
      </div>
    ) : (
      innerInput
    );

    if (labelVariant === "in-field") {
      return (
        <div
          className={cn(
            rootVariants({ variant, disabled, labelVariant, className }),
          )}
        >
          {leftSlot && (
            <div className="text-muted-foreground mr-2 flex items-center justify-center shrink-0">
              {leftSlot}
            </div>
          )}
          <div className="flex-1 flex flex-col justify-center min-w-0">
            {label && (
              <label
                htmlFor={id}
                className="text-[10px] uppercase text-muted-foreground font-semibold leading-none tracking-wider cursor-text w-full mb-0.5"
              >
                {label}
              </label>
            )}
            {inputElement}
          </div>
          {rightSlot && (
            <div className="text-muted-foreground ml-2 flex items-center justify-center shrink-0">
              {rightSlot}
            </div>
          )}
        </div>
      );
    }

    if (labelVariant === "inline") {
      return (
        <div className="flex items-center w-full gap-3">
          {label && (
            <label
              htmlFor={id}
              className={cn(
                "text-sm font-medium leading-none shrink-0 w-[120px]",
                disabled && "cursor-not-allowed opacity-70",
              )}
            >
              {label}
            </label>
          )}
          <div className="flex-1">{renderInputWrapper(inputElement)}</div>
        </div>
      );
    }

    if (labelVariant === "hidden") {
      return (
        <div className="w-full">
          {label && (
            <label htmlFor={id} className="sr-only">
              {label}
            </label>
          )}
          {renderInputWrapper(inputElement)}
        </div>
      );
    }

    // Default
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className={cn(
              "text-sm font-medium leading-none",
              disabled && "cursor-not-allowed opacity-70",
            )}
          >
            {label}
          </label>
        )}
        {renderInputWrapper(inputElement)}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";
