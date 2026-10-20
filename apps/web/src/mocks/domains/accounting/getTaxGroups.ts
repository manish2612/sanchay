import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type {
  GetTaxGroupsResponse,
  TaxGroupResponse,
  UpdateTaxGroupRequest,
} from '@/features/Masters/types/taxGroup';

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
  {
    id: '01918a20-8000-7b3f-b12a-456789abcdef',
    is_active: true,
    name: 'GST 18%',
    code: 'GST18',
    combined_rate: '18',
    is_predefined: true,
    tax_type_name: 'Goods & Services Tax',
    components: [
      {
        taxgroup_component_name: 'CGST 9%',
        taxgroup_component_scope: 'INTRA_STATE',
        taxgroup_component_compute_method: 'PCT_BASE',
        taxgroup_component_rate: '9',
        input_ledger_id: '01a129c4-e522-7ac9-bf1c-b2d836751989',
        output_ledger_id: '01a129c4-e523-73b8-af61-bc1a7169ec1b',
        input_ledger_name: 'Input CGST',
        output_ledger_name: 'Output CGST',
      },
      {
        taxgroup_component_name: 'SGST 9%',
        taxgroup_component_scope: 'INTRA_STATE',
        taxgroup_component_compute_method: 'PCT_BASE',
        taxgroup_component_rate: '9',
        input_ledger_id: '01a129c4-e522-7ac9-bf1c-b2d836751990',
        output_ledger_id: '01a129c4-e523-73b8-af61-bc1a7169ec1c',
        input_ledger_name: 'Input SGST',
        output_ledger_name: 'Output SGST',
      },
    ],
  },
  {
    id: '01918a20-8000-7b3f-b12a-456789abcde0',
    is_active: false,
    name: 'Old Service Tax 12%',
    code: 'ST12',
    combined_rate: '12',
    is_predefined: false,
    tax_type_name: 'Service Tax',
    components: [
      {
        taxgroup_component_name: 'Service Tax',
        taxgroup_component_scope: 'ALL',
        taxgroup_component_compute_method: 'PCT_BASE',
        taxgroup_component_rate: '12',
        input_ledger_id: '01a129c4-e522-7ac9-bf1c-b2d836751991',
        output_ledger_id: '01a129c4-e523-73b8-af61-bc1a7169ec1d',
        input_ledger_name: 'Input Service Tax',
        output_ledger_name: 'Output Service Tax',
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

export const getTaxGroupByIdHandler = http.get(
  '*/api/v1/accounting/taxgroups/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getTaxGroups') && !isMockEnabled('accounting', 'getTaxGroupById')) return;
    await delay(250);
    const { id } = params;
    const group = mockTaxGroups.find((g) => g.id === id);
    if (group) {
      return HttpResponse.json(group);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const updateTaxGroupHandler = http.put(
  '*/api/v1/accounting/taxgroups/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('accounting', 'getTaxGroups') && !isMockEnabled('accounting', 'updateTaxGroup')) return;
    await delay(350);
    const { id } = params;
    const body = (await request.json()) as UpdateTaxGroupRequest;
    const index = mockTaxGroups.findIndex((g) => g.id === id);
    if (index !== -1) {
      const existing = mockTaxGroups[index];
      if (existing.is_predefined) {
        return HttpResponse.json(
          { message: 'Predefined system tax groups cannot be edited.' },
          { status: 400 }
        );
      }
      const updated: TaxGroupResponse = {
        ...existing,
        name: body.name ?? existing.name,
        code: body.code !== undefined ? body.code : existing.code,
        combined_rate: String(body.combined_rate ?? existing.combined_rate),
        components: (body.components || []).map((c) => ({
          taxgroup_component_name: c.component_name,
          taxgroup_component_scope: c.scope,
          taxgroup_component_compute_method: c.compute_method,
          taxgroup_component_rate: String(c.rate),
          input_ledger_id: c.input_ledger_id,
          output_ledger_id: c.output_ledger_id,
          input_ledger_name: 'Input Tax Ledger',
          output_ledger_name: 'Output Tax Ledger',
        })),
      };
      mockTaxGroups[index] = updated;
      return HttpResponse.json(updated);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const deleteTaxGroupHandler = http.delete(
  '*/api/v1/accounting/taxgroups/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getTaxGroups') && !isMockEnabled('accounting', 'deleteTaxGroup')) return;
    await delay(300);
    const { id } = params;
    const index = mockTaxGroups.findIndex((g) => g.id === id);
    if (index !== -1) {
      if (mockTaxGroups[index].is_predefined) {
        return HttpResponse.json(
          { message: 'Predefined system tax groups cannot be deleted.' },
          { status: 400 }
        );
      }
      mockTaxGroups.splice(index, 1);
      return HttpResponse.json({ message: 'Tax group deleted successfully' });
    }
    return new HttpResponse(null, { status: 404 });
  }
);
