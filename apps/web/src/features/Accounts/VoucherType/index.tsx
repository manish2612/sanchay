"use client";

import React from "react";
import { VoucherPageHeader } from "@/features/Vouchers/components/VoucherPageHeader";
import { VoucherDetailsForm } from "@/features/Vouchers/components/VoucherDetailsForm";
import { VoucherItemTable } from "@/features/Vouchers/components/VoucherItemTable/VoucherItemTable";
import { LedgerEntryTable } from "@/features/Vouchers/components/LedgerEntryTable/LedgerEntryTable";
import { VoucherFooter } from "@/features/Vouchers/components/VoucherFooter";
import { useVoucherDetailsForm } from "@/features/Vouchers/hooks/useVoucherDetailsForm";
import { useVoucherFooter } from "@/features/Vouchers/hooks/useVoucherFooter";

export default function VouchersPage() {
  const voucherState = useVoucherDetailsForm();
  const footerState = useVoucherFooter();

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden">
      {/* Page header: breadcrumb, title, mode badges */}
      <VoucherPageHeader
        voucherMode="Creation Mode"
        entryMode={voucherState.mode}
      />

      {/* Document details form */}
      <VoucherDetailsForm {...voucherState} />

      {/* Tables section: fills remaining vertical space */}
      <div className="flex-1 flex flex-col overflow-auto min-h-0">
        <VoucherItemTable />
      </div>

      {/* Footer: narration + actions + financial summary */}
      <VoucherFooter {...footerState} />
    </div>
  );
}
