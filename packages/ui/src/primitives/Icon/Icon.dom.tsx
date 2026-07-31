import React from "react";
import * as icons from "lucide-react";
import { cn } from "../../utils";
import { IconProps, IconName } from "./types";

export function Icon({ name, size = 24, color, className, style }: IconProps) {
  const LucideIcon = icons[name as IconName] as React.ElementType;

  if (!LucideIcon) {
    return null;
  }

  return (
    <LucideIcon
      size={size}
      color={color}
      className={cn("select-none", className)}
      style={style as React.CSSProperties}
      aria-hidden="true"
    />
  );
}
