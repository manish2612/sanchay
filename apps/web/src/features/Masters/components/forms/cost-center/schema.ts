import { z } from 'zod';
import { baseMasterSchema } from '@/utils/shared-schemas';

export const ledgerAllocationSchema = z.object({
  ledger: z.string().optional(),
  amount: z.coerce.number().optional(),
  isPhantom: z.boolean().optional(),
}).refine((row) => {
  // Allow empty phantom row
  if (row.isPhantom && (!row.ledger || row.ledger.trim() === '') && (!row.amount || row.amount === 0)) {
    return true;
  }
  // If not empty, ledger is required and amount must be positive
  return Boolean(row.ledger && row.ledger.trim() !== '') && (row.amount || 0) > 0;
}, {
  message: 'Ledger and positive amount are required',
  path: ['ledger'],
});

export const costCenterSchema = baseMasterSchema.extend({
  code: z.string().optional(),
  costCategoryId: z.string().min(1, 'Cost Category is required'),
  openingBalance: z.string().optional(), 
  openingBalanceType: z.enum(['Cr', 'Dr']).optional(),
  ledgerAllocations: z.array(ledgerAllocationSchema).optional()
}).refine((data) => {
  const openingAmtStr = typeof data.openingBalance === 'string' ? data.openingBalance : String(data.openingBalance || '');
  const openingAmount = Math.max(0, parseFloat(openingAmtStr.replace(/[^0-9.-]+/g, '')) || 0);
  
  if (openingAmount <= 0) return true; // No tally needed if no opening balance
  
  const allocs = data.ledgerAllocations || [];
  const totalAllocated = allocs.reduce((sum, row) => {
    const hasLedger = Boolean(row.ledger && typeof row.ledger === 'string' && row.ledger.trim() !== '');
    const amt = typeof row.amount === 'number' ? row.amount : parseFloat(String(row.amount || '0')) || 0;
    if (!hasLedger || amt <= 0) return sum;
    return sum + amt;
  }, 0);
  
  // Tally must match exactly
  return Math.abs(totalAllocated - openingAmount) < 0.001;
}, {
  message: "Total allocated ledger amount must equal the opening balance.",
  path: ['ledgerAllocations'],
});

export type CostCenterFormValues = z.infer<typeof costCenterSchema>;
