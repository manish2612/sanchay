"use client";

import React from "react";
import { VoucherDetailsForm } from "../../../features/Vouchers/components/VoucherDetailsForm";
import { VoucherItemTable } from "../../../features/Vouchers/components/VoucherItemTable/VoucherItemTable";
import { LedgerEntryTable } from "../../../features/Vouchers/components/LedgerEntryTable/LedgerEntryTable";
import { useVoucherDetailsForm } from "../../../features/Vouchers/hooks/useVoucherDetailsForm";

export default function VouchersPage() {
  const voucherState = useVoucherDetailsForm();

  return (
    <div className="flex flex-col h-full bg-background min-h-screen border border-border">
      <VoucherDetailsForm {...voucherState} />
      <VoucherItemTable />
      <LedgerEntryTable />
    </div>
  );
}
