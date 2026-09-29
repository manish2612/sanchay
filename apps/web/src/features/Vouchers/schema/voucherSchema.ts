import { z } from 'zod';
import { VOUCHER_FIELDS } from '../constants/voucherFields';

const costCenterAllocationSchema = z.object({
  id: z.string(),
  costCategoryId: z.string().optional(),
  costCategory: z.string(),
  costCenterId: z.string().optional(),
  costCenter: z.string(),
  amount: z.string(),
  isPhantom: z.boolean().optional(),
});

// Shared Base Fields
// Shared Base Fields
const baseVoucherSchema = z.object({
  [VOUCHER_FIELDS.VOUCHER_TYPE_ID]: z.string().min(1, "Voucher Type is required"),
  [VOUCHER_FIELDS.VOUCHER_DATE_AD]: z.date({ message: "Voucher Date is required" }),
  [VOUCHER_FIELDS.VOUCHER_DATE_BS]: z.string().optional(),
  [VOUCHER_FIELDS.REF_DATE_AD]: z.date().optional(),
  [VOUCHER_FIELDS.REF_DATE_BS]: z.string().optional(),
  
  [VOUCHER_FIELDS.VOUCHER_NO]: z.string().min(1, "Voucher Number is required"),
  [VOUCHER_FIELDS.REFERENCE_NO]: z.string().optional(),
  [VOUCHER_FIELDS.APPLY_TAX]: z.string().optional(),
  [VOUCHER_FIELDS.PAYMENT_MODE]: z.string().optional(),
  [VOUCHER_FIELDS.NARRATION]: z.string().optional(),
  
  [VOUCHER_FIELDS.SEQUENCE_INDEX]: z.number().optional(),
  [VOUCHER_FIELDS.SUFFIX]: z.string().optional(),
});

// --- ACCOUNT MODE ---
const accountLedgerEntrySchema = z.object({
  id: z.string(),
  ledgerId: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  debitAmount: z.string().optional(),
  creditAmount: z.string().optional(),
  vatAmt: z.string().optional(),
  isPhantom: z.boolean().optional(),
  costCenterAllocations: z.array(costCenterAllocationSchema).optional(),
}).superRefine((data, ctx) => {
  // Dirty Phantom Check: If it's completely empty phantom, ignore.
  if (data.isPhantom && !data.ledgerId && !data.debitAmount && !data.creditAmount) return;

  if (!data.ledgerId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ledger is required", path: ["ledgerId"] });
  }
  if (!data.debitAmount && !data.creditAmount) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Amount is required", path: ["debitAmount"] });
  }
});

const accountModeSchema = baseVoucherSchema.extend({
  [VOUCHER_FIELDS.MODE]: z.literal("Account Mode"),
  [VOUCHER_FIELDS.PARTY_ACCOUNT]: z.string().optional(),
  [VOUCHER_FIELDS.SALES_AC]: z.string().optional(),
  [VOUCHER_FIELDS.ITEM_ENTRIES]: z.array(z.any()).optional(),
  [VOUCHER_FIELDS.LEDGER_ENTRIES]: z.array(accountLedgerEntrySchema)
    .refine(entries => entries.filter(e => !e.isPhantom || e.ledgerId || e.debitAmount || e.creditAmount).length > 0, "At least one entry is required")
});

// --- ACCOUNT INVOICE ---
const invoiceLedgerEntrySchema = z.object({
  id: z.string(),
  ledgerId: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  amount: z.string().optional(),
  vatAmt: z.string().optional(),
  isPhantom: z.boolean().optional(),
  costCenterAllocations: z.array(costCenterAllocationSchema).optional(),
}).superRefine((data, ctx) => {
  if (data.isPhantom && !data.ledgerId && !data.amount) return;

  if (!data.ledgerId) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Ledger is required", path: ["ledgerId"] });
  }
  if (!data.amount) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Amount is required", path: ["amount"] });
  }
});

const accountInvoiceSchema = baseVoucherSchema.extend({
  [VOUCHER_FIELDS.MODE]: z.literal("Account Invoice"),
  [VOUCHER_FIELDS.PARTY_ACCOUNT]: z.string().min(1, "Party Account is required"),
  [VOUCHER_FIELDS.SALES_AC]: z.string().optional(),
  [VOUCHER_FIELDS.ITEM_ENTRIES]: z.array(z.any()).optional(),
  [VOUCHER_FIELDS.LEDGER_ENTRIES]: z.array(invoiceLedgerEntrySchema)
    .refine(entries => entries.filter(e => !e.isPhantom || e.ledgerId || e.amount).length > 0, "At least one entry is required"),
});

// --- ITEM MODE ---
const itemEntrySchema = z.object({
  id: z.string(),
  itemId: z.string().optional(),
  item: z.string().optional(),
  description: z.string().optional(),
  qty: z.string().optional(),
  freeQty: z.string().optional(),
  altQty: z.string().optional(),
  netRate: z.string().optional(),
  rate: z.string().optional(),
  per: z.string().optional(),
  discPer: z.string().optional(),
  discAmt: z.string().optional(),
  amount: z.string().optional(),
  isPhantom: z.boolean().optional(),
}).superRefine((data, ctx) => {
  if (data.isPhantom && !data.itemId && !data.qty && !data.amount) return;

  if (!data.itemId && !data.item) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Item is required", path: ["itemId"] });
  }
  if (!data.qty) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Quantity is required", path: ["qty"] });
  }
  if (!data.amount) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Amount is required", path: ["amount"] });
  }
});

const itemModeSchema = baseVoucherSchema.extend({
  [VOUCHER_FIELDS.MODE]: z.literal("Item Mode"),
  [VOUCHER_FIELDS.PARTY_ACCOUNT]: z.string().min(1, "Party Account is required"),
  [VOUCHER_FIELDS.SALES_AC]: z.string().min(1, "Sales Account is required"),
  [VOUCHER_FIELDS.LEDGER_ENTRIES]: z.array(z.any()).optional(),
  [VOUCHER_FIELDS.ITEM_ENTRIES]: z.array(itemEntrySchema)
    .refine(entries => entries.filter(e => !e.isPhantom || e.itemId || e.item || e.qty || e.amount).length > 0, "At least one entry is required"),
});

// --- FINAL EXPORT ---
export const voucherFormSchema = z.discriminatedUnion(VOUCHER_FIELDS.MODE, [
  accountModeSchema,
  accountInvoiceSchema,
  itemModeSchema,
]).superRefine((data: any, ctx: z.RefinementCtx) => {
  // Shared Reference Rules
  if (data[VOUCHER_FIELDS.REFERENCE_NO] && !data[VOUCHER_FIELDS.REF_DATE_AD]) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ref. Date is required when Ref. No. is provided",
      path: [VOUCHER_FIELDS.REF_DATE_AD]
    });
  }
  if (data[VOUCHER_FIELDS.REF_DATE_AD] && !data[VOUCHER_FIELDS.REFERENCE_NO]) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Ref. No. is required when Ref. Date is provided",
      path: [VOUCHER_FIELDS.REFERENCE_NO]
    });
  }

  // Account Mode specific superRefine (Double Entry Balance)
  if (data[VOUCHER_FIELDS.MODE] === "Account Mode") {
    const rows = data.ledgerEntries?.filter((e: any) => !e.isPhantom || e.ledgerId || e.debitAmount || e.creditAmount) || [];
    const totalDebit = rows.reduce((sum: number, r: any) => sum + Number(r.debitAmount || 0), 0);
    const totalCredit = rows.reduce((sum: number, r: any) => sum + Number(r.creditAmount || 0), 0);
    
    if (Math.abs(totalDebit - totalCredit) > 0.001) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Total Debit (${totalDebit}) must equal Total Credit (${totalCredit})`,
        path: [VOUCHER_FIELDS.LEDGER_ENTRIES], // Attach error to array root
      });
    }
  }
});

export type VoucherFormValues = z.infer<typeof voucherFormSchema>;
