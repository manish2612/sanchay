"use client";
import React, { useState } from "react";
import { DatePicker } from "@prime/ui";
import { addDays } from "date-fns";

export function DatePickerDemo() {
  const [defaultDate, setDefaultDate] = useState<Date | undefined>(undefined);
  const [initialDate, setInitialDate] = useState<Date | undefined>(
    addDays(new Date(), 5),
  );
  const [minMaxGregorianDate, setMinMaxGregorianDate] = useState<
    Date | undefined
  >(undefined);
  const [nepaliEnglishDate, setNepaliEnglishDate] = useState<Date | undefined>(
    undefined,
  );
  const [minMaxNepaliDate, setMinMaxNepaliDate] = useState<Date | undefined>(
    undefined,
  );
  const [nepaliScriptDate, setNepaliScriptDate] = useState<Date | undefined>(
    undefined,
  );

  return (
    <div className="p-5 bg-surface shadow-sm rounded-lg border border-[#222222]">
      <strong className="text-foreground block mb-4 text-sm font-bold font-heading border-b border-[#333333] pb-2">
        DatePicker Examples:
      </strong>

      <div className="space-y-6 max-w-sm">
        {/* In-Field Label */}
        <div>
          <DatePicker
            label="Default Label"
            date={defaultDate}
            onDateChange={setDefaultDate}
            placeholder="Select Date"
          />
        </div>

        <div className="pt-2">
          <DatePicker
            label="In-Field Label"
            labelVariant="in-field"
            date={defaultDate}
            onDateChange={setDefaultDate}
            placeholder="Select Date"
          />
        </div>

        {/* Pre-selected Date */}
        <div className="space-y-1">
          <DatePicker
            label="With Initial Date"
            labelVariant="in-field"
            date={initialDate}
            onDateChange={setInitialDate}
            placeholder="Select Date"
          />
        </div>

        {/* Disabled */}
        <div className="space-y-1">
          <DatePicker
            label="Disabled inline label"
            labelVariant="inline"
            disabled
            placeholder="Disabled Picker"
          />
        </div>

        {/* Min / Max Constraints (Gregorian) */}
        <div className="space-y-1">
          <DatePicker
            label="Min/Max Dates (Gregorian)"
            labelVariant="in-field"
            date={minMaxGregorianDate}
            onDateChange={setMinMaxGregorianDate}
            minDate={new Date(2023, 0, 1)}
            maxDate={new Date(2023, 11, 31)}
            placeholder="Only 2023 allowed"
          />
        </div>

        {/* Nepali Calendar */}
        <div className="space-y-1">
          <DatePicker
            label="Nepali Calendar (English Script)"
            labelVariant="in-field"
            calendarType="nepali"
            date={nepaliEnglishDate}
            onDateChange={setNepaliEnglishDate}
            placeholder="Select BS Date"
          />
        </div>

        {/* Min / Max Constraints (Nepali) */}
        <div className="space-y-1">
          <DatePicker
            label="Min/Max Dates (Nepali)"
            labelVariant="in-field"
            calendarType="nepali"
            date={minMaxNepaliDate}
            onDateChange={setMinMaxNepaliDate}
            minDate={new Date("2024-04-13")} // roughly start of BS 2081
            maxDate={new Date("2025-04-13")} // roughly end of BS 2081
            placeholder="Only BS 2081 allowed"
          />
        </div>

        {/* Nepali Calendar (Nepali Script) */}
        <div className="space-y-1">
          <DatePicker
            label="Nepali Calendar (Nepali Script)"
            labelVariant="in-field"
            calendarType="nepali"
            nepaliLanguage="nepali"
            date={nepaliScriptDate}
            onDateChange={setNepaliScriptDate}
            placeholder="Nepali BS Date"
          />
        </div>
      </div>
    </div>
  );
}
