import { z } from 'zod';
import type { CostCenterAllocationRow } from './columns';

export const isCostCenterRowEmpty = (row?: unknown): boolean => {
  const data = (
    row && typeof row === 'object' && 'original' in row
      ? (row as { original: unknown }).original
      : row
  ) as Partial<CostCenterAllocationRow> | undefined;

  if (!data) return true;
  const hasCategory = Boolean(
    (data.costCategory && String(data.costCategory).trim() !== '') ||
    (data.costCategoryId && String(data.costCategoryId).trim() !== '')
  );
  const hasCenter = Boolean(
    (data.costCenter && String(data.costCenter).trim() !== '') ||
    (data.costCenterId && String(data.costCenterId).trim() !== '')
  );
  const amtStr = typeof data.amount === 'string' ? data.amount.trim() : String(data.amount ?? '');
  const numAmt = parseFloat(amtStr.replace(/[^0-9.-]+/g, '')) || 0;
  const hasAmount = amtStr !== '' && numAmt !== 0;

  return !hasCategory && !hasCenter && !hasAmount;
};

export const costCenterAllocationRowSchema = z
  .object({
    id: z.string(),
    costCategoryId: z.string().optional(),
    costCategory: z.string().optional(),
    costCenterId: z.string().optional(),
    costCenter: z.string().optional(),
    amount: z.union([z.string(), z.number()]).optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((row, ctx) => {
    // 1. Pristine untouched phantom rows are completely valid and ignored
    if (row.isPhantom && isCostCenterRowEmpty(row)) {
      return;
    }

    // 2. Dirty/uncommitted phantom row guard: MUST block progression
    if (row.isPhantom) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          'Row has uncommitted changes. Press Enter or click Check to commit, or discard this row.',
        path: ['costCategory'],
      });
    }

    // 3. Mandatory field validations for touched or committed rows
    if (!row.costCategory || String(row.costCategory).trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cost Category is required',
        path: ['costCategory'],
      });
    }

    if (!row.costCenter || String(row.costCenter).trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Cost Centre is required',
        path: ['costCenter'],
      });
    }

    const amtStr = typeof row.amount === 'string' ? row.amount.trim() : String(row.amount ?? '');
    const numAmt = parseFloat(amtStr.replace(/[^0-9.-]+/g, '')) || 0;
    if (isNaN(numAmt) || numAmt <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Amount must be greater than 0',
        path: ['amount'],
      });
    }
  });
