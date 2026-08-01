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
        <section className="flex-1 px-4 py-3 flex flex-col gap-2">
          {/* Form Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-2 items-end">
            {/* Group 1: Primary Details */}
            <div className="lg:col-span-1">
              <DropdownMenu
                label="Voucher Type"
                labelVariant="in-field"
                triggerLabel={voucherType}
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
              />
            </div>

            <div className="lg:col-span-1">
              <TextInput
                label="Voucher No."
                labelVariant="in-field"
                disabled
                tabIndex={-1}
                className="pointer-events-none"
                inputClassName="font-mono font-medium pointer-events-none"
                value="8384/003"
                readOnly
              />
            </div>

            <div className="lg:col-span-1">
              <DropdownMenu
                label="Apply Tax"
                labelVariant="in-field"
                triggerLabel={applyTax}
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
              />
            </div>

            <div className="lg:col-span-1">
              <DropdownMenu
                label="Mode"
                labelVariant="in-field"
                triggerLabel={mode}
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
              />
            </div>

            <div className="lg:col-span-1">
              <DropdownMenu
                label="Payment Mode"
                labelVariant="in-field"
                triggerLabel={paymentMode}
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
              />
            </div>

            {/* Group 2: Date & Account Details */}
            <div className="lg:col-span-1">
              <DatePicker
                label="Miti (bs)"
                labelVariant="in-field"
                date={mitiDate}
                onDateChange={setMitiDate}
                calendarType="nepali"
                placeholder="Select Miti"
                className=""
              />
            </div>

            <div className="lg:col-span-1">
              <DatePicker
                label="Date (ad)"
                labelVariant="in-field"
                date={adDate}
                onDateChange={setAdDate}
                calendarType="gregorian"
                placeholder="Select Date"
                className=""
              />
            </div>

            <div className="lg:col-span-1">
              <AutoSuggest
                inputValue={partyQuery}
                onInputChange={setPartyQuery}
                options={[
                  { label: "Cash", value: "cash" },
                  { label: "Bank", value: "bank" },
                ]}
              >
                <AutoSuggest.Input
                  label="Party A/C"
                  labelVariant="in-field"
                  placeholder="Search party account..."
                />
                <AutoSuggest.Content>
                  <AutoSuggest.List>
                    <AutoSuggest.Empty>No results found.</AutoSuggest.Empty>
                    {[
                      { label: "Cash", value: "cash" },
                      { label: "Bank", value: "bank" },
                    ].map((opt) => (
                      <AutoSuggest.Item key={opt.value} value={opt.value}>
                        {opt.label}
                      </AutoSuggest.Item>
                    ))}
                  </AutoSuggest.List>
                </AutoSuggest.Content>
              </AutoSuggest>
            </div>

            <div className="lg:col-span-1">
              <DropdownMenu
                label="Sales A/C"
                labelVariant="in-field"
                triggerLabel={salesAc}
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
              />
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
              <div>
                <DatePicker
                  label="Ref. Miti (bs)"
                  labelVariant="in-field"
                  date={refMitiDate}
                  onDateChange={setRefMitiDate}
                  calendarType="nepali"
                  placeholder="Select Miti"
                  className="text-muted-foreground"
                />
              </div>

              <div>
                <DatePicker
                  label="Ref. Date (ad)"
                  labelVariant="in-field"
                  date={refAdDate}
                  onDateChange={setRefAdDate}
                  calendarType="gregorian"
                  placeholder="Select Date"
                  className="text-muted-foreground"
                />
              </div>

              <div>
                <TextInput
                  label="Ref. No."
                  labelVariant="in-field"
                  placeholder="Reference number..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
