/**
 * Tax Group and Tax Type API contracts & domain types.
 */

// ==========================================
// Tax Type Types (GET /accounting/taxtypes)
// ==========================================

export interface TaxType {
  id: string;
  name: string;
  code: string;
  parent_name?: string;
}

export type GetTaxTypesResponse = TaxType[];
export type GetTaxTypesRequest = void;

// ==========================================
// Tax Group Types (GET /accounting/taxgroups)
// ==========================================

export interface TaxGroupComponentResponse {
  taxgroup_component_name: string;
  taxgroup_component_scope: 'INTRA_STATE' | 'INTER_STATE' | 'ALL' | string;
  taxgroup_component_compute_method: 'PCT_BASE' | 'PCT_TAX' | 'FIXED_QTY' | string;
  taxgroup_component_rate: string;
  input_ledger_id: string;
  output_ledger_id: string;
  input_ledger_name: string;
  output_ledger_name: string;
}

export interface TaxGroupResponse {
  id: string;
  is_active: boolean;
  name: string;
  code: string;
  combined_rate: string | number;
  is_predefined?: boolean;
  tax_type_name: string;
  tax_type_id?: string;
  components: TaxGroupComponentResponse[];
}

export type GetTaxGroupsResponse = TaxGroupResponse[];
export type GetTaxGroupsRequest = void;

// ==========================================
// Tax Group Creation (POST /accounting/taxgroups)
// ==========================================

export interface CreateTaxGroupComponentRequest {
  component_name: string;
  compute_method: string;
  input_ledger_id: string;
  output_ledger_id: string;
  rate: number;
  scope: string;
  tax_group_id?: string;
}

export interface CreateTaxGroupRequest {
  code?: string;
  combined_rate: number;
  components: CreateTaxGroupComponentRequest[];
  is_predefined?: boolean;
  name: string;
  tax_type_id: string;
}

export type CreateTaxGroupResponse = TaxGroupResponse;

// ==========================================
// Tax Group Update & Delete
// ==========================================

export interface UpdateTaxGroupRequest {
  id: string;
  code?: string;
  combined_rate: number;
  components: CreateTaxGroupComponentRequest[];
  is_predefined?: boolean;
  name: string;
  tax_type_id: string;
}

export type UpdateTaxGroupResponse = TaxGroupResponse;

export interface DeleteTaxGroupResponse {
  message?: string;
}
