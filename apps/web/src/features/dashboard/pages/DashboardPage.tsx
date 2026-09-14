import React, { useState } from 'react';
import { DatePicker } from '@prime/ui';

export function DashboardPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex items-center justify-center min-h-dvh bg-bg">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-foreground mb-4">Dashboard</h1>
        <p className="text-muted-foreground mb-8">
          Welcome to the Dashboard. Your application is now clear of demo code!
        </p>

        <div className="max-w-xs mx-auto text-left flex flex-col gap-6">
          <DatePicker
            date={date}
            onDateChange={setDate}
            calendarType="nepali"
            label="Nepali Date Picker"
            placeholder="Select Nepali Date"
          />

          <DatePicker
            date={date}
            onDateChange={setDate}
            calendarType="gregorian"
            label="Gregorian Date Picker"
            placeholder="Select Gregorian Date"
          />
        </div>
      </div>
    </div>
  );
}
