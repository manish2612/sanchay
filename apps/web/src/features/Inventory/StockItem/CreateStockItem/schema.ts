import { z } from 'zod';
import { taxClassificationSchema, baseMasterSchema } from '@/utils/shared-schemas';

export const multiUnitSchema = z.object({
  unit: z.string().min(1, 'Unit is required'),
  quantity: z.coerce.number().min(0, 'Quantity must be positive'),
  isPhantom: z.boolean().optional(),
});

export const standardRateSchema = z.object({
  fromDate: z.date(),
  mrp: z.coerce.number().min(0, 'MRP must be positive'),
  netRate: z.coerce.number().min(0, 'Net Rate must be positive'),
  rate: z.coerce.number().min(0, 'Rate must be positive'),
  isPhantom: z.boolean().optional(),
});

export const stockItemSchema = baseMasterSchema.extend({
  categoryId: z.string().min(1, 'Category is required'),
  unit: z.coerce.number().min(0, 'Unit is required'),
  hsnSac: z.string().min(1, 'HSN/SAC is required'),
  
  enableMultiUnit: z.boolean(),
  multiUnits: z.array(multiUnitSchema).optional(),
  
  enableStandardRates: z.boolean(),
  standardRates: z.array(standardRateSchema).optional(),
  
  openingQuantity: z.coerce.number().min(0, 'Opening quantity is required'),
  openingRate: z.coerce.number().min(0, 'Opening rate is required'),
  openingAmount: z.coerce.number().min(0, 'Opening amount is required'),
}).merge(taxClassificationSchema);

export type StockItemFormValues = z.infer<typeof stockItemSchema>;
