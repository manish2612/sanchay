import React from 'react';

interface MinimalSectionHeaderProps {
  title: string;
}

export function MinimalSectionHeader({ title }: MinimalSectionHeaderProps) {
  return (
    <div className="flex items-center gap-3 pt-3 pb-1">
      <span className="text-[11px] font-semibold tracking-wider uppercase text-muted-foreground whitespace-nowrap">
        {title}
      </span>
      <div className="flex-1 h-px bg-border/50" />
    </div>
  );
}
