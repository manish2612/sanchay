'use client';

import React, { useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { cn } from '../../utils';
import { Icon } from '../Icon/Icon.dom';
import { DatePickerProps } from './types';

import 'react-day-picker/dist/style.css';
import './DatePicker.css';

import { GregorianCalendarEngine } from './GregorianCalendarEngine.dom';
import { NepaliCalendarEngine } from './NepaliCalendarEngine.dom';
import NepaliDate from 'nepali-datetime';

export function DatePicker({
  date,
  onDateChange,
  placeholder = 'Select Date',
  className,
  disabled,
  calendarType = 'gregorian',
  nepaliLanguage = 'english',
  dayPickerProps,
  minDate,
  maxDate,
  label,
  labelVariant = 'default',
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Format the display text in the trigger
  let displayDate = placeholder;
  if (date) {
    if (calendarType === 'nepali') {
      const nd = new NepaliDate(date);
      // Format to English representation of Nepali Date e.g., 2080-01-01
      displayDate = nd.format('YYYY-MM-DD');
    } else {
      displayDate = format(date, 'PPP');
    }
  }

  const triggerElement = (
    <Popover.Trigger asChild>
      <button
        disabled={disabled}
        className={cn(
          'flex w-full items-center justify-between font-normal text-sm focus:outline-none',
          labelVariant === 'in-field'
            ? 'h-auto border-none px-0 py-0 shadow-none ring-0 hover:bg-transparent hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0 disabled:bg-transparent'
            : 'h-10 rounded-md border border-input bg-transparent px-3 py-2 shadow-sm ring-offset-background focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-surface-variant disabled:opacity-50',
          !date && 'text-muted-foreground',
          className,
        )}
      >
        <span className="truncate">{displayDate}</span>
        <Icon name="Calendar" size={20} className="text-muted-foreground shrink-0 ml-2" />
      </button>
    </Popover.Trigger>
  );

  const renderTriggerWrapper = () => {
    if (labelVariant === 'in-field') {
      return (
        <div
          className={cn(
            'flex min-h-[48px] w-full items-center rounded-md border border-input bg-transparent px-3 py-1.5 shadow-sm ring-offset-background focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2',
            disabled && 'cursor-not-allowed opacity-50 bg-surface-variant',
          )}
        >
          <div className="flex min-w-0 flex-1 flex-col justify-center">
            {label && (
              <label className="mb-0.5 w-full cursor-text text-[10px] font-semibold uppercase leading-none tracking-wider text-muted-foreground">
                {label}
              </label>
            )}
            {triggerElement}
          </div>
        </div>
      );
    }

    if (labelVariant === 'inline') {
      return (
        <div className="flex w-full items-center gap-3">
          {label && (
            <label
              className={cn(
                'w-[120px] shrink-0 text-sm font-medium leading-none',
                disabled && 'cursor-not-allowed opacity-70',
              )}
            >
              {label}
            </label>
          )}
          <div className="flex-1">{triggerElement}</div>
        </div>
      );
    }

    if (labelVariant === 'hidden') {
      return (
        <div className="w-full">
          {label && <label className="sr-only">{label}</label>}
          {triggerElement}
        </div>
      );
    }

    // Default
    return (
      <div className="flex w-full flex-col gap-1.5">
        {label && (
          <label
            className={cn(
              'text-sm font-medium leading-none',
              disabled && 'cursor-not-allowed opacity-70',
            )}
          >
            {label}
          </label>
        )}
        {triggerElement}
      </div>
    );
  };

  return (
    <Popover.Root
      modal={true}
      open={isOpen}
      onOpenChange={(newOpen) => {
        // If Radix is trying to close the Popover, but a DropdownMenu is actively open,
        // it means we caught a global Escape key or outside click that the nested
        // DropdownMenu should handle alone. We abort closing the Popover!
        if (!newOpen && document.querySelector("[data-radix-menu-content][data-state='open']")) {
          return;
        }
        setIsOpen(newOpen);
      }}
    >
      {renderTriggerWrapper()}
      <Popover.Portal>
        <Popover.Content
          align="start"
          className={cn(
            'z-50 rounded-md border border-border bg-popover text-popover-foreground shadow-lg outline-none overflow-hidden',
            'data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          )}
        >
          <div
            onKeyDown={(e) => {
              // Allow Enter key to open native select dropdowns (Month/Year)
              if (e.key === 'Enter') {
                const target = e.target as HTMLElement;
                if (target.tagName === 'SELECT') {
                  e.preventDefault();
                  try {
                    if ('showPicker' in target) {
                      (target as HTMLSelectElement).showPicker();
                    }
                  } catch (err) {
                    // Ignore errors if showPicker is unsupported or restricted
                  }
                }
              }
            }}
            style={
              {
                '--rdp-accent-color': 'var(--colors-primary, #3b82f6)',
                '--rdp-background-color': 'var(--colors-surface-variant, #f1f5f9)',
                '--rdp-accent-color-dark': 'var(--colors-primary, #3b82f6)',
                '--rdp-background-color-dark': 'var(--colors-surface-variant, #1e293b)',
                '--rdp-outline': '2px solid var(--colors-focus-ring, #3b82f6)',
                '--rdp-outline-selected': 'none',
                '--rdp-selected-font': 'bold',
                '--rdp-today-color': 'var(--colors-foreground, #000)',
              } as React.CSSProperties
            }
          >
            {calendarType === 'nepali' ? (
              <NepaliCalendarEngine
                date={date}
                onDateChange={onDateChange}
                minDate={minDate}
                maxDate={maxDate}
                nepaliLanguage={nepaliLanguage}
                setIsOpen={setIsOpen}
              />
            ) : (
              <GregorianCalendarEngine
                date={date}
                onDateChange={onDateChange}
                minDate={minDate}
                maxDate={maxDate}
                dayPickerProps={dayPickerProps}
                setIsOpen={setIsOpen}
              />
            )}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
