import React, { useState, useEffect, useRef } from "react";
import NepaliDate from "nepali-datetime";
import { Icon } from "../Icon/Icon.dom";
import { DatePickerProps } from "./types";
import { cn } from "../../utils";

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
  nepaliLanguage = 'english',
  setIsOpen,
}: DatePickerProps & { setIsOpen: (open: boolean) => void }) {
  // If date is provided, initialize to that BS date, otherwise current BS date
  const initialDate = date ? new NepaliDate(date) : new NepaliDate();
  
  const [currentYear, setCurrentYear] = useState(initialDate.getYear());
  const [currentMonth, setCurrentMonth] = useState(initialDate.getMonth());
  const [focusedDate, setFocusedDate] = useState<number | null>(null);

  const dayRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Reset view when external date changes
  useEffect(() => {
    if (date) {
      const nd = new NepaliDate(date);
      setCurrentYear(nd.getYear());
      setCurrentMonth(nd.getMonth());
      setFocusedDate(nd.getDate());
    }
  }, [date]);

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

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

    if (newMonth !== currentMonth || newYear !== currentYear) {
      setCurrentMonth(newMonth);
      setCurrentYear(newYear);
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
  
  // Year range (typical safe range for libraries)
  const years = Array.from({ length: 100 }, (_, i) => 2000 + i);

  // Roving tabindex target resolution
  const getTabTargetDate = () => {
    if (focusedDate !== null) return focusedDate;
    if (selectedNd && selectedNd.getYear() === currentYear && selectedNd.getMonth() === currentMonth) return selectedNd.getDate();
    if (todayNd.getYear() === currentYear && todayNd.getMonth() === currentMonth) return todayNd.getDate();
    return 1;
  };
  const tabTargetDate = getTabTargetDate();

  return (
    <div className="p-3">
      {/* Navigation Header */}
      <div className="flex justify-between items-center mb-4">
        
        {/* Month / Year Selectors */}
        <div className="flex gap-2 items-center">
          <div className="relative inline-flex items-center">
            <select
              value={currentMonth}
              onChange={(e) => setCurrentMonth(parseInt(e.target.value))}
              className="appearance-none bg-transparent font-bold text-sm pr-4 cursor-pointer z-10 focus:outline-none focus:ring-2 focus:ring-focus-ring rounded-sm"
            >
              {displayMonths.map((m, idx) => (
                <option key={m} value={idx}>{m}</option>
              ))}
            </select>
            <Icon name="expand_more" size={16} className="absolute right-0 pointer-events-none" />
          </div>

          <div className="relative inline-flex items-center">
            <select
              value={currentYear}
              onChange={(e) => setCurrentYear(parseInt(e.target.value))}
              className="appearance-none bg-transparent font-bold text-sm pr-4 cursor-pointer z-10 focus:outline-none focus:ring-2 focus:ring-focus-ring rounded-sm"
            >
              {years.map((y) => (
                <option key={y} value={y}>
                  {nepaliLanguage === 'nepali' ? toNepaliNumber(y) : y}
                </option>
              ))}
            </select>
            <Icon name="expand_more" size={16} className="absolute right-0 pointer-events-none" />
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <div className="flex gap-1">
          <button type="button" onClick={handlePrevMonth} className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md hover:bg-surface-variant transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring">
            <Icon name="chevron_left" size={18} />
          </button>
          <button type="button" onClick={handleNextMonth} className="h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 flex items-center justify-center rounded-md hover:bg-surface-variant transition-colors text-foreground focus:outline-none focus:ring-2 focus:ring-focus-ring">
            <Icon name="chevron_right" size={18} />
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
                const isOutOfRange = d < 1 || d > daysInMonth;

                if (isOutOfRange) {
                  return <td key={col} className="p-0 text-center w-9 h-9" />;
                }

                const isTodayDate = isToday(d);
                const isSelectedDate = isSelected(d);

                let btnClasses = "hover:bg-surface-variant text-foreground";
                if (isSelectedDate) {
                  btnClasses = "bg-primary text-primary-foreground font-bold hover:bg-primary hover:text-primary-foreground";
                } else if (isTodayDate) {
                  btnClasses = "bg-secondary text-secondary-foreground hover:bg-secondary";
                }

                return (
                  <td key={col} className={`p-0 text-center`}>
                    <button
                      type="button"
                      ref={el => dayRefs.current[d] = el}
                      tabIndex={d === tabTargetDate ? 0 : -1}
                      onKeyDown={(e) => handleGridKeyDown(e, d)}
                      onClick={() => handleSelectDate(d)}
                      className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors mx-auto text-sm focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 focus:ring-offset-popover ${btnClasses}`}
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
