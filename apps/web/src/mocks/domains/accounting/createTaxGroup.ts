import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type {
  CreateTaxGroupRequest,
  CreateTaxGroupResponse,
} from '@/features/Masters/types/taxGroup';

export const createTaxGroupHandler = http.post(
  '*/api/v1/accounting/taxgroups',
  async ({ request }) => {
    if (!isMockEnabled('accounting', 'createTaxGroup')) return;
    await delay(400);

    const body = (await request.json()) as CreateTaxGroupRequest;

    const response: CreateTaxGroupResponse = {
      id: `01a129c4-${Date.now().toString(16)}`,
      is_active: true,
      name: body.name,
      code: body.code || '',
      combined_rate: String(body.combined_rate),
      is_predefined: Boolean(body.is_predefined),
      tax_type_name: 'Value Added Tax',
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

    return HttpResponse.json(response, { status: 201 });
  }
);
