import { z } from "zod";
import { LEDGER_FORM_FIELDS } from "./constants";
import { baseAddressSchema, baseContactSchema } from "../../../../../utils/shared-schemas";

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
})
.merge(baseAddressSchema)
.merge(baseContactSchema);

export type LedgerFormValues = z.infer<typeof ledgerFormSchema>;
