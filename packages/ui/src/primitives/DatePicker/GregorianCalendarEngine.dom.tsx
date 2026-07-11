import React from "react";
import { DayPicker } from "react-day-picker";
import { Icon } from "../Icon/Icon.dom";
import { DatePickerProps } from "./types";

export function GregorianCalendarEngine({
  date,
  onDateChange,
  dayPickerProps,
  setIsOpen,
}: DatePickerProps & { setIsOpen: (open: boolean) => void }) {
  return (
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
          if (props.orientation === 'left') return <Icon name="chevron_left" size={18} />;
          if (props.orientation === 'right') return <Icon name="chevron_right" size={18} />;
          if (props.orientation === 'down') return <Icon name="expand_more" size={18} />;
          if (props.orientation === 'up') return <Icon name="expand_less" size={18} />;
          return <Icon name="chevron_right" size={18} />;
        },
        ...dayPickerProps?.components,
      }}
      {...dayPickerProps}
    />
  );
}
