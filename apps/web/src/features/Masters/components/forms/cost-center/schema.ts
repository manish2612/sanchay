import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const costCenterSchema = baseMasterSchema.extend({
  openingBalance: z.string().optional(), openingBalanceType: z.enum(['Cr', 'Dr']).optional()
});

export type CostCenterFormValues = z.infer<typeof costCenterSchema>;
