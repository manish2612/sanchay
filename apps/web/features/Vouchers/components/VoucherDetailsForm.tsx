import React from "react";
import {
  TextInput,
  DatePicker,
  Icon,
  AutoSuggest,
  DropdownMenu,
  Button,
} from "@prime/ui";
import { type VoucherDetailsFormState } from "../hooks/useVoucherDetailsForm";

// ─── Voucher Type Primary Dropdown ─────────────────────────────────────────
// Uses children-as-custom-trigger pattern to apply brand primary styling.
// This is the master control field — visually dominant to signal hierarchy.

interface VoucherTypeSelectorProps {
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

function VoucherTypeSelector({ value, onChange, options }: VoucherTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground select-none leading-none">
        Voucher Type
      </span>
      <DropdownMenu
        items={options.map((opt) => ({
          id: opt,
          label: opt,
          onSelect: () => onChange(opt),
        }))}
        align="start"
      >
        {/* Custom trigger: bold primary-colored button */}
        <Button
          variant="primary"
          size="sm"
          className="w-full justify-between font-semibold text-sm h-9"
        >
          <span className="truncate">{value}</span>
          <Icon
            name="ChevronDown"
            size={14}
            className="opacity-70 ml-2 shrink-0"
          />
        </Button>
      </DropdownMenu>
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function VoucherDetailsForm({
  isDrawerOpen,
  setIsDrawerOpen,
  mitiDate,
  setMitiDate,
  adDate,
  setAdDate,
  refMitiDate,
  setRefMitiDate,
  refAdDate,
  setRefAdDate,
  partyQuery,
  setPartyQuery,
  voucherType,
  setVoucherType,
  applyTax,
  setApplyTax,
  mode,
  setMode,
  paymentMode,
  setPaymentMode,
  salesAc,
  setSalesAc,
  voucherTypeOptions,
  filteredPartyOptions,
}: VoucherDetailsFormState) {
  return (
    <div className="flex border-b border-border bg-surface relative overflow-hidden flex-shrink-0">
      <section className="flex-1 px-4 pt-3 pb-2 flex flex-col gap-2">
        {/* ── Primary Row: Core document identifiers ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-x-2 gap-y-2 items-end">
          {/* Voucher Type — Primary accent control */}
          <div className="lg:col-span-1">
            <VoucherTypeSelector
              value={voucherType}
              onChange={setVoucherType}
              options={voucherTypeOptions}
            />
          </div>

          {/* Voucher No — Read-only, monospace */}
          <div className="lg:col-span-1">
            <TextInput
              label="Voucher No."
              labelVariant="in-field"
              disabled
              tabIndex={-1}
              className="pointer-events-none"
              inputClassName="font-mono font-medium pointer-events-none text-muted-foreground bg-muted"
              value="8384/003"
              readOnly
            />
          </div>

          {/* Payment Mode */}
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
                {
                  id: "Bank Transfer",
                  label: "Bank Transfer",
                  onSelect: () => setPaymentMode("Bank Transfer"),
                },
                {
                  id: "Cheque",
                  label: "Cheque",
                  onSelect: () => setPaymentMode("Cheque"),
                },
              ]}
            />
          </div>

          {/* Miti (BS) */}
          <div className="lg:col-span-1">
            <DatePicker
              label="Miti (bs)"
              labelVariant="in-field"
              date={mitiDate}
              onDateChange={(date, meta) => {
                setMitiDate(date);
                setAdDate(date);
                if (meta?.nepaliDateString) setMitiString(meta.nepaliDateString);
              }}
              calendarType="nepali"
              placeholder="Select Miti"
            />
          </div>

          {/* Date (AD) */}
          <div className="lg:col-span-1">
            <DatePicker
              label="Date (ad)"
              labelVariant="in-field"
              date={adDate}
              onDateChange={(date) => {
                setAdDate(date);
                setMitiDate(date);
              }}
              calendarType="gregorian"
              placeholder="Select Date"
            />
          </div>

          {/* Apply Tax — Neutral, no yellow styling per design decision */}
          {/* <div className="lg:col-span-1">
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
                {
                  id: "No Tax",
                  label: "No Tax",
                  onSelect: () => setApplyTax("No Tax"),
                },
              ]}
            />
          </div> */}

          {/* Mode — Neutral, no green styling per design decision */}
          {/* <div className="lg:col-span-1">
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
          </div> */}

          <div className="lg:col-span-1">
            <AutoSuggest
              inputValue={partyQuery}
              onInputChange={setPartyQuery}
              options={filteredPartyOptions}
            >
              <AutoSuggest.Input
                label="Party A/C"
                labelVariant="in-field"
                placeholder="Search party account..."
              />
              <AutoSuggest.Content>
                <AutoSuggest.List>
                  <AutoSuggest.Empty>No results found.</AutoSuggest.Empty>
                  {filteredPartyOptions.map((opt) => (
                    <AutoSuggest.Item key={opt.value} value={opt.value}>
                      {opt.label}
                    </AutoSuggest.Item>
                  ))}
                </AutoSuggest.List>
              </AutoSuggest.Content>
            </AutoSuggest>
          </div>

          {/* Sales A/C */}
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
                  id: "0% Sales",
                  label: "0% Sales",
                  onSelect: () => setSalesAc("0% Sales"),
                },
                {
                  id: "Exempt Sales",
                  label: "Exempt Sales",
                  onSelect: () => setSalesAc("Exempt Sales"),
                },
              ]}
            />
          </div>
          <div className="lg:col-span-1">
            <TextInput
              label="Ref. No."
              labelVariant="in-field"
              placeholder="Reference number..."
            />
          </div>
          <div className="lg:col-span-1">
            <DatePicker
              label="Ref. Miti (bs)"
              labelVariant="in-field"
              date={refMitiDate}
              onDateChange={(date, meta) => {
                setRefMitiDate(date);
                setRefAdDate(date);
                if (meta?.nepaliDateString) setRefMitiString(meta.nepaliDateString);
              }}
              calendarType="nepali"
              placeholder="Select Miti"
            />
          </div>
          <div className="lg:col-span-1">
            <DatePicker
              label="Ref. Date (ad)"
              labelVariant="in-field"
              date={refAdDate}
              onDateChange={(date) => {
                setRefAdDate(date);
                setRefMitiDate(date);
              }}
              calendarType="gregorian"
              placeholder="Select Date"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
