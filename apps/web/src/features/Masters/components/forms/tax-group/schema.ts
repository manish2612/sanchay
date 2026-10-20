import { z } from 'zod';
import type { TaxComponentRow, TaxGroupFormValues } from './types';

export const taxComponentRowSchema = z
  .object({
    component_name: z.string().optional(),
    scope: z
      .enum(['INTRA_STATE', 'INTER_STATE', 'ALL'], {
        message: 'Scope is required',
      })
      .optional(),
    compute_method: z
      .enum(['PCT_BASE', 'PCT_TAX', 'FIXED_QTY'], {
        message: 'Compute Method is required',
      })
      .optional(),
    rate: z.union([z.number(), z.string()]).optional(),
    input_ledger_id: z.string().optional(),
    output_ledger_id: z.string().optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Uncommitted phantom rows are placeholders and must not produce validation errors
    if (data.isPhantom) {
      return;
    }

    if (!data.component_name || data.component_name.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Component Name is required',
        path: ['component_name'],
      });
    }

    if (!data.scope) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Scope is required',
        path: ['scope'],
      });
    }

    if (!data.compute_method) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Compute Method is required',
        path: ['compute_method'],
      });
    }

    const rateNum =
      typeof data.rate === 'number' ? data.rate : parseFloat(String(data.rate || '0'));
    if (isNaN(rateNum) || rateNum < 1 || rateNum > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Rate must be between 1 and 100',
        path: ['rate'],
      });
    }

    if (!data.input_ledger_id || data.input_ledger_id.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Input Tax Ledger is required',
        path: ['input_ledger_id'],
      });
    }

    if (!data.output_ledger_id || data.output_ledger_id.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Output Tax Ledger is required',
        path: ['output_ledger_id'],
      });
    }
  });

export const taxGroupSchema = z
  .object({
    code: z.string().optional(),
    name: z.string().min(1, 'Name is required').max(100, 'Name must be 100 characters or less'),
    tax_type_id: z.string().min(1, 'Tax Type is required'),
    combined_rate: z.coerce
      .number()
      .min(0.0001, 'Combined Rate is required and must be greater than 0')
      .max(100, 'Cannot exceed 100'),
    components: z.array(taxComponentRowSchema).optional(),
  })
  .refine(
    (data) => {
      // Must have at least one committed tax component
      const activeComponents = (data.components || []).filter((c) => !c.isPhantom);
      return activeComponents.length > 0;
    },
    {
      message: 'At least one tax component is required',
      path: ['components'],
    },
  );

export type { TaxComponentRow, TaxGroupFormValues };
