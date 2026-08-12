import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const godownSchema = baseMasterSchema;

export type GodownFormValues = z.infer<typeof godownSchema>;
