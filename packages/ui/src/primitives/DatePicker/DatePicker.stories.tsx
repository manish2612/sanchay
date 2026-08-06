import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { DatePicker } from './index';
import { addDays } from "date-fns";

const meta: Meta<typeof DatePicker> = {
  title: 'Primitives/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  argTypes: {
    labelVariant: {
      control: 'select',
      options: ['default', 'in-field', 'inline', 'hidden'],
      description: 'The visual style of the label.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the picker is disabled.',
    },
    calendarType: {
      control: 'select',
      options: ['gregorian', 'nepali'],
      description: 'The calendar system to use.',
    },
    nepaliLanguage: {
      control: 'select',
      options: ['english', 'nepali'],
      description: 'The language script when using the Nepali calendar.',
    },
    label: {
      control: 'text',
      description: 'The label text.',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field.',
    }
  },
  args: {
    label: 'Date Picker',
    placeholder: 'Select Date',
    disabled: false,
    labelVariant: 'default',
    calendarType: 'gregorian',
    nepaliLanguage: 'english',
  }
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(args.date);
    return (
      <div className="max-w-sm">
        <DatePicker
          {...args}
          date={date}
          onDateChange={(d) => {
            setDate(d);
            args.onDateChange?.(d);
          }}
        />
      </div>
    );
  }
};

export const InFieldLabel: Story = {
  args: {
    label: 'In-Field Label',
    labelVariant: 'in-field',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(args.date);
    return (
      <div className="max-w-sm">
        <DatePicker
          {...args}
          date={date}
          onDateChange={setDate}
        />
      </div>
    );
  }
};

export const PreSelectedDate: Story = {
  args: {
    label: 'With Initial Date',
    labelVariant: 'in-field',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(addDays(new Date(), 5));
    return (
      <div className="max-w-sm">
        <DatePicker
          {...args}
          date={date}
          onDateChange={setDate}
        />
      </div>
    );
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled inline label',
    labelVariant: 'inline',
    disabled: true,
    placeholder: 'Disabled Picker',
  },
  render: (args) => (
    <div className="max-w-sm">
      <DatePicker {...args} />
    </div>
  )
};

export const MinMaxDatesGregorian: Story = {
  args: {
    label: 'Min/Max Dates (Gregorian)',
    labelVariant: 'in-field',
    minDate: new Date(2023, 0, 1),
    maxDate: new Date(2023, 11, 31),
    placeholder: 'Only 2023 allowed',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(args.date);
    return (
      <div className="max-w-sm">
        <DatePicker
          {...args}
          date={date}
          onDateChange={setDate}
        />
      </div>
    );
  }
};

export const NepaliCalendarEnglishScript: Story = {
  args: {
    label: 'Nepali Calendar (English Script)',
    labelVariant: 'in-field',
    calendarType: 'nepali',
    placeholder: 'Select BS Date',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(args.date);
    return (
      <div className="max-w-sm">
        <DatePicker
          {...args}
          date={date}
          onDateChange={setDate}
        />
      </div>
    );
  }
};

export const MinMaxDatesNepali: Story = {
  args: {
    label: 'Min/Max Dates (Nepali)',
    labelVariant: 'in-field',
    calendarType: 'nepali',
    minDate: new Date("2024-04-13"),
    maxDate: new Date("2025-04-13"),
    placeholder: 'Only BS 2081 allowed',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(args.date);
    return (
      <div className="max-w-sm">
        <DatePicker
          {...args}
          date={date}
          onDateChange={setDate}
        />
      </div>
    );
  }
};

export const NepaliCalendarNepaliScript: Story = {
  args: {
    label: 'Nepali Calendar (Nepali Script)',
    labelVariant: 'in-field',
    calendarType: 'nepali',
    nepaliLanguage: 'nepali',
    placeholder: 'Nepali BS Date',
  },
  render: (args) => {
    const [date, setDate] = useState<Date | undefined>(args.date);
    return (
      <div className="max-w-sm">
        <DatePicker
          {...args}
          date={date}
          onDateChange={setDate}
        />
      </div>
    );
  }
};
