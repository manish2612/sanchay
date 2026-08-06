import type { DayPickerProps } from 'react-day-picker';

export interface DatePickerProps {
  /** The currently selected date */
  date?: Date;
  /** Callback fired when a date is selected */
  onDateChange?: (date?: Date) => void;
  /** Placeholder text when no date is selected */
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  /** The minimum selectable date (global boundary) */
  minDate?: Date;
  /** The maximum selectable date (global boundary) */
  maxDate?: Date;
  /** The underlying calendar system to use. Defaults to gregorian */
  calendarType?: 'gregorian' | 'nepali';
  /** If using calendarType='nepali', controls whether to display the text in English or Nepali script. Defaults to english. */
  nepaliLanguage?: 'english' | 'nepali';
  dayPickerProps?: Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect' | 'fromDate' | 'toDate' | 'startMonth' | 'endMonth'>;
  label?: string;
  labelVariant?: "default" | "in-field" | "inline" | "hidden";
}
