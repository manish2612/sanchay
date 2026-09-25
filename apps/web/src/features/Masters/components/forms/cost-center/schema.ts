import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const ledgerAllocationSchema = z.object({
  ledger: z.string().min(1, 'Ledger is required'),
  amount: z.coerce.number().min(0, 'Amount must be positive'),
  isPhantom: z.boolean().optional(),
});

export const costCenterSchema = baseMasterSchema.extend({
  openingBalance: z.string().optional(), 
  openingBalanceType: z.enum(['Cr', 'Dr']).optional(),
  ledgerAllocations: z.array(ledgerAllocationSchema).optional()
}).refine((data) => {
  const openingAmtStr = typeof data.openingBalance === 'string' ? data.openingBalance : String(data.openingBalance || '');
  const openingAmount = parseFloat(openingAmtStr.replace(/[^0-9.-]+/g, '')) || 0;
  
  if (openingAmount <= 0) return true; // No tally needed if no opening balance
  
  const allocs = data.ledgerAllocations || [];
  const totalAllocated = allocs.reduce((sum, row) => {
    if (row.isPhantom) return sum;
    return sum + (row.amount || 0);
  }, 0);
  
  // Tally must match exactly
  return Math.abs(totalAllocated - openingAmount) < 0.001;
}, {
  message: "Total allocated ledger amount must equal the opening balance.",
  path: ['ledgerAllocations'],
});

export type CostCenterFormValues = z.infer<typeof costCenterSchema>;
