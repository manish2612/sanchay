import { z } from 'zod';
import { VOUCHER_TYPE_FIELDS } from './constants';

const numberingRowSchema = z.object({
  type: z.string().min(1, 'Required'),
  fromDate: z.union([z.string().min(1, 'Required'), z.date()]),
  reset: z.string().min(1, 'Required'),
  prefix: z.string().optional(),
  startingNo: z.coerce.number().min(1, 'Must be at least 1'),
  suffix: z.string().optional(),
  prefillWidth: z.coerce.number().min(1, 'Must be at least 1').optional(),
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
          !row.type && 
          !row.fromDate && 
          !row.reset && 
          !row.prefix && 
          !row.suffix && 
          (row.startingNo === 1 || !row.startingNo) && 
          !row.prefillWidth;
          
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
