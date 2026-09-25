import { z } from "zod";
import { LEDGER_FORM_FIELDS } from "./constants";
import { baseAddressSchema, baseContactSchema } from '@/utils/shared-schemas';

const costCenterAllocationSchema = z.object({
  id: z.string(),
  costCategory: z.string(),
  costCenter: z.string(),
  amount: z.string(),
  isPhantom: z.boolean().optional(),
});

export const ledgerFormSchema = z.object({
  // Step 1
  [LEDGER_FORM_FIELDS.NAME]: z.string().min(1, "Name is required"),
  [LEDGER_FORM_FIELDS.ALIAS]: z.string().optional(),
  [LEDGER_FORM_FIELDS.UNDER]: z.string().min(1, "Under group is required"),
  [LEDGER_FORM_FIELDS.ACCOUNT_CODE]: z.string().optional(),
  [LEDGER_FORM_FIELDS.REGISTRATION_TYPE]: z.string().min(1, "Registration type is required"),
  [LEDGER_FORM_FIELDS.REGISTRATION_NUMBER]: z.string().optional(),

  // Step 2
  [LEDGER_FORM_FIELDS.IS_BILL_BY_BILL]: z.boolean(),
  [LEDGER_FORM_FIELDS.CREDIT_PERIOD]: z.string().optional(),
  [LEDGER_FORM_FIELDS.CREDIT_LIMIT]: z.string().optional(),
  [LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED]: z.boolean(),
  [LEDGER_FORM_FIELDS.OPENING_BALANCE]: z.string().optional(),
  [LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE]: z.enum(["Dr", "Cr"]),
  [LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS]: z.array(costCenterAllocationSchema).optional(),
})
.merge(baseAddressSchema)
.merge(baseContactSchema)
.superRefine((data, ctx) => {
  const openingBalanceStr = data[LEDGER_FORM_FIELDS.OPENING_BALANCE] || "0";
  const targetAmount = parseFloat(openingBalanceStr.replace(/[^0-9.-]+/g, "")) || 0;
  
  if (targetAmount > 0) {
    const allocations = data[LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS] || [];
    const allocatedAmount = allocations.reduce((sum, row) => {
      if (row.isPhantom) return sum;
      const amtString = typeof row.amount === 'string' ? row.amount : String(row.amount || "");
      const amt = parseFloat(amtString.replace(/[^0-9.-]+/g, "")) || 0;
      return sum + amt;
    }, 0);

    if (Math.abs(allocatedAmount - targetAmount) >= 0.001) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Cost centre allocations must tally with the opening balance (Remaining: ₹${(targetAmount - allocatedAmount).toFixed(2)})`,
        path: [LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS],
      });
    }
  }
});

export type LedgerFormValues = z.infer<typeof ledgerFormSchema>;
