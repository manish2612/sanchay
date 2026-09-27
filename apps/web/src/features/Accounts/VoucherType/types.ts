export interface VoucherType {
  id: string;
  name: string;
  category: string;
  is_active: boolean;
  apply_tax: string;
  apply_disc_bill: boolean;
  apply_disc_item: boolean;
  voucher_mode: string;
  posting_affects: string;
  is_predefined: boolean;
  [key: string]: any; // Catch-all for remaining fields since we only need id/name for now
}

export type GetVoucherTypesResponse = VoucherType[];
export type GetVoucherTypesRequest = void;
