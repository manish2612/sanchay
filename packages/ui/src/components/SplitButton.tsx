"use client";

import React from "react";
import { Button } from "../primitives/Button/Button.dom";
import { DropdownMenu } from "./DropdownMenu";
import { Icon } from "../primitives/Icon/Icon.dom";

export interface SplitButtonItem {
  id: string;
  label: string;
  icon?: string;
  onSelect: () => void;
  disabled?: boolean;
}

export interface SplitButtonProps {
  primaryAction: () => void;
  primaryLabel: string;
  primaryIcon?: string;
  items: SplitButtonItem[];
  variant?: "primary" | "outline" | "ghost" | "destructive";
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function SplitButton({
  primaryAction,
  primaryLabel,
  primaryIcon,
  items,
  variant = "outline",
  size = "sm",
  className,
}: SplitButtonProps) {
  return (
    <div className={`inline-flex items-center -space-x-px ${className || ""}`}>
      <Button
        variant={variant}
        size={size}
        className="rounded-r-none focus:z-10 gap-1.5 shadow-sm"
        onClick={primaryAction}
      >
        {primaryIcon && <Icon name={primaryIcon as any} size={13} />}
        {primaryLabel}
      </Button>

      <DropdownMenu items={items}>
        <Button
          variant={variant}
          size={size}
          className="rounded-l-none focus:z-10 px-1.5 shadow-sm"
          aria-label="More options"
        >
          <Icon name="ChevronDown" size={13} className="opacity-70" />
        </Button>
      </DropdownMenu>
    </div>
  );
}
