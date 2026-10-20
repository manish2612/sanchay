import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type {
  CostCenterListItem,
  CostCenterDetail,
  CreateCostCenterRequest,
  UpdateCostCenterRequest,
} from '@/features/Masters/api/costCentersApi';

export const mockCostCenters: (CostCenterListItem & CostCenterDetail)[] = [
  {
    id: '01a129c4-e4e3-7078-9554-00ae249e7991',
    is_active: true,
    name: 'Primary Cost Centre',
    alias: 'PRIM',
    code: 'CC-000',
    display_order: 0,
    cost_category_name: 'Primary Cost Category',
    cost_category_id: '01918a20-8000-7b3f-b12a-456789abcdef',
    parent_name: null,
    parent_id: null,
    opening_balances: [],
    is_predefined: true,
  },
  {
    id: '01918a20-8000-7b3f-b12a-456789abcdef',
    is_active: true,
    name: 'Marketing Dept',
    alias: 'MKTG',
    code: 'CC-001',
    display_order: 1,
    cost_category_name: 'Marketing & Branding',
    cost_category_id: '01918a21-9000-7b3f-b12a-987654fedcba',
    parent_name: 'Executive',
    parent_id: null,
    opening_balances: [],
    is_predefined: false,
  },
  {
    id: '01918a20-8000-7b3f-b12a-456789abcdeg',
    is_active: true,
    name: 'Operations & Logistics',
    alias: 'OPS',
    code: 'CC-002',
    display_order: 2,
    cost_category_name: 'Corporate Administration',
    cost_category_id: '01918a23-b000-7b3f-b12a-aabbccddeeff',
    parent_name: null,
    parent_id: null,
    opening_balances: [],
    is_predefined: false,
  },
  {
    id: '01918a20-8000-7b3f-b12a-456789abcdeh',
    is_active: false,
    name: 'Legacy R&D Unit',
    alias: 'RND-OLD',
    code: 'CC-003',
    display_order: 3,
    cost_category_name: 'Research & Development',
    cost_category_id: '01918a22-a000-7b3f-b12a-112233445566',
    parent_name: null,
    parent_id: null,
    opening_balances: [],
    is_predefined: false,
  },
];

export const getCostCentersHandler = http.get(
  '*/api/v1/accounting/costcentres',
  async () => {
    if (!isMockEnabled('accounting', 'getCostCenters')) return;
    await delay(300);
    // Return only list item summary shape
    const listItems: CostCenterListItem[] = mockCostCenters.map((cc) => ({
      id: cc.id,
      name: cc.name,
      is_active: cc.is_active,
      display_order: cc.display_order,
      cost_category_name: cc.cost_category_name,
      is_predefined: cc.is_predefined,
    }));
    return HttpResponse.json(listItems);
  }
);

export const getCostCenterByIdHandler = http.get(
  '*/api/v1/accounting/costcentres/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getCostCenters')) return;
    await delay(300);
    const { id } = params;
    const center = mockCostCenters.find((c) => c.id === id);
    if (center) {
      return HttpResponse.json(center);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const createCostCenterHandler = http.post(
  '*/api/v1/accounting/costcentres',
  async ({ request }) => {
    if (!isMockEnabled('accounting', 'getCostCenters')) return;
    await delay(300);
    const body = (await request.json()) as CreateCostCenterRequest;
    const newCenter: CostCenterListItem & CostCenterDetail = {
      id: `mock-cc-${Date.now()}`,
      name: body.name || 'Untitled Cost Centre',
      alias: body.alias || null,
      code: body.code || `CC-00${mockCostCenters.length + 1}`,
      cost_category_id: body.cost_category_id,
      cost_category_name: 'Primary Cost Category',
      parent_name: null,
      parent_id: body.parent_id || null,
      opening_balances: body.opening_balances || [],
      is_active: true,
      display_order: mockCostCenters.length,
      is_predefined: false,
    };
    mockCostCenters.push(newCenter);
    return HttpResponse.json(newCenter, { status: 201 });
  }
);

export const updateCostCenterHandler = http.put(
  '*/api/v1/accounting/costcentres/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('accounting', 'getCostCenters')) return;
    await delay(300);
    const { id } = params;
    const body = (await request.json()) as UpdateCostCenterRequest;
    const index = mockCostCenters.findIndex((c) => c.id === id);

    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    mockCostCenters[index] = {
      ...mockCostCenters[index],
      name: body.name,
      alias: body.alias ?? mockCostCenters[index].alias,
      code: body.code ?? mockCostCenters[index].code,
      cost_category_id: body.cost_category_id,
      parent_id: body.parent_id ?? mockCostCenters[index].parent_id,
      opening_balances: body.opening_balances ?? mockCostCenters[index].opening_balances,
    };

    return HttpResponse.json(mockCostCenters[index]);
  }
);

export const deleteCostCenterHandler = http.delete(
  '*/api/v1/accounting/costcentres/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getCostCenters')) return;
    await delay(300);
    const { id } = params;
    const index = mockCostCenters.findIndex((c) => c.id === id);
    if (index === -1) {
      return new HttpResponse(null, { status: 404 });
    }
    mockCostCenters.splice(index, 1);
    return HttpResponse.json({ message: 'Cost Centre deleted successfully' });
  }
);
