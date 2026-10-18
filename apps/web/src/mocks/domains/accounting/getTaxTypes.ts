import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { GetTaxTypesResponse } from '@/features/Masters/types/taxGroup';

export const mockTaxTypes: GetTaxTypesResponse = [
  {
    code: 'GST18',
    id: '01918a20-8000-7b3f-b12a-456789abcdef',
    name: 'GST 18%',
    parent_name: 'Goods Service Tax',
  },
  {
    code: 'VAT13',
    id: '01a129c4-e532-73a9-ae18-8c29cce61b00',
    name: 'VAT 13%',
    parent_name: 'Value Added Tax',
  },
  {
    code: 'EXCISE5',
    id: '01a129c4-e532-73a9-ae18-8c29cce61b01',
    name: 'Excise Duty 5%',
    parent_name: 'Excise Duty',
  },
];

export const getTaxTypesHandler = http.get(
  '*/api/v1/accounting/taxtypes',
  async () => {
    if (!isMockEnabled('accounting', 'getTaxTypes')) return;
    await delay(300);
    return HttpResponse.json(mockTaxTypes);
  }
);
