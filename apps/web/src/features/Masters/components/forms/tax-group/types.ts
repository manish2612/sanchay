export type TaxComponentScope = 'INTRA_STATE' | 'INTER_STATE' | 'ALL';

export type TaxComponentComputeMethod = 'PCT_BASE' | 'PCT_TAX' | 'FIXED_QTY';

export interface TaxComponentRow {
  component_name: string;
  scope: TaxComponentScope;
  compute_method: TaxComponentComputeMethod;
  rate: number | string;
  input_ledger_id: string;
  output_ledger_id: string;
  isPhantom?: boolean;
}

export interface TaxGroupFormValues {
  code?: string;
  name: string;
  tax_type_id: string;
  combined_rate: number | string;
  components?: TaxComponentRow[];
}

export interface TaxGroupFormProps {
  onCancel: () => void;
  onSuccess?: () => void;
  onError?: (title: string, desc: string) => void;
}
