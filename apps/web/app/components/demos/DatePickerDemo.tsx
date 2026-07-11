"use client";
import React, { useState } from "react";
import { DatePicker } from "@sanchay/ui";
import { addDays } from "date-fns";

export function DatePickerDemo() {
  const [date1, setDate1] = useState<Date | undefined>(undefined);
  const [date2, setDate2] = useState<Date | undefined>(addDays(new Date(), 5));

  return (
    <div className="p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        DatePicker Examples:
      </strong>

      <div className="space-y-6 max-w-sm">
        {/* Default */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Default
          </span>
          <DatePicker 
            date={date1} 
            onDateChange={setDate1} 
            placeholder="Select Date" 
          />
        </div>

        {/* Pre-selected Date */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            With Initial Date
          </span>
          <DatePicker 
            date={date2} 
            onDateChange={setDate2} 
            placeholder="Select Date" 
          />
        </div>

        {/* Disabled */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Disabled
          </span>
          <DatePicker 
            disabled 
            placeholder="Disabled Picker" 
          />
        </div>

        {/* Nepali Calendar */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Nepali Calendar (English Script)
          </span>
          <DatePicker 
            calendarType="nepali"
            date={date1} 
            onDateChange={setDate1} 
            placeholder="Select BS Date" 
          />
        </div>

        {/* Nepali Calendar (Nepali Script) */}
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold opacity-70">
            Nepali Calendar (Nepali Script)
          </span>
          <DatePicker 
            calendarType="nepali"
            nepaliLanguage="nepali"
            date={date1} 
            onDateChange={setDate1} 
            placeholder="Nepali BS Date" 
          />
        </div>
      </div>
    </div>
  );
}
