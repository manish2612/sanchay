import React from 'react';
import { Form, Switch } from '@prime/ui';
import { useFormContext, Control } from 'react-hook-form';

interface SwitchCardProps {
  name: string;
  label: string;
  description?: string;
  className?: string;
  control?: any;
}

export const SwitchCard = ({ name, label, description, className = 'p-4', control }: SwitchCardProps) => {
  const formContext = useFormContext();
  const formControl = control || formContext?.control;

  return (
    <Form.Field
      control={formControl}
      name={name}
      render={({ field }) => (
        <Form.Item 
          className={`flex flex-row items-center justify-between rounded-lg bg-background/33 shadow-sm cursor-pointer hover:bg-background/50 active:bg-background/80 transition-colors ${className}`}
          onClick={(e) => {
            if ((e.target as HTMLElement).closest('button, [role="switch"], input')) return;
            field.onChange(!field.value);
          }}
        >
          <div className="space-y-0.5 pointer-events-none">
            <Form.Label className="text-sm font-medium">{label}</Form.Label>
            {description && (
              <p className="text-xs text-muted-foreground">{description}</p>
            )}
          </div>
          <div onClick={(e) => e.stopPropagation()} className="flex items-center">
            <Form.Control>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </Form.Control>
          </div>
        </Form.Item>
      )}
    />
  );
};
