import { z } from 'zod';
import { taxClassificationSchema, baseMasterSchema } from '@/utils/shared-schemas';

export const multiUnitSchema = z
  .object({
    unit: z.string().optional(),
    quantity: z.coerce.number().optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Completely blank phantom rows are uncommitted placeholders and must never produce validation errors
    const isBlankPhantom =
      data.isPhantom &&
      (!data.unit || data.unit.trim() === '') &&
      (!data.quantity || Number(data.quantity) === 0);

    if (isBlankPhantom) {
      return;
    }
    if (!data.unit || data.unit.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Unit is required',
        path: ['unit'],
      });
    }
    const qty = Number(data.quantity);
    if (isNaN(qty) || qty <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Quantity must be greater than 0',
        path: ['quantity'],
      });
    }
  });

export const standardRateSchema = z
  .object({
    fromDate: z.union([z.date(), z.string()]).nullable().optional(),
    toDate: z.union([z.date(), z.string()]).nullable().optional(),
    mrp: z.coerce.number().min(0, 'MRP must be positive').optional(),
    netRate: z.coerce.number().min(0, 'Net Rate must be positive').optional(),
    minSellingRate: z.coerce.number().min(0, 'Min Selling Rate must be positive').optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Phantom rows are uncommitted placeholder rows and must never produce validation errors
    if (data.isPhantom) {
      return;
    }
    const hasRate =
      (data.minSellingRate !== undefined && data.minSellingRate > 0) ||
      (data.mrp !== undefined && data.mrp > 0) ||
      (data.netRate !== undefined && data.netRate > 0);
    if (!hasRate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Min Selling Rate, MRP, or Net Rate must be specified',
        path: ['minSellingRate'],
      });
    }
  });

export const godownAllocationSchema = z
  .object({
    godown: z.string().optional(),
    godownId: z.string().optional(),
    batchNumber: z.string().optional(),
    mfgDate: z.union([z.date(), z.string()]).nullable().optional(),
    expiryDate: z.union([z.date(), z.string()]).nullable().optional(),
    quantity: z.coerce.number().min(0, 'Quantity must be positive').optional(),
    rate: z.coerce.number().min(0, 'Rate must be positive').optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Phantom rows are uncommitted placeholder rows and must never produce validation errors
    if (data.isPhantom) {
      return;
    }
    if (!data.godown || data.godown.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Godown is required',
        path: ['godown'],
      });
    }
    if (!data.quantity || Number(data.quantity) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Quantity must be greater than 0',
        path: ['quantity'],
      });
    }
    if (!data.rate || Number(data.rate) <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Rate must be greater than 0',
        path: ['rate'],
      });
    }
  });

export const stockItemSchema = baseMasterSchema
  .extend({
    categoryId: z.string().min(1, 'Category is required'),
    unit: z.string().min(1, 'Unit is required'),
    hsnSac: z.string().min(1, 'HSN/SAC is required'),
    partNumber: z.string().regex(/^\d*$/, 'Part Number must contain only numbers').optional(),

    maintainBatches: z.boolean().default(false),
    isBranchEnabled: z.boolean().default(false),

    enableMultiUnit: z.boolean(),
    multiUnits: z.array(multiUnitSchema).optional(),

    enableStandardRates: z.boolean(),
    standardRates: z.array(standardRateSchema).optional(),

    trackMfgDate: z.boolean().default(false),
    trackExpiryDate: z.boolean().default(false),
    openingQuantity: z.coerce.number().min(0, 'Opening quantity is required'),
    openingRate: z.coerce.number().min(0, 'Opening rate is required'),
    openingAmount: z.coerce.number().min(0, 'Opening amount is required'),
    enableGodownAllocation: z.boolean().optional(),
    godownAllocations: z.array(godownAllocationSchema).optional(),
  })
  .merge(taxClassificationSchema)
  .superRefine((data, ctx) => {
    if (data.enableMultiUnit) {
      const committedUnits = data.multiUnits?.filter((u) => !u.isPhantom && u.unit) || [];
      if (committedUnits.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one multi-unit conversion is required when enabled',
          path: ['multiUnits'],
        });
      }
    }
    if (data.enableStandardRates) {
      const committedRates =
        data.standardRates?.filter(
          (r) => !r.isPhantom && (Number(r.minSellingRate) > 0 || Number(r.mrp) > 0 || Number(r.netRate) > 0)
        ) || [];
      if (committedRates.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one standard rate is required when enabled',
          path: ['standardRates'],
        });
      }
    }
    if (data.enableGodownAllocation) {
      if (Number(data.openingQuantity) <= 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Opening quantity must be greater than 0 when godown allocation is enabled',
          path: ['openingQuantity'],
        });
      }

      const committedAllocations =
        data.godownAllocations?.filter(
          (r) =>
            !r.isPhantom &&
            Boolean(r.godown?.trim()) &&
            Number(r.quantity) > 0 &&
            Number(r.rate) > 0
        ) || [];

      if (committedAllocations.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one godown allocation is required when godown allocation is enabled',
          path: ['godownAllocations'],
        });
      }

      const totalAllocated = committedAllocations.reduce(
        (sum, r) => sum + (Number(r.quantity) || 0),
        0
      );

      if (Number(data.openingQuantity) > 0 && totalAllocated > Number(data.openingQuantity)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Total allocated quantity (${totalAllocated}) cannot exceed opening quantity (${data.openingQuantity})`,
          path: ['godownAllocations'],
        });
      }

      if (data.maintainBatches) {
        data.godownAllocations?.forEach((row, idx) => {
          if (row.isPhantom) return;
          const batchNumber = row.batchNumber ? String(row.batchNumber).trim() : '';
          if (!batchNumber) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Batch Number is required',
              path: ['godownAllocations', idx, 'batchNumber'],
            });
          } else if (!/^\d+$/.test(batchNumber)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Batch Number must contain only numbers',
              path: ['godownAllocations', idx, 'batchNumber'],
            });
          }
        });
      }

      if (data.trackMfgDate) {
        data.godownAllocations?.forEach((row, idx) => {
          if (row.isPhantom) return;
          const isValidMfg = Boolean(
            row.mfgDate && (typeof row.mfgDate !== 'string' || row.mfgDate.trim() !== '')
          );
          if (!isValidMfg) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Manufacturing Date is required',
              path: ['godownAllocations', idx, 'mfgDate'],
            });
          }
        });
      }

      if (data.trackExpiryDate) {
        data.godownAllocations?.forEach((row, idx) => {
          if (row.isPhantom) return;
          const isValidExpiry = Boolean(
            row.expiryDate && (typeof row.expiryDate !== 'string' || row.expiryDate.trim() !== '')
          );
          if (!isValidExpiry) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'Expiry Date is required',
              path: ['godownAllocations', idx, 'expiryDate'],
            });
          }
        });
      }

      if (data.trackMfgDate && data.trackExpiryDate) {
        data.godownAllocations?.forEach((row, idx) => {
          if (row.isPhantom) return;
          if (row.mfgDate && row.expiryDate) {
            const mfgTime = new Date(row.mfgDate).getTime();
            const expTime = new Date(row.expiryDate).getTime();
            if (!isNaN(mfgTime) && !isNaN(expTime) && expTime < mfgTime) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Expiry Date cannot be before Manufacturing Date',
                path: ['godownAllocations', idx, 'expiryDate'],
              });
            }
          }
        });
      }
    }
  });

export type StockItemFormValues = z.infer<typeof stockItemSchema>;
