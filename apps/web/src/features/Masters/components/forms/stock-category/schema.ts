import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const stockCategorySchema = baseMasterSchema.extend({
  parentId: z.string().trim().optional(),
});

export type StockCategoryFormValues = z.infer<typeof stockCategorySchema>;
