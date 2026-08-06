"use client";

import React, { useState } from "react";
import * as DropdownPrimitive from "@prime/ui";
import { Button, Icon } from "@prime/ui";

interface CountryOption {
  value: string;
  label: string;
  flag?: string;
  reserveLeadingSpace?: boolean;
}

const COUNTRIES: CountryOption[] = [
  { value: "us", label: "United States", flag: "🇺🇸" },
  { value: "ca", label: "Canada", flag: "🇨🇦" },
  { value: "gb", label: "United Kingdom", flag: "🇬🇧" },
  { value: "fr", label: "France", flag: "🇫🇷" },
  { value: "unknown", label: "Unknown Territory", reserveLeadingSpace: true },
];

export const DropdownSearchable = () => {
  const [selected, setSelected] = useState<CountryOption>(COUNTRIES[0]);

  return (
    <div className="w-full max-w-sm">
      <DropdownPrimitive.DropdownRoot>
        <DropdownPrimitive.DropdownTrigger asChild>
          <Button variant="outline" className="w-full justify-between font-normal text-sm">
            <span className="flex items-center gap-2 truncate">
              {selected.flag ? (
                <span aria-hidden="true" className="flex shrink-0 items-center justify-center">
                  {selected.flag}
                </span>
              ) : selected.reserveLeadingSpace ? (
                <span aria-hidden="true" className="w-4 h-4 shrink-0" />
              ) : null}
              {selected.label}
            </span>
            <Icon name="ChevronDown" size={16} className="text-muted-foreground ml-2 opacity-50 shrink-0" />
          </Button>
        </DropdownPrimitive.DropdownTrigger>
        <DropdownPrimitive.DropdownContent align="start" className="w-full min-w-[200px]">
          <DropdownPrimitive.DropdownSearch placeholder="Search country..." />
          <DropdownPrimitive.DropdownLabel>Available Countries</DropdownPrimitive.DropdownLabel>
          {COUNTRIES.map((country) => (
            <DropdownPrimitive.DropdownItem
              key={country.value}
              leadingVisual={country.flag}
              reserveLeadingSpace={country.reserveLeadingSpace}
              textValue={country.label}
              onClick={() => setSelected(country)}
            >
              {country.label}
            </DropdownPrimitive.DropdownItem>
          ))}
        </DropdownPrimitive.DropdownContent>
      </DropdownPrimitive.DropdownRoot>
    </div>
  );
};
