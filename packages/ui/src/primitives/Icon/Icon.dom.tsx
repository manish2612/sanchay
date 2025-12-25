import React from "react";
import { cn } from "../../utils";
import { IconProps } from "./types";

export function Icon({ name, size = 24, color, className, style }: IconProps) {
  return (
    <span
      className={cn("material-icons select-none", className)}
      style={{
        fontFamily: "var(--font-material-icons)",
        fontSize: size,
        color: color,
        // Ensure proper rendering details
        fontWeight: "normal",
        fontStyle: "normal",
        lineHeight: 1,
        letterSpacing: "normal",
        textTransform: "none",
        display: "inline-block",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        direction: "ltr",
        ...(style as React.CSSProperties),
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
