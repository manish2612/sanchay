"use client";

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { voucherFormSchema, type VoucherFormValues } from "@/features/Vouchers/schema/voucherSchema";
import { useLeavePromptSlot } from "@/providers/LeavePromptProvider";
import { VOUCHER_FIELDS } from "@/features/Vouchers/constants/voucherFields";

import { VoucherPageHeader } from "@/features/Vouchers/components/VoucherPageHeader";
import { VoucherDetailsForm } from "@/features/Vouchers/components/VoucherDetailsForm";
import { VoucherItemTable } from "@/features/Vouchers/components/VoucherItemTable/VoucherItemTable";
import { LedgerEntryTable } from "@/features/Vouchers/components/LedgerEntryTable/LedgerEntryTable";
import { VoucherFooter } from "@/features/Vouchers/components/VoucherFooter";
import { useVoucherDetailsForm } from "@/features/Vouchers/hooks/useVoucherDetailsForm";
import { useVoucherFooter } from "@/features/Vouchers/hooks/useVoucherFooter";
import { useVoucherPreferences } from "@/features/Vouchers/hooks/useVoucherPreferences";
import { useParams } from "@tanstack/react-router";

export default function VouchersPage() {
  const { voucherId } = useParams({ strict: false });

  const methods = useForm<VoucherFormValues>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      voucherTypeId: voucherId || "",
      voucherDateAd: new Date(),
      voucherNo: "",
      referenceNo: "",
      partyAccount: "",
      narration: "",
      mode: "Item Mode",
      paymentMode: "Credit",
      salesAc: "13% Sales",
      ledgerEntries: [{ id: "row-1", name: "", amount: "", debitAmount: "", creditAmount: "", vatAmt: "", isPhantom: true }],
    },
  });

  React.useEffect(() => {
    if (voucherId && voucherId !== methods.getValues("voucherTypeId")) {
      methods.setValue("voucherTypeId", voucherId, { shouldDirty: true });
    }
  }, [voucherId, methods]);

  const mode = methods.watch(VOUCHER_FIELDS.MODE);
  const partyAccount = methods.watch(VOUCHER_FIELDS.PARTY_ACCOUNT) || "";

  const voucherState = useVoucherDetailsForm(partyAccount);
  const footerState = useVoucherFooter();
  const prefs = useVoucherPreferences();

  const isAccountInvoice = prefs.applyMode === "Account Invoice";
  const isAccountMode = prefs.applyMode === "Account Mode";
  const showLedgerInBody = isAccountInvoice || isAccountMode;

  useLeavePromptSlot({
    id: "voucher-main-form",
    isDirty: methods.formState.isDirty,
    priority: 20,
  });

  return (
    <FormProvider {...methods}>
      <form className="flex flex-col h-full bg-background overflow-hidden">
        {/* Page header: breadcrumb, title, mode badges */}
        <VoucherPageHeader
          voucherMode="Creation Mode"
          entryMode={mode || "Item Mode"}
          prefs={prefs}
        />

        {/* Document details form */}
        <VoucherDetailsForm {...voucherState} />

        {/* Tables section: fills remaining vertical space */}
        <div className="flex-1 flex flex-col overflow-auto min-h-0">
          {showLedgerInBody ? <LedgerEntryTable applyMode={prefs.applyMode} /> : <VoucherItemTable />}
        </div>

        {/* Footer: narration + actions + financial summary */}
        <VoucherFooter {...footerState} hideLedgerEntryTable={showLedgerInBody} />
      </form>
    </FormProvider>
  );
}
