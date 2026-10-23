import type { FieldValues, UseFormReturn } from 'react-hook-form';

export interface TaxRateRow {
  id: string;
  effective_from: string;
  effective_to?: string;
  tax_group_id: string;
  excise_tax_group_id?: string;
  applicability: 'GOODS' | 'SERVICES' | 'BOTH';
  tax_rate: number | string;
  isPhantom?: boolean;
}

export interface TaxRatesTableProps<TFormValues extends FieldValues = FieldValues> {
  form: UseFormReturn<TFormValues>;
  name?: string;
  className?: string;
}
