import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const stockGroupSchema = baseMasterSchema.extend({
  localInterstateSales: z.string().optional(), exportSales: z.string().optional(), localInterstatePurchase: z.string().optional(), exportPurchase: z.string().optional()
});

export type StockGroupFormValues = z.infer<typeof stockGroupSchema>;
