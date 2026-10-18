import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const godownSchema = baseMasterSchema.extend({
  parentId: z.string().trim().min(1, 'Parent godown is required'),
});

export type GodownFormValues = z.infer<typeof godownSchema>;
