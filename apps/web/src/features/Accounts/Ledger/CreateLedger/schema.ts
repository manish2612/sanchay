import { z } from "zod";
import { LEDGER_FORM_FIELDS } from "./constants";
import { baseAddressSchema, baseContactSchema } from '@/utils/shared-schemas';
import { taxRateRowSchema, isTaxRateRowEmpty } from '@/components/TaxRatesTable';
import {
  isCostCenterRowEmpty,
  costCenterAllocationRowSchema,
} from '@/features/CostCenter/components/CostCenterAllocationTable';

export { isTaxRateRowEmpty, isCostCenterRowEmpty };

export const ledgerFormSchema = z.object({
  // Step 1
  [LEDGER_FORM_FIELDS.NAME]: z.string().min(1, "Name is required"),
  [LEDGER_FORM_FIELDS.ALIAS]: z.string().optional(),
  [LEDGER_FORM_FIELDS.PARENT]: z.string().min(1, "Parent is required"),
  [LEDGER_FORM_FIELDS.ACCOUNT_CODE]: z.string().optional(),
  [LEDGER_FORM_FIELDS.REGISTRATION_TYPE]: z.string().optional(),
  [LEDGER_FORM_FIELDS.REGISTRATION_NUMBER]: z.string().optional(),

  // Step 2
  [LEDGER_FORM_FIELDS.IS_BILL_BY_BILL]: z.boolean(),
  [LEDGER_FORM_FIELDS.CREDIT_PERIOD]: z.string().optional(),
  [LEDGER_FORM_FIELDS.CREDIT_LIMIT]: z.string().optional(),
  [LEDGER_FORM_FIELDS.BLOCK_SALES_BILL_ON_CREDIT_LIMIT_EXCEEDED]: z.boolean(),
  [LEDGER_FORM_FIELDS.OPENING_BALANCE]: z.string().optional(),
  [LEDGER_FORM_FIELDS.OPENING_BALANCE_TYPE]: z.enum(["Dr", "Cr"]),
  [LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED]: z.boolean(),
  [LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS]: z.array(costCenterAllocationRowSchema).optional(),
  [LEDGER_FORM_FIELDS.TAX_RATES]: z.array(taxRateRowSchema).optional(),
})
.merge(
  baseAddressSchema.extend({
    country: z.string().optional(),
    state: z.string().optional(),
    address: z.string().optional(),
    pincode: z.string().optional(),
  })
)
.merge(
  baseContactSchema.extend({
    contactPerson: z.string().optional(),
    mobileNumber: z
      .string()
      .regex(/^\d*$/, "Mobile number must contain only numbers")
      .optional(),
  })
)
.superRefine((data, ctx) => {
  const isCostCenterEnabled = data[LEDGER_FORM_FIELDS.IS_COST_CENTER_ENABLED];
  const openingBalanceStr = data[LEDGER_FORM_FIELDS.OPENING_BALANCE] || "0";
  const targetAmount = parseFloat(openingBalanceStr.replace(/[^0-9.-]+/g, "")) || 0;
  
  if (isCostCenterEnabled && targetAmount > 0) {
    const allocations = data[LEDGER_FORM_FIELDS.COST_CENTER_ALLOCATIONS] || [];
    const allocatedAmount = allocations.reduce((sum, row) => {
      if (isCostCenterRowEmpty(row)) return sum;
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
