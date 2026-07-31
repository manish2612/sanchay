import React, { useState, useEffect, useRef } from 'react';
import { DropdownRoot, DropdownTrigger, DropdownContent, DropdownItem } from '../Dropdown/dom';
import { Icon } from '../Icon/Icon.dom';

export interface DatePickerDropdownOption {
  label: string;
  value: number;
  disabled?: boolean;
}

export interface DatePickerDropdownProps {
  value: number;
  onChange: (value: number) => void;
  options: DatePickerDropdownOption[];
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export function DatePickerDropdown({ value, onChange, options, className, align = 'center' }: DatePickerDropdownProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const selectedOption = options.find((o) => o.value === value);

  return (
    <DropdownRoot open={open} onOpenChange={setOpen}>
      <DropdownTrigger asChild>
        <button
          type="button"
          className={`flex items-center gap-1 hover:bg-surface-variant transition-colors rounded-md px-2 py-1 font-bold text-sm outline-none focus-visible:ring-2 focus-visible:ring-focus-ring ${className || ''}`}
        >
          {selectedOption ? selectedOption.label : value}
          <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
        </button>
      </DropdownTrigger>
      
      <DropdownContent 
        ref={contentRef}
        align={align} 
        sideOffset={4}
        onOpenAutoFocus={(e) => {
          // Prevent Radix from auto-focusing the first item in the list
          e.preventDefault();
          // Focus the currently selected item instead, which automatically scrolls it into view
          // and ensures Arrow key navigation starts from that item!
          setTimeout(() => {
            if (contentRef.current) {
              const selectedEl = contentRef.current.querySelector('[data-selected="true"]') as HTMLElement;
              if (selectedEl) {
                selectedEl.focus();
              } else {
                // Fallback to focusing the content container if nothing is selected
                contentRef.current.focus();
              }
            }
          }, 0);
        }}
        className="max-h-[250px] overflow-y-auto"
      >
        {options.map((opt) => (
          <DropdownItem
            key={opt.value}
            disabled={opt.disabled}
            data-selected={opt.value === value}
            onSelect={() => onChange(opt.value)}
            className={`cursor-pointer ${opt.value === value ? 'bg-primary text-primary-foreground focus:bg-primary/90 focus:text-primary-foreground' : ''}`}
          >
            {opt.label}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownRoot>
  );
}
