import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const groupSchema = baseMasterSchema.extend({
  parentId: z.string().trim().min(1, 'Parent group is required'),
});

export type GroupFormValues = z.infer<typeof groupSchema>;
