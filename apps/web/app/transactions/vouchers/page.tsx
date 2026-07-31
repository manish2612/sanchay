"use client";

import React, { useState } from "react";
import {
  TextInput,
  DatePicker,
  Icon,
  AutoSuggest,
  DropdownMenu,
} from "@prime/ui";

export default function VouchersPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [mitiDate, setMitiDate] = useState<Date | undefined>(new Date());
  const [adDate, setAdDate] = useState<Date | undefined>(new Date());
  const [refMitiDate, setRefMitiDate] = useState<Date | undefined>();
  const [refAdDate, setRefAdDate] = useState<Date | undefined>();
  const [partyQuery, setPartyQuery] = useState("");

  const [voucherType, setVoucherType] = useState("Sales");
  const [applyTax, setApplyTax] = useState("Item Level");
  const [mode, setMode] = useState("Item Mode");
  const [paymentMode, setPaymentMode] = useState("Credit");
  const [salesAc, setSalesAc] = useState("13% Sales");

  const inputClasses =
    "flex h-10 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-focus-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <div className="flex flex-col h-full bg-background min-h-screen">
      {/* Header / Document Meta Section Wrapper */}
      <div className="flex border-b border-border bg-surface relative overflow-hidden">
        <section className="flex-1 px-4 py-4 flex flex-col gap-2">
          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-2 items-end">
            {/* Group 1: Primary Details */}
            <div className="flex flex-col gap-1 lg:col-span-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Voucher Type
              </label>
              <DropdownMenu
                items={[
                  {
                    id: "Sales",
                    label: "Sales",
                    onSelect: () => setVoucherType("Sales"),
                  },
                  {
                    id: "Purchase",
                    label: "Purchase",
                    onSelect: () => setVoucherType("Purchase"),
                  },
                  {
                    id: "Receipt",
                    label: "Receipt",
                    onSelect: () => setVoucherType("Receipt"),
                  },
                ]}
              >
                <button className={inputClasses}>
                  <span className="font-semibold truncate">{voucherType}</span>
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className="text-muted-foreground shrink-0 ml-2"
                  />
                </button>
              </DropdownMenu>
            </div>

            <div className="flex flex-col gap-1 lg:col-span-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Voucher No.
              </label>
              <TextInput.Root
                disabled
                tabIndex={-1}
                className="pointer-events-none"
              >
                <TextInput.Input
                  value="8384/003"
                  readOnly
                  tabIndex={-1}
                  className="font-mono font-medium pointer-events-none"
                />
              </TextInput.Root>
            </div>

            <div className="flex flex-col gap-1 lg:col-span-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Apply Tax
              </label>
              <DropdownMenu
                items={[
                  {
                    id: "Item Level",
                    label: "Item Level",
                    onSelect: () => setApplyTax("Item Level"),
                  },
                  {
                    id: "Invoice Level",
                    label: "Invoice Level",
                    onSelect: () => setApplyTax("Invoice Level"),
                  },
                ]}
              >
                <button className={inputClasses}>
                  <span className="truncate">{applyTax}</span>
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className="text-muted-foreground shrink-0 ml-2"
                  />
                </button>
              </DropdownMenu>
            </div>

            <div className="flex flex-col gap-1 lg:col-span-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Mode
              </label>
              <DropdownMenu
                items={[
                  {
                    id: "Item Mode",
                    label: "Item Mode",
                    onSelect: () => setMode("Item Mode"),
                  },
                  {
                    id: "Account Mode",
                    label: "Account Mode",
                    onSelect: () => setMode("Account Mode"),
                  },
                ]}
              >
                <button className={inputClasses}>
                  <span className="truncate">{mode}</span>
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className="text-muted-foreground shrink-0 ml-2"
                  />
                </button>
              </DropdownMenu>
            </div>

            <div className="flex flex-col gap-1 lg:col-span-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Payment Mode
              </label>
              <DropdownMenu
                items={[
                  {
                    id: "Credit",
                    label: "Credit",
                    onSelect: () => setPaymentMode("Credit"),
                  },
                  {
                    id: "Cash",
                    label: "Cash",
                    onSelect: () => setPaymentMode("Cash"),
                  },
                ]}
              >
                <button className={inputClasses}>
                  <span className="truncate">{paymentMode}</span>
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className="text-muted-foreground shrink-0 ml-2"
                  />
                </button>
              </DropdownMenu>
            </div>

            {/* Group 2: Date & Account Details */}
            <div className="flex flex-col gap-1 lg:col-span-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                Miti{" "}
                <span className="opacity-60 font-normal lowercase">(bs)</span>
              </label>
              <DatePicker
                date={mitiDate}
                onDateChange={setMitiDate}
                calendarType="nepali"
                placeholder="Select Miti"
                className=""
              />
            </div>

            <div className="flex flex-col gap-1 lg:col-span-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                Date{" "}
                <span className="opacity-60 font-normal lowercase">(ad)</span>
              </label>
              <DatePicker
                date={adDate}
                onDateChange={setAdDate}
                calendarType="gregorian"
                placeholder="Select Date"
                className=""
              />
            </div>

            <div className="flex flex-col gap-1 lg:col-span-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Party A/C
              </label>
              <AutoSuggest
                inputValue={partyQuery}
                onInputChange={setPartyQuery}
                placeholder="Search party account..."
                options={[
                  { label: "Cash", value: "cash" },
                  { label: "Bank", value: "bank" },
                ]}
              />
            </div>

            <div className="flex flex-col gap-1 lg:col-span-1">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Sales A/C
              </label>
              <DropdownMenu
                items={[
                  {
                    id: "13% Sales",
                    label: "13% Sales",
                    onSelect: () => setSalesAc("13% Sales"),
                  },
                  {
                    id: "Exempt Sales",
                    label: "Exempt Sales",
                    onSelect: () => setSalesAc("Exempt Sales"),
                  },
                ]}
              >
                <button className={inputClasses}>
                  <span className="truncate">{salesAc}</span>
                  <Icon
                    name="ChevronDown"
                    size={16}
                    className="text-muted-foreground shrink-0 ml-2"
                  />
                </button>
              </DropdownMenu>
            </div>
          </div>
        </section>

        {/* Vertical Ribbon (DOM order placed here for perfect Tab flow: Primary Fields -> Ribbon -> Secondary Fields) */}
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="w-8 relative z-20 bg-surface flex-shrink-0 border-l border-border flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer group focus:outline-none focus:ring-2 focus:ring-inset focus:ring-focus-ring"
        >
          <Icon
            name="ChevronRight"
            size={20}
            className={`text-muted-foreground group-hover:text-foreground transition-all duration-300 ${isDrawerOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Overlay Drawer (Covers exact same area as Primary Section, absolute positioning allows it to follow the button in DOM order) */}
        <div
          className={`absolute inset-y-0 left-0 right-8 bg-surface shadow-[-10px_0_5px_-5px_rgba(0,0,0,0.05)] transition-transform duration-300 ease-in-out z-10 flex flex-col overflow-y-auto ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="p-4 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-x-2 gap-y-2 items-end">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  Ref. Miti{" "}
                  <span className="opacity-60 font-normal lowercase">(bs)</span>
                </label>
                <DatePicker
                  date={refMitiDate}
                  onDateChange={setRefMitiDate}
                  calendarType="nepali"
                  placeholder="Select Miti"
                  className="text-muted-foreground"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                  Ref. Date{" "}
                  <span className="opacity-60 font-normal lowercase">(ad)</span>
                </label>
                <DatePicker
                  date={refAdDate}
                  onDateChange={setRefAdDate}
                  calendarType="gregorian"
                  placeholder="Select Date"
                  className="text-muted-foreground"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Ref. No.
                </label>
                <TextInput.Root>
                  <TextInput.Input placeholder="Reference number..." />
                </TextInput.Root>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
