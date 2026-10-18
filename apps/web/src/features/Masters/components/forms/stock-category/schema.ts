import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const stockCategorySchema = baseMasterSchema.extend({
  parentId: z.string().trim().min(1, 'Parent category is required'),
});

export type StockCategoryFormValues = z.infer<typeof stockCategorySchema>;
