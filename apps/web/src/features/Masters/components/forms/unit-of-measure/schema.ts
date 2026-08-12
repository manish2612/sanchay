import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const unitOfMeasureSchema = baseMasterSchema.extend({
  symbol: z.string().max(10).optional(), decimalPlaces: z.number().min(0).max(5).optional()
});

export type UnitOfMeasureFormValues = z.infer<typeof unitOfMeasureSchema>;
