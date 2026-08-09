import { ReactNode } from 'react';
import { DialogProps as RadixDialogProps } from '@radix-ui/react-dialog';

export interface CommandPaletteProps {
  children?: ReactNode;
  filter?: (value: string, search: string) => number;
  label?: string;
  loop?: boolean;
  value?: string;
  onValueChange?: (value: string) => void;
  shouldFilter?: boolean;
  className?: string; // Web only
}

export interface CommandDialogProps extends RadixDialogProps {
  children?: ReactNode;
}

export interface CommandInputProps {
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  autoFocus?: boolean;
}

export interface CommandListProps {
  children?: ReactNode;
  loading?: boolean;
}

export interface CommandItemProps {
  children?: ReactNode;
  value?: string;
  onSelect?: (value: string) => void;
  disabled?: boolean;
  keywords?: string[];
}
