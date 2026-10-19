import React from 'react';
import { Switch, cn } from '@prime/ui';

interface ToggleRowProps {
  id?: string;
  label: string;
  description?: string;
  scope?: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (checked: boolean) => void;
}

export function ToggleRow({
  id,
  label,
  description,
  checked,
  disabled = false,
  onChange,
}: ToggleRowProps) {
  const switchId = id || React.useId();

  return (
    <div
      onClick={() => !disabled && onChange(!checked)}
      className={cn(
        'group flex items-start justify-between gap-3 p-3 rounded-lg border border-border/50 bg-surface/50 transition-all cursor-pointer select-none',
        'hover:bg-surface-variant/80 hover:border-border has-[:focus-visible]:bg-surface-variant has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-primary/40',
        checked && 'bg-primary/[0.04] border-primary/30',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
    >
      <div className="flex flex-col flex-1 min-w-0 pr-1">
        <label
          htmlFor={switchId}
          className="text-sm font-medium text-foreground cursor-pointer group-hover:text-primary transition-colors leading-snug"
        >
          {label}
        </label>
        {description && (
          <span className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {description}
          </span>
        )}
      </div>

      <div className="flex-shrink-0 pt-0.5" onClick={(e) => e.stopPropagation()}>
        <Switch
          id={switchId}
          checked={checked}
          onCheckedChange={onChange}
          disabled={disabled}
          aria-label={label}
        />
      </div>
    </div>
  );
}
