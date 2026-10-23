import { z } from 'zod';
import type { TaxRateRow } from './types';

export const isTaxRateRowEmpty = (row: unknown): boolean => {
  const data = (
    row && typeof row === 'object' && 'original' in row
      ? (row as { original: unknown }).original
      : row
  ) as Partial<TaxRateRow> | undefined;
  if (!data) return true;
  const hasEffective = Boolean(
    data.effective_from && String(data.effective_from).trim() !== ''
  );
  const hasTaxGroup = Boolean(
    data.tax_group_id && String(data.tax_group_id).trim() !== ''
  );
  const hasExciseGroup = Boolean(
    data.excise_tax_group_id && String(data.excise_tax_group_id).trim() !== ''
  );
  const hasRate = Boolean(
    data.tax_rate !== '' &&
      data.tax_rate !== undefined &&
      data.tax_rate !== null &&
      data.tax_rate !== 0 &&
      data.tax_rate !== '0' &&
      data.tax_rate !== '0.00'
  );
  return !hasEffective && !hasTaxGroup && !hasExciseGroup && !hasRate;
};

export const taxRateRowSchema = z
  .object({
    id: z.string(),
    effective_from: z.union([z.string(), z.date()]).optional(),
    effective_to: z.union([z.string(), z.date()]).optional(),
    tax_group_id: z.string().optional(),
    excise_tax_group_id: z.string().optional(),
    applicability: z.enum(['GOODS', 'SERVICES', 'BOTH']).optional(),
    tax_rate: z.union([z.number(), z.string()]).optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((row, ctx) => {
    // 1. Pristine untouched phantom rows are completely ignored and valid
    if (row.isPhantom && isTaxRateRowEmpty(row)) {
      return;
    }

    // 2. If row is a phantom row but not empty, it has uncommitted changes!
    if (row.isPhantom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Row has uncommitted changes. Press Enter or click Check to commit, or discard this row.',
        path: ['tax_group_id'],
      });
    }

    // 3. Mandatory fields for touched or committed row
    if (!row.effective_from || String(row.effective_from).trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Effective date is required',
        path: ['effective_from'],
      });
    }

    if (!row.tax_group_id || String(row.tax_group_id).trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Tax group is required',
        path: ['tax_group_id'],
      });
    }
  });
