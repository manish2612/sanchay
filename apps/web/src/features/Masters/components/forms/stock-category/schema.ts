import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const stockCategorySchema = baseMasterSchema;

export type StockCategoryFormValues = z.infer<typeof stockCategorySchema>;
