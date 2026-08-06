import * as React from "react";

export interface AutoSuggestOption {
  label: string;
  value: string;
  disabled?: boolean;
  icon?: string;
  leadingVisual?: React.ReactNode;
  reserveLeadingSpace?: boolean;
}

export type AutoSuggestOptions = (AutoSuggestOption | { group: string; items: AutoSuggestOption[] })[];

export interface AutoSuggestRootProps<T extends boolean = false> {
  // Value Management
  value?: T extends true ? string[] : string;
  onChange?: (value: T extends true ? string[] : string) => void;
  
  // Input Management
  inputValue?: string;
  onInputChange?: (value: string) => void;
  
  // Data Logic
  options?: AutoSuggestOptions;
  
  // Features
  multiple?: T;
  virtualized?: boolean;
  creatable?: boolean;
  onCreate?: (value: string) => void;
  
  children?: React.ReactNode;
  className?: string;
}

export interface AutoSuggestInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  clearable?: boolean;
  error?: boolean;
  success?: boolean;
  label?: string;
  labelVariant?: 'default' | 'in-field' | 'inline' | 'hidden';
  labelClassName?: string;
  isLoading?: boolean;
  className?: string;
  inputClassName?: string;
}

export interface AutoSuggestContentProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AutoSuggestListProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AutoSuggestVirtualizedListProps {
  renderItem: (option: AutoSuggestOption) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

export interface AutoSuggestItemProps {
  value: string;
  disabled?: boolean;
  onSelect?: (value: string) => void;
  children?: React.ReactNode;
  className?: string;
  leadingVisual?: React.ReactNode;
  reserveLeadingSpace?: boolean;
}

export interface AutoSuggestGroupProps {
  heading: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export interface AutoSuggestEmptyProps {
  children?: React.ReactNode;
  className?: string;
}

export interface AutoSuggestCreateItemProps {
  createLabel?: string;
  className?: string;
}
