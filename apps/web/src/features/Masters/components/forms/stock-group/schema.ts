import { z } from 'zod';
import { baseMasterSchema, taxClassificationSchema } from '@/utils/shared-schemas';

export const stockGroupSchema = baseMasterSchema
  .extend({
    parentId: z.string().trim().min(1, 'Parent group is required'),
  })
  .merge(taxClassificationSchema);

export type StockGroupFormValues = z.infer<typeof stockGroupSchema>;
