import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const costCategorySchema = baseMasterSchema;

export type CostCategoryFormValues = z.infer<typeof costCategorySchema>;
