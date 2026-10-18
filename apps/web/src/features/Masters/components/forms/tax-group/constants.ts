import type { TaxComponentScope, TaxComponentComputeMethod } from './types';

export interface SelectOption<T = string> {
  label: string;
  value: T;
}

export const SCOPE_OPTIONS: SelectOption<TaxComponentScope>[] = [
  { label: 'Intra State', value: 'INTRA_STATE' },
  { label: 'Inter State', value: 'INTER_STATE' },
  { label: 'All', value: 'ALL' },
];

export const COMPUTE_METHOD_OPTIONS: SelectOption<TaxComponentComputeMethod>[] = [
  { label: 'PCT Base', value: 'PCT_BASE' },
  { label: 'PCT Tax', value: 'PCT_TAX' },
  { label: 'Fixed Quantity', value: 'FIXED_QTY' },
];
