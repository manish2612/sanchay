import type { DayPickerProps } from 'react-day-picker';

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date?: Date) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  dayPickerProps?: Omit<DayPickerProps, "mode" | "selected" | "onSelect">;
}
