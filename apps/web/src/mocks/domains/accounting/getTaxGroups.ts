import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { GetTaxGroupsResponse } from '@/features/Masters/types/taxGroup';

export const mockTaxGroups: GetTaxGroupsResponse = [
  {
    id: '01a129c4-e532-73a9-ae18-8c29cce61b00',
    is_active: true,
    name: 'VAT @ 13%',
    code: 'VAT13',
    combined_rate: '13',
    is_predefined: false,
    tax_type_name: 'Value Added Tax',
    components: [
      {
        taxgroup_component_name: 'VAT @ 13%',
        taxgroup_component_scope: 'ALL',
        taxgroup_component_compute_method: 'PCT_BASE',
        taxgroup_component_rate: '13',
        input_ledger_id: '01a129c4-e522-7ac9-bf1c-b2d836751989',
        output_ledger_id: '01a129c4-e523-73b8-af61-bc1a7169ec1b',
        input_ledger_name: 'Input VAT @ 13%',
        output_ledger_name: 'Output VAT @ 13%',
      },
    ],
  },
];

export const getTaxGroupsHandler = http.get(
  '*/api/v1/accounting/taxgroups',
  async () => {
    if (!isMockEnabled('accounting', 'getTaxGroups')) return;
    await delay(300);
    return HttpResponse.json(mockTaxGroups);
  }
);
