import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const unitOfMeasureSchema = baseMasterSchema.extend({
  symbol: z
    .string()
    .trim()
    .min(1, 'Symbol is required')
    .max(10, 'Symbol cannot exceed 10 characters'),
  decimalPlaces: z.number().min(0).max(5).optional(),
  uqcCode: z.string().optional(),
});

export type UnitOfMeasureFormValues = z.infer<typeof unitOfMeasureSchema>;
