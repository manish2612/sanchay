import React, { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import { addMonths, subMonths, setMonth, setYear, startOfMonth } from "date-fns";
import { Icon } from "../Icon/Icon.dom";
import { DatePickerProps } from "./types";
import { DatePickerDropdown } from "./DatePickerDropdown.dom";

const GREGORIAN_MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

export function GregorianCalendarEngine({
  date,
  onDateChange,
  minDate,
  maxDate,
  dayPickerProps,
  setIsOpen,
}: DatePickerProps & { setIsOpen: (open: boolean) => void }) {
  const clampDate = (d: Date) => {
    const start = startOfMonth(d);
    if (minDate && start < startOfMonth(minDate)) return startOfMonth(minDate);
    if (maxDate && start > startOfMonth(maxDate)) return startOfMonth(maxDate);
    return start;
  };

  const [currentDate, setCurrentDate] = useState<Date>(clampDate(date || new Date()));

  useEffect(() => {
    if (date) setCurrentDate(clampDate(date));
  }, [date, minDate, maxDate]);

  const handleNextMonth = () => setCurrentDate((prev) => clampDate(addMonths(prev, 1)));
  const handlePrevMonth = () => setCurrentDate((prev) => clampDate(subMonths(prev, 1)));

  const minYear = minDate ? minDate.getFullYear() : 1950;
  const maxYear = maxDate ? maxDate.getFullYear() : 2100;
  const years = Array.from({ length: maxYear - minYear + 1 }, (_, i) => minYear + i);

  const isPrevDisabled = Boolean(minDate && (currentDate.getFullYear() < minDate.getFullYear() || (currentDate.getFullYear() === minDate.getFullYear() && currentDate.getMonth() <= minDate.getMonth())));
  const isNextDisabled = Boolean(maxDate && (currentDate.getFullYear() > maxDate.getFullYear() || (currentDate.getFullYear() === maxDate.getFullYear() && currentDate.getMonth() >= maxDate.getMonth())));

  const monthOptions = GREGORIAN_MONTHS.map((m, idx) => {
    let disabled = false;
    if (minDate) {
      if (currentDate.getFullYear() < minDate.getFullYear()) disabled = true;
      if (currentDate.getFullYear() === minDate.getFullYear() && idx < minDate.getMonth()) disabled = true;
    }
    if (maxDate) {
      if (currentDate.getFullYear() > maxDate.getFullYear()) disabled = true;
      if (currentDate.getFullYear() === maxDate.getFullYear() && idx > maxDate.getMonth()) disabled = true;
    }
    return { label: m, value: idx, disabled };
  });

  const yearOptions = years.map(y => ({
    label: String(y),
    value: y,
    disabled: (minDate && y < minDate.getFullYear()) || (maxDate && y > maxDate.getFullYear())
  })).filter(o => !o.disabled);

  return (
    <div 
      className="p-3 prime-date-picker"
      onKeyDownCapture={(e) => {
        if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
        
        const activeEl = document.activeElement;
        if (!activeEl || !activeEl.classList.contains('rdp-day')) return;

        const dayText = activeEl.textContent;
        if (!dayText) return;
        
        let dayNum = parseInt(dayText, 10);
        if (isNaN(dayNum)) return;

        let targetMonth = currentDate.getMonth();
        let targetYear = currentDate.getFullYear();

        if (activeEl.classList.contains('rdp-day_outside')) {
          if (dayNum > 20) {
            targetMonth -= 1;
          } else {
            targetMonth += 1;
          }
        }

        const currentDayDate = new Date(targetYear, targetMonth, dayNum);
        const targetDate = new Date(currentDayDate);

        if (e.key === 'ArrowRight') targetDate.setDate(targetDate.getDate() + 1);
        else if (e.key === 'ArrowLeft') targetDate.setDate(targetDate.getDate() - 1);
        else if (e.key === 'ArrowDown') targetDate.setDate(targetDate.getDate() + 7);
        else if (e.key === 'ArrowUp') targetDate.setDate(targetDate.getDate() - 7);

        const checkMin = minDate ? new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()) : null;
        const checkMax = maxDate ? new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()) : null;
        const targetVal = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());

        if (checkMin && targetVal.getTime() < checkMin.getTime()) {
          e.preventDefault();
          e.stopPropagation();
        } else if (checkMax && targetVal.getTime() > checkMax.getTime()) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
    >
      {/* Custom Unified Header */}
      <div className="flex justify-between items-center mb-4">
        {/* Month / Year Selectors */}
        <div className="flex gap-1 items-center">
          <DatePickerDropdown
            value={currentDate.getMonth()}
            onChange={(val) => setCurrentDate((prev) => clampDate(setMonth(prev, val)))}
            options={monthOptions}
          />
          <DatePickerDropdown
            value={currentDate.getFullYear()}
            onChange={(val) => setCurrentDate((prev) => clampDate(setYear(prev, val)))}
            options={yearOptions}
          />
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex gap-1">
          <button type="button" disabled={isPrevDisabled} onClick={handlePrevMonth} className="h-7 w-7 bg-transparent p-0 flex items-center justify-center rounded-md hover:bg-surface-variant transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-30 disabled:pointer-events-none">
            <Icon name="chevron_left" size={18} />
          </button>
          <button type="button" disabled={isNextDisabled} onClick={handleNextMonth} className="h-7 w-7 bg-transparent p-0 flex items-center justify-center rounded-md hover:bg-surface-variant transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-30 disabled:pointer-events-none">
            <Icon name="chevron_right" size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <DayPicker
        mode="single"
        selected={date}
        month={currentDate}
        onMonthChange={(d) => setCurrentDate(clampDate(d))}
        onSelect={(d) => {
          onDateChange?.(d);
          setIsOpen(false);
        }}
        fromDate={minDate}
        toDate={maxDate}
        classNames={{
          ...dayPickerProps?.classNames,
          month_caption: "hidden", // Hide react-day-picker's internal header
          nav: "hidden",
        }}
        components={{
          // Ensure internal headers are completely stripped out
          MonthCaption: () => null,
          Nav: () => null,
          ...dayPickerProps?.components,
        }}
        {...dayPickerProps}
      />
    </div>
  );
}
