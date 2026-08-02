import { useState } from "react";

// ─── Constants & Extracted Logic ──────────────────────────────────────────

const VOUCHER_TYPE_OPTIONS = [
  "Sales",
  "Purchase",
  "Receipt",
  "Payment",
  "Journal",
  "Credit Note",
  "Debit Note",
];

const PARTY_ACCOUNT_OPTIONS = [
  { label: "Cash", value: "cash" },
  { label: "Bank", value: "bank" },
];

export function useVoucherDetailsForm() {
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

  const filteredPartyOptions = PARTY_ACCOUNT_OPTIONS.filter((opt) =>
    opt.label.toLowerCase().includes(partyQuery.toLowerCase())
  );

  return {
    isDrawerOpen, setIsDrawerOpen,
    mitiDate, setMitiDate,
    adDate, setAdDate,
    refMitiDate, setRefMitiDate,
    refAdDate, setRefAdDate,
    partyQuery, setPartyQuery,
    voucherType, setVoucherType,
    applyTax, setApplyTax,
    mode, setMode,
    paymentMode, setPaymentMode,
    salesAc, setSalesAc,
    voucherTypeOptions: VOUCHER_TYPE_OPTIONS,
    filteredPartyOptions,
  };
}

export type VoucherDetailsFormState = ReturnType<typeof useVoucherDetailsForm>;
