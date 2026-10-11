import { z } from 'zod';
import { taxClassificationSchema, baseMasterSchema } from '@/utils/shared-schemas';

export const multiUnitSchema = z
  .object({
    unit: z.string().optional(),
    quantity: z.coerce.number().optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Phantom rows are uncommitted placeholder rows and must never produce validation errors
    if (data.isPhantom) {
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
    fromDate: z.date().optional(),
    mrp: z.coerce.number().min(0, 'MRP must be positive').optional(),
    netRate: z.coerce.number().min(0, 'Net Rate must be positive').optional(),
    rate: z.coerce.number().min(0, 'Rate must be positive').optional(),
    isPhantom: z.boolean().optional(),
  })
  .superRefine((data, ctx) => {
    // Phantom rows are uncommitted placeholder rows and must never produce validation errors
    if (data.isPhantom) {
      return;
    }
    const hasRate =
      (data.rate !== undefined && data.rate > 0) ||
      (data.mrp !== undefined && data.mrp > 0) ||
      (data.netRate !== undefined && data.netRate > 0);
    if (!hasRate) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Rate, MRP, or Net Rate must be specified',
        path: ['rate'],
      });
    }
  });

export const godownAllocationSchema = z
  .object({
    godown: z.string().optional(),
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
  });

export const stockItemSchema = baseMasterSchema
  .extend({
    categoryId: z.string().min(1, 'Category is required'),
    unit: z.string().min(1, 'Unit is required'),
    hsnSac: z.string().min(1, 'HSN/SAC is required'),

    enableMultiUnit: z.boolean(),
    multiUnits: z.array(multiUnitSchema).optional(),

    enableStandardRates: z.boolean(),
    standardRates: z.array(standardRateSchema).optional(),

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
          (r) => !r.isPhantom && (Number(r.rate) > 0 || Number(r.mrp) > 0 || Number(r.netRate) > 0)
        ) || [];
      if (committedRates.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'At least one standard rate is required when enabled',
          path: ['standardRates'],
        });
      }
    }
  });

export type StockItemFormValues = z.infer<typeof stockItemSchema>;
