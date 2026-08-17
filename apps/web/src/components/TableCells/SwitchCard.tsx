import React from 'react';
import { Form, Switch } from '@prime/ui';
import { useFormContext, Control } from 'react-hook-form';

interface SwitchCardProps {
  name: string;
  label: string;
  className?: string;
  control?: Control<any>;
}

export const SwitchCard = ({ name, label, className = 'p-4', control }: SwitchCardProps) => {
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
            if ((e.target as HTMLElement).closest('button')) return;
            field.onChange(!field.value);
          }}
        >
          <div className="space-y-0.5 pointer-events-none">
            <Form.Label className="text-sm font-medium">{label}</Form.Label>
          </div>
          <Form.Control>
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          </Form.Control>
        </Form.Item>
      )}
    />
  );
};
