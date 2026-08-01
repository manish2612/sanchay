"use client";

import React from "react";
import { VoucherDetailsForm } from "../../../features/Vouchers/components/VoucherDetailsForm";
import { VoucherTable } from "../../../features/Vouchers/components/VoucherTable/VoucherTable";
import { useVoucherDetailsForm } from "../../../features/Vouchers/hooks/useVoucherDetailsForm";

export default function VouchersPage() {
  const voucherState = useVoucherDetailsForm();

  return (
    <div className="flex flex-col h-full bg-background min-h-screen">
      <VoucherDetailsForm {...voucherState} />
      <VoucherTable />
    </div>
  );
}
