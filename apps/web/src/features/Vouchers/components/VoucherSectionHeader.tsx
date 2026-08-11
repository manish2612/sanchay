import React from "react";
import { Icon } from "@prime/ui";
import { cn } from "@prime/ui";

interface VoucherSectionHeaderProps {
  title: string;
  count?: string | number;
  hint?: string;
  className?: string;
  children?: React.ReactNode;
}

export function VoucherSectionHeader({
  title,
  count,
  hint,
  className,
  children,
}: VoucherSectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-4 py-1.5 bg-surface-variant border-b border-border flex-shrink-0 select-none",
        className
      )}
    >
      {/* Dot accent */}
      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />

      {/* Section title */}
      <span className="text-xs font-semibold tracking-wide uppercase text-foreground/80 font-heading">
        {title}
      </span>

      {/* Row count pill */}
      {count !== undefined && (
        <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-medium bg-muted text-muted-foreground border border-border leading-none">
          {count}
        </span>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Keyboard navigation hint */}
      {hint && (
        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
          <Icon name="Layers" size={11} className="opacity-60" />
          {hint}
        </span>
      )}

      {/* Optional slot for action buttons */}
      {children}
    </div>
  );
}
