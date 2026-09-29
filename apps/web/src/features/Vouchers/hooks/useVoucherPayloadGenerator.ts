import { useGetVoucherTypesQuery } from "@/features/Accounts/VoucherType/api";
import { VoucherFormValues } from "../schema/voucherSchema";
import { formatLocalToUTCDate } from "@/utils/dateUtils";

export function useVoucherPayloadGenerator() {
  const { data: voucherTypes } = useGetVoucherTypesQuery();

  const generatePayload = (data: VoucherFormValues) => {
    // 1. Resolve Master Data
    const activeVoucherType = voucherTypes?.find((vt) => vt.id === data.voucherTypeId);

    // 2. Map Ledger Lines (Strict Mapping - Automatically drops unnecessary keys like `isPhantom`, `name`)
    const ledger_lines = (data.ledgerEntries || [])
      .filter((row) => !row.isPhantom) // Safely filter out phantom rows
      .map((row, index) => {
        const debit = parseFloat(row.debitAmount || "0");
        const credit = parseFloat(row.creditAmount || "0");
        const assessable = debit > 0 ? debit : -credit;

        // Constructing exact payload schema. UI-only fields are NOT included here.
        return {
          assessable_value: assessable,
          base_amount: assessable,
          bill_discount_amount: 0,
          bill_discount_percentage: 0,
          cost_allocations: (row.costCenterAllocations || [])
            .filter((alloc) => !alloc.isPhantom)
            .map((alloc, allocIndex) => {
              const allocAmount = parseFloat(alloc.amount || "0");
              return {
                amount: debit > 0 ? allocAmount : -allocAmount,
                cost_centre_id: alloc.costCenterId || "",
                line_index: (allocIndex + 1),
              };
            }),
          description: row.description || "",
          doc_amount: 0,
          ledger_id: row.ledgerId || "",
          line_index: (index + 1),
          manual_added_acc: false,
          tax_amount: 0, // Skipped for now
          tax_group_id: "", // Skipped for now
          tax_rate: 0, // Skipped for now
          voucher_id: "", // Blank payload requirement
        };
      });

    // 3. Compute Root Totals
    // Sum of all debit rows serves as the base amount
    const totalDebit = ledger_lines.reduce((acc, row) => row.base_amount > 0 ? acc + row.base_amount : acc, 0);
    
    const total_base_amount = totalDebit;
    const taxable_amount = 0;
    const subtotal_amount = total_base_amount - taxable_amount;

    // 4. Construct Root Payload
    return {
      category: activeVoucherType?.category || "",
      currency_code: "INR", // Hardcoded per user request
      is_local_trans: false, // Skipped for now
      ledger_lines,
      miti_date: data.voucherDateBs || "",
      narration: data.narration || "",
      payment_mode: data.paymentMode || "",
      posting_affects: activeVoucherType?.posting_affects || "",
      posting_mode: "", // Blank payload requirement
      reference_date: formatLocalToUTCDate(data.refDateAd),
      reference_miti: data.refDateBs || "",
      reference_number: data.referenceNo || "",
      sequence_index: data.sequenceIndex || 0,
      subtotal_amount, // Calculated: total_base_amount - taxable_amount
      suffix: data.suffix || "",
      tax_amount: 0,
      taxable_amount,
      total_base_amount, // Sum of all debit entries
      voucher_date: formatLocalToUTCDate(data.voucherDateAd),
      voucher_mode: activeVoucherType?.voucher_mode || "",
      voucher_number: data.voucherNo || "",
      voucher_type_id: data.voucherTypeId || "",
    };
  };

  return { generatePayload };
}
