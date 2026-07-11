"use client";

import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import { cn } from "../../utils";
import { Icon } from "../Icon/Icon.dom";
import { DatePickerProps } from "./types";

import "react-day-picker/dist/style.css";
import "./DatePicker.css";

export function DatePicker({
  date,
  onDateChange,
  placeholder = "Select Date",
  className,
  disabled,
  dayPickerProps,
}: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover.Root open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <button
          disabled={disabled}
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background",
            "focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-variant",
            !date && "text-muted-foreground",
            className,
          )}
        >
          <span>{date ? format(date, "PPP") : placeholder}</span>
          <Icon name="event" size={20} className="text-muted-foreground" />
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align="start"
          className={cn(
            "z-50 rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg outline-none",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          )}
        >
          <div 
            onKeyDown={(e) => {
              // Allow Enter key to open native select dropdowns (Month/Year)
              if (e.key === "Enter") {
                const target = e.target as HTMLElement;
                if (target.tagName === "SELECT") {
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
            style={{
            "--rdp-accent-color": "var(--colors-primary, #3b82f6)",
            "--rdp-background-color": "var(--colors-surface-variant, #f1f5f9)",
            "--rdp-accent-color-dark": "var(--colors-primary, #3b82f6)",
            "--rdp-background-color-dark": "var(--colors-surface-variant, #1e293b)",
            "--rdp-outline": "2px solid var(--colors-focus-ring, #3b82f6)",
            "--rdp-outline-selected": "none",
            "--rdp-selected-font": "bold",
            "--rdp-today-color": "var(--colors-foreground, #000)",
          } as React.CSSProperties}>
            <DayPicker
              mode="single"
              selected={date}
              defaultMonth={date}
              onSelect={(d) => {
                onDateChange?.(d);
                setIsOpen(false);
              }}
              captionLayout="dropdown"
              startMonth={new Date(1950, 0)}
              endMonth={new Date(2100, 11)}
              className="p-3 sanchay-date-picker"
              classNames={{
                ...dayPickerProps?.classNames,
              }}
              components={{
                Chevron: (props) => {
                  if (props.orientation === 'left') {
                    return <Icon name="chevron_left" size={18} />;
                  }
                  if (props.orientation === 'right') {
                    return <Icon name="chevron_right" size={18} />;
                  }
                  if (props.orientation === 'down') {
                    return <Icon name="expand_more" size={18} />;
                  }
                  if (props.orientation === 'up') {
                    return <Icon name="expand_less" size={18} />;
                  }
                  return <Icon name="chevron_right" size={18} />;
                },
                ...dayPickerProps?.components,
              }}
              {...dayPickerProps}
            />
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
