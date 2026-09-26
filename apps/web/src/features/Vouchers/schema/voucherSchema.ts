import { z } from 'zod';
import { VOUCHER_FIELDS } from '../constants/voucherFields';

const costCenterAllocationSchema = z.object({
  id: z.string(),
  costCategory: z.string(),
  costCenter: z.string(),
  amount: z.string(),
  isPhantom: z.boolean().optional(),
});

const ledgerEntrySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  amount: z.string().optional(),
  debitAmount: z.string().optional(),
  creditAmount: z.string().optional(),
  vatAmt: z.string().optional(),
  isPhantom: z.boolean().optional(),
  costCenterAllocations: z.array(costCenterAllocationSchema).optional(),
});

const itemEntrySchema = z.object({
  id: z.string(),
  item: z.string(),
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
});

export const voucherFormSchema = z.object({
  [VOUCHER_FIELDS.VOUCHER_DATE_AD]: z.date().optional(),
  [VOUCHER_FIELDS.VOUCHER_DATE_BS]: z.string().optional(),
  [VOUCHER_FIELDS.REF_DATE_AD]: z.date().optional(),
  [VOUCHER_FIELDS.REF_DATE_BS]: z.string().optional(),
  
  [VOUCHER_FIELDS.VOUCHER_TYPE_ID]: z.string().optional(),
  [VOUCHER_FIELDS.VOUCHER_NO]: z.string().optional(),
  [VOUCHER_FIELDS.REFERENCE_NO]: z.string().optional(),
  [VOUCHER_FIELDS.PARTY_ACCOUNT]: z.string().optional(),
  [VOUCHER_FIELDS.APPLY_TAX]: z.string().optional(),
  [VOUCHER_FIELDS.MODE]: z.string().optional(),
  [VOUCHER_FIELDS.PAYMENT_MODE]: z.string().optional(),
  [VOUCHER_FIELDS.SALES_AC]: z.string().optional(),
  [VOUCHER_FIELDS.NARRATION]: z.string().optional(),
  
  [VOUCHER_FIELDS.LEDGER_ENTRIES]: z.array(ledgerEntrySchema).optional(),
  [VOUCHER_FIELDS.ITEM_ENTRIES]: z.array(itemEntrySchema).optional(),
});

export type VoucherFormValues = z.infer<typeof voucherFormSchema>;
