import { z } from 'zod';
import { baseMasterSchema, taxClassificationSchema } from '@/utils/shared-schemas';

export const stockGroupSchema = baseMasterSchema.merge(taxClassificationSchema);

export type StockGroupFormValues = z.infer<typeof stockGroupSchema>;
