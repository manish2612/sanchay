import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { GetVoucherTypesResponse } from '@/features/Accounts/VoucherType/types';

// Storing partial mock data here to keep it clean, but could paste the full JSON.
const mockVoucherTypes: GetVoucherTypesResponse = [
  { id: "01a0dcc9-8bce-71b2-bbb9-fda9803eb6e0", name: "Receipt", category: "RCPT", is_active: true, apply_tax: "", apply_disc_bill: false, apply_disc_item: false, voucher_mode: "ACC", posting: "A", is_predefined: true },
  { id: "01a0dcc9-8bce-71b3-a0bd-6a58f0748742", name: "Payment", category: "PYMT", is_active: true, apply_tax: "", apply_disc_bill: false, apply_disc_item: false, voucher_mode: "ACC", posting: "A", is_predefined: true },
  { id: "01a0dcc9-8bce-71b4-b085-65c234cdf1ec", name: "Contra", category: "CNTR", is_active: true, apply_tax: "", apply_disc_bill: false, apply_disc_item: false, voucher_mode: "ACC", posting: "A", is_predefined: true },
  { id: "01a0dcc9-8bce-71b5-be7c-2f63a34a25a9", name: "Journal", category: "JRNL", is_active: true, apply_tax: "", apply_disc_bill: false, apply_disc_item: false, voucher_mode: "ACC", posting: "A", is_predefined: true },
  { id: "01a0dcc9-8bce-71b6-9840-dcefdc4bdc0e", name: "Sales", category: "SL", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "IA", is_predefined: true },
  { id: "01a0dcc9-8bce-71b7-b533-391e70e11cc3", name: "Purchase", category: "PU", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "IA", is_predefined: true },
  { id: "01a0dcc9-8bce-71b8-9b7f-cf555d8536a8", name: "Credit Note", category: "CN", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "IA", is_predefined: true },
  { id: "01a0dcc9-8bce-71b9-9ab0-abb7f6072dbe", name: "Debit Note", category: "DN", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "IA", is_predefined: true },
  { id: "01a0dcc9-8bce-71ba-9c93-0b50f3ce4b2b", name: "Stock Journal", category: "SJCP", is_active: true, apply_tax: "", apply_disc_bill: false, apply_disc_item: false, voucher_mode: "INV", posting: "I", is_predefined: true },
  { id: "01a0dcc9-8bce-71bb-9f0d-45108bc05e54", name: "Sales Order", category: "SO", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "I", is_predefined: true },
  { id: "01a0dcc9-8bce-71bc-9b06-35961ef2aabc", name: "Purchase Order", category: "PO", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "I", is_predefined: true },
  { id: "01a0dcc9-8be5-73e9-8a92-a28fbd7d896e", name: "Quotation", category: "QUOT", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "I", is_predefined: true },
  { id: "01a0dcc9-8be5-73ea-98c8-1e74be1262d3", name: "Purchase Indent", category: "PI", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "I", is_predefined: true },
  { id: "01a0dcc9-8be5-73eb-8398-2f7d5181a42d", name: "Delivery Note", category: "DLNT", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "I", is_predefined: true },
  { id: "01a0dcc9-8be5-73ec-aed9-1c457bea26cf", name: "Receipt Note", category: "RCNT", is_active: true, apply_tax: "B", apply_disc_bill: true, apply_disc_item: false, voucher_mode: "INV", posting: "I", is_predefined: true }
];

export const getVoucherTypesHandler = http.get<never, never, GetVoucherTypesResponse>(
  '*/api/v1/accounting/vouchertypes',
  async () => {
    if (!isMockEnabled('accounting', 'getVoucherTypes')) return;

    await delay(800);

    return HttpResponse.json(mockVoucherTypes);
  }
);
