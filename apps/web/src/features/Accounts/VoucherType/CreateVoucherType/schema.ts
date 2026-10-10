import { z } from 'zod';
import { VOUCHER_TYPE_FIELDS } from './constants';

const numberingRowSchema = z.object({
  numbering_type: z.string().min(1, 'Type is required'),
  effective_from: z.union([z.string().min(1, 'Effective from date is required'), z.date()]),
  reset_on: z.string().min(1, 'Reset frequency is required'),
  prefix: z.string().max(20, 'Prefix cannot exceed 20 characters').optional(),
  starting_number: z.coerce.number().min(1, 'Starting number must be at least 1'),
  suffix: z.string().max(20, 'Suffix cannot exceed 20 characters').optional(),
  prefill_padding: z.preprocess(
    (val) => (val === "" ? undefined : val), 
    z.coerce.number().min(1, 'Prefill width must be at least 1').max(10, 'Width cannot exceed 10').optional()
  ),
});

export const voucherTypeSchema = z.object({
  // Step 1
  [VOUCHER_TYPE_FIELDS.NAME]: z.string().min(1, 'Name is required'),
  [VOUCHER_TYPE_FIELDS.PARENT]: z.string().min(1, 'Parent is required'),
  [VOUCHER_TYPE_FIELDS.DEFAULT_VIEWING_MODE]: z.string().optional(),
  [VOUCHER_TYPE_FIELDS.SET_AS_DEFAULT]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.DECLARATION]: z.string().optional(),
  [VOUCHER_TYPE_FIELDS.APPLY_TAX]: z.string().optional(),

  // Step 2
  [VOUCHER_TYPE_FIELDS.VOUCHER_NUMBERING]: z.preprocess(
    (val) => {
      if (!Array.isArray(val)) return val;
      return val.filter((row: any) => {
        // Always validate committed rows
        if (!row.isPhantom) return true;
        
        // For phantom rows, only validate them if the user has started typing
        const isPristine = 
          !row.numbering_type && 
          !row.effective_from && 
          !row.reset_on && 
          !row.prefix && 
          !row.suffix && 
          (row.starting_number === 1 || !row.starting_number) && 
          !row.prefill_padding;
          
        return !isPristine; // Drop it if it's pristine, keep it for validation if it's dirty
      });
    },
    z.array(numberingRowSchema)
  ).default([]),

  // Step 3
  [VOUCHER_TYPE_FIELDS.CASH_LEDGER]: z.string().optional(),
  [VOUCHER_TYPE_FIELDS.BANK_LEDGER]: z.string().optional(),
  [VOUCHER_TYPE_FIELDS.SALES_PURCHASE_LEDGER]: z.string().optional(),
  [VOUCHER_TYPE_FIELDS.EXPORT_IMPORT_LEDGER]: z.string().optional(),
  [VOUCHER_TYPE_FIELDS.DISCOUNT_LEDGER]: z.string().optional(),
  [VOUCHER_TYPE_FIELDS.ROUNDING_OFF_LEDGER]: z.string().optional(),

  // Step 4
  [VOUCHER_TYPE_FIELDS.EXCISE_DUTY_APPLICABLE]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.DISCOUNT_AT_BILL_LEVEL]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.DISCOUNT_AT_ITEM_LEVEL]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_ITEM]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.ALLOW_ZERO_VALUE_LEDGER]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.USE_FOR_POS]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.PRINT_CONFIGURABLE]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.PRINT_AFTER_SAVE]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.NEW_MODE_AFTER_SAVE]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.COL_FREE_QTY]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.COL_ALT_QTY]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.COL_RATE]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.COL_NET_RATE]: z.boolean().default(false),
  [VOUCHER_TYPE_FIELDS.COL_GROSS_AMOUNT]: z.boolean().default(false),
});

export type VoucherTypeFormValues = z.infer<typeof voucherTypeSchema>;
