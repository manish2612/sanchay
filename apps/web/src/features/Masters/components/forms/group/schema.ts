import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const groupSchema = baseMasterSchema;

export type GroupFormValues = z.infer<typeof groupSchema>;
