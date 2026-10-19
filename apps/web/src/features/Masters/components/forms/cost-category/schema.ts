import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const costCategorySchema = baseMasterSchema.extend({
  allocate_revenue: z.boolean(),
  allocate_non_revenue: z.boolean(),
});

export type CostCategoryFormValues = z.infer<typeof costCategorySchema>;
