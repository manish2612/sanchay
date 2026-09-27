import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';

export const mockNextVoucherNumber = {
  "voucher_type_id": "01a0ddd8-39e1-799c-9b99-00d6dedd6fbf",
  "voucher_date": "2026-09-25",
  "next_voucher_number": "001",
  "sequence_index": 1,
  "numbering_type": "AUTO",
  "reset_on": "YEARLY",
  "prefix": "",
  "suffix": ""
};

export const getNextVoucherNumberHandler = http.get(
  '*accounting/vouchers/next-number',
  async ({ request }) => {
    if (!isMockEnabled('accounting', 'getNextVoucherNumber')) return;
    await delay(300);
    
    const url = new URL(request.url);
    const voucherTypeId = url.searchParams.get('voucher_type_id');
    const voucherDate = url.searchParams.get('voucher_date');

    return HttpResponse.json({
      ...mockNextVoucherNumber,
      voucher_type_id: voucherTypeId || mockNextVoucherNumber.voucher_type_id,
      voucher_date: voucherDate || mockNextVoucherNumber.voucher_date,
    });
  }
);
