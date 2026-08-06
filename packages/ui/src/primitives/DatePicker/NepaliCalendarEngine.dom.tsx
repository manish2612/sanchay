import React, { useState, useEffect, useRef } from "react";
import NepaliDate from "nepali-datetime";
import { Icon } from "../Icon/Icon.dom";
import { DatePickerProps } from "./types";
import { DatePickerDropdown } from "./DatePickerDropdown.dom";

const BS_MONTHS = {
  english: ['Baisakh', 'Jestha', 'Ashadh', 'Shrawan', 'Bhadra', 'Ashwin', 'Kartik', 'Mangsir', 'Poush', 'Magh', 'Falgun', 'Chaitra'],
  nepali: ['वैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कात्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'],
};

const BS_DAYS = {
  english: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  nepali: ['आइत', 'सोम', 'मङ्गल', 'बुध', 'बिही', 'शुक्र', 'शनि'],
};

const nepaliDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
const toNepaliNumber = (num: number) => num.toString().replace(/\d/g, (d) => nepaliDigits[parseInt(d)]);

// Helper to get number of days in a BS month by catching out-of-range errors
const getDaysInBSMonth = (year: number, month: number) => {
  for (let d = 32; d >= 29; d--) {
    try {
      new NepaliDate(year, month, d);
      return d;
    } catch (e) {
      // invalid date, try lower
    }
  }
  return 29; // Fallback, no BS month has less than 29 days
};

export function NepaliCalendarEngine({
  date,
  onDateChange,
  minDate,
  maxDate,
  nepaliLanguage = 'english',
  setIsOpen,
}: DatePickerProps & { setIsOpen: (open: boolean) => void }) {
  const minNd = minDate ? new NepaliDate(minDate) : null;
  const maxNd = maxDate ? new NepaliDate(maxDate) : null;

  const clampNepali = (nd: NepaliDate) => {
    if (minNd && (nd.getYear() * 100 + nd.getMonth()) < (minNd.getYear() * 100 + minNd.getMonth())) {
      return new NepaliDate(minNd.getYear(), minNd.getMonth(), 1);
    }
    if (maxNd && (nd.getYear() * 100 + nd.getMonth()) > (maxNd.getYear() * 100 + maxNd.getMonth())) {
      return new NepaliDate(maxNd.getYear(), maxNd.getMonth(), 1);
    }
    return nd;
  };

  const initialNd = clampNepali(date ? new NepaliDate(date) : new NepaliDate());
  
  const [currentYear, setCurrentYear] = useState(initialNd.getYear());
  const [currentMonth, setCurrentMonth] = useState(initialNd.getMonth());
  const [focusedDate, setFocusedDate] = useState<number | null>(null);

  const dayRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reset view when external date changes
  useEffect(() => {
    if (date) {
      const nd = clampNepali(new NepaliDate(date));
      setCurrentYear(nd.getYear());
      setCurrentMonth(nd.getMonth());
      setFocusedDate(nd.getDate());
    }
  }, [date, minDate, maxDate]);

  const updateCalendar = (y: number, m: number) => {
    let clamped = clampNepali(new NepaliDate(y, m, 1));
    setCurrentYear(clamped.getYear());
    setCurrentMonth(clamped.getMonth());
  };

  const handleNextMonth = () => {
    let y = currentYear;
    let m = currentMonth + 1;
    if (m > 11) { m = 0; y += 1; }
    updateCalendar(y, m);
  };

  const handlePrevMonth = () => {
    let y = currentYear;
    let m = currentMonth - 1;
    if (m < 0) { m = 11; y -= 1; }
    updateCalendar(y, m);
  };

  const isPrevDisabled = Boolean(minNd && (currentYear < minNd.getYear() || (currentYear === minNd.getYear() && currentMonth <= minNd.getMonth())));
  const isNextDisabled = Boolean(maxNd && (currentYear > maxNd.getYear() || (currentYear === maxNd.getYear() && currentMonth >= maxNd.getMonth())));

  const daysInMonth = getDaysInBSMonth(currentYear, currentMonth);

  const handleGridKeyDown = (e: React.KeyboardEvent, d: number) => {
    let newDate = d;
    let newMonth = currentMonth;
    let newYear = currentYear;

    if (e.key === 'ArrowRight') { newDate += 1; }
    else if (e.key === 'ArrowLeft') { newDate -= 1; }
    else if (e.key === 'ArrowDown') { newDate += 7; }
    else if (e.key === 'ArrowUp') { newDate -= 7; }
    else return;

    e.preventDefault();

    if (newDate > daysInMonth) {
      newMonth += 1;
      newDate -= daysInMonth;
      if (newMonth > 11) { newMonth = 0; newYear += 1; }
    } else if (newDate < 1) {
      newMonth -= 1;
      if (newMonth < 0) { newMonth = 11; newYear -= 1; }
      newDate = getDaysInBSMonth(newYear, newMonth) + newDate;
    }

    try {
      const targetTime = new NepaliDate(newYear, newMonth, newDate).getDateObject().getTime();
      if (minNd && targetTime < minNd.getDateObject().getTime()) return;
      if (maxNd && targetTime > maxNd.getDateObject().getTime()) return;
    } catch (err) {
      // Invalid date block (e.g. out of BS 2000-2099 bounds)
      return; 
    }

    if (newMonth !== currentMonth || newYear !== currentYear) {
      updateCalendar(newYear, newMonth);
      setFocusedDate(newDate);
      setTimeout(() => dayRefs.current[newDate]?.focus(), 0);
    } else {
      setFocusedDate(newDate);
      dayRefs.current[newDate]?.focus();
    }
  };

  const handleSelectDate = (d: number) => {
    const nd = new NepaliDate(currentYear, currentMonth, d);
    onDateChange?.(nd.getDateObject()); // Fire native JS Date to consumer
    setIsOpen(false);
  };

  const startDayOfWeek = new NepaliDate(currentYear, currentMonth, 1).getDay();
  const todayNd = new NepaliDate();
  const isToday = (d: number) => todayNd.getYear() === currentYear && todayNd.getMonth() === currentMonth && todayNd.getDate() === d;
  
  const selectedNd = date ? new NepaliDate(date) : null;
  const isSelected = (d: number) => selectedNd && selectedNd.getYear() === currentYear && selectedNd.getMonth() === currentMonth && selectedNd.getDate() === d;

  const displayMonths = BS_MONTHS[nepaliLanguage];
  const displayDays = BS_DAYS[nepaliLanguage];
  
  // nepali-datetime supports strictly BS 2000 to 2099. We must not exceed these bounds.
  const MIN_BS_YEAR = 2000;
  const MAX_BS_YEAR = 2099;
  const years = Array.from({ length: MAX_BS_YEAR - MIN_BS_YEAR + 1 }, (_, i) => MIN_BS_YEAR + i);

  // Roving tabindex target resolution
  const getTabTargetDate = () => {
    if (focusedDate !== null) return focusedDate;
    if (selectedNd && selectedNd.getYear() === currentYear && selectedNd.getMonth() === currentMonth) return selectedNd.getDate();
    if (todayNd.getYear() === currentYear && todayNd.getMonth() === currentMonth) return todayNd.getDate();
    return 1;
  };
  const tabTargetDate = getTabTargetDate();

  const monthOptions = displayMonths.map((m, idx) => {
    let disabled = false;
    if (minNd) {
      if (currentYear < minNd.getYear()) disabled = true;
      if (currentYear === minNd.getYear() && idx < minNd.getMonth()) disabled = true;
    }
    if (maxNd) {
      if (currentYear > maxNd.getYear()) disabled = true;
      if (currentYear === maxNd.getYear() && idx > maxNd.getMonth()) disabled = true;
    }
    return { label: m, value: idx, disabled };
  });

  const yearOptions = years.map(y => ({
    label: nepaliLanguage === 'nepali' ? toNepaliNumber(y) : String(y),
    value: y,
    disabled: (minNd && y < minNd.getYear()) || (maxNd && y > maxNd.getYear())
  })).filter(o => !o.disabled);

  return (
    <div className="p-3">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-4">
        
        {/* Month / Year Selectors */}
        <div className="flex gap-1 items-center">
          <DatePickerDropdown
            value={currentMonth}
            onChange={(val) => updateCalendar(currentYear, val)}
            options={monthOptions}
          />
          <DatePickerDropdown
            value={currentYear}
            onChange={(val) => updateCalendar(val, currentMonth)}
            options={yearOptions}
          />
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex gap-1">
          <button type="button" disabled={isPrevDisabled} onClick={handlePrevMonth} className="h-7 w-7 bg-transparent p-0 flex items-center justify-center rounded-md hover:bg-surface-variant transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-30 disabled:pointer-events-none">
            <Icon name="ChevronLeft" size={18} />
          </button>
          <button type="button" disabled={isNextDisabled} onClick={handleNextMonth} className="h-7 w-7 bg-transparent p-0 flex items-center justify-center rounded-md hover:bg-surface-variant transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring disabled:opacity-30 disabled:pointer-events-none">
            <Icon name="ChevronRight" size={18} />
          </button>
        </div>
      </div>

      {/* Grid */}
      <table className="w-full border-collapse">
        <thead>
          <tr className="flex">
            {displayDays.map((d) => (
              <th key={d} className="text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]">
                {d}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: Math.ceil((daysInMonth + startDayOfWeek) / 7) }).map((_, row) => (
            <tr key={row} className="flex w-full mt-2">
              {Array.from({ length: 7 }).map((_, col) => {
                const dayIndex = row * 7 + col;
                const d = dayIndex - startDayOfWeek + 1;
                
                const isOutOfBounds = 
                  (minNd && (currentYear < minNd.getYear() || (currentYear === minNd.getYear() && currentMonth < minNd.getMonth()) || (currentYear === minNd.getYear() && currentMonth === minNd.getMonth() && d < minNd.getDate()))) ||
                  (maxNd && (currentYear > maxNd.getYear() || (currentYear === maxNd.getYear() && currentMonth > maxNd.getMonth()) || (currentYear === maxNd.getYear() && currentMonth === maxNd.getMonth() && d > maxNd.getDate())));

                const isInvalid = d < 1 || d > daysInMonth;

                if (isInvalid) {
                  return <td key={col} className="p-0 text-center w-9 h-9" />;
                }

                const isTodayDate = isToday(d);
                const isSelectedDate = isSelected(d);

                let btnClasses = "hover:bg-surface-variant text-foreground focus:ring-focus-ring";
                if (isSelectedDate) {
                  btnClasses = "bg-primary text-primary-foreground font-bold hover:opacity-90 focus:ring-foreground";
                } else if (isTodayDate) {
                  btnClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-focus-ring";
                }

                return (
                  <td key={col} className={`p-0 text-center`}>
                    <button
                      type="button"
                      disabled={Boolean(isOutOfBounds)}
                      ref={el => { dayRefs.current[d] = el; }}
                      tabIndex={d === tabTargetDate ? 0 : -1}
                      onKeyDown={(e) => handleGridKeyDown(e, d)}
                      onClick={() => handleSelectDate(d)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors mx-auto text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-popover disabled:opacity-30 disabled:pointer-events-none ${btnClasses}`}
                    >
                      {nepaliLanguage === 'nepali' ? toNepaliNumber(d) : d}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
