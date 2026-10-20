import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { StockGroupItem } from '@/features/Masters/api/stockGroupsApi';

export let mockStockGroups: StockGroupItem[] = [
  {
    id: '01918b01-1000-7b3f-b12a-111111111111',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Raw Materials',
    alias: 'RAW',
    code: 'SG-RAW-01',
    parent_id: null,
    parent_name: null,
    is_active: true,
    is_taxable: true,
    is_predefined: true,
    global_purchase_ledger_id: 'ledger-raw-global-pur',
    global_sales_ledger_id: null,
    local_purchase_ledger_id: 'ledger-raw-local-pur',
    local_sales_ledger_id: null,
    created_at: '2026-09-26T18:57:10.421555+05:45',
    updated_at: '2026-09-26T18:57:10.421555+05:45',
  },
  {
    id: '01918b02-2000-7b3f-b12a-222222222222',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Finished Goods',
    alias: 'FG',
    code: 'SG-FG-01',
    parent_id: null,
    parent_name: null,
    is_active: true,
    is_taxable: true,
    is_predefined: false,
    global_purchase_ledger_id: null,
    global_sales_ledger_id: 'ledger-fg-global-sale',
    local_purchase_ledger_id: null,
    local_sales_ledger_id: 'ledger-fg-local-sale',
    created_at: '2026-09-26T18:57:10.422169+05:45',
    updated_at: '2026-09-26T18:57:10.422169+05:45',
  },
  {
    id: '01918b03-3000-7b3f-b12a-333333333333',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Packing Materials',
    alias: 'PKG',
    code: 'SG-PKG-01',
    parent_id: null,
    parent_name: null,
    is_active: true,
    is_taxable: true,
    is_predefined: false,
    global_purchase_ledger_id: 'ledger-pkg-global-pur',
    global_sales_ledger_id: null,
    local_purchase_ledger_id: 'ledger-pkg-local-pur',
    local_sales_ledger_id: null,
    created_at: '2026-09-26T18:57:10.423000+05:45',
    updated_at: '2026-09-26T18:57:10.423000+05:45',
  },
  {
    id: '01918b04-4000-7b3f-b12a-444444444444',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Electronic Components',
    alias: 'ELEC',
    code: 'SG-RAW-ELEC',
    parent_id: '01918b01-1000-7b3f-b12a-111111111111',
    parent_name: 'Raw Materials',
    is_active: true,
    is_taxable: true,
    is_predefined: false,
    global_purchase_ledger_id: 'ledger-elec-global-pur',
    global_sales_ledger_id: null,
    local_purchase_ledger_id: 'ledger-elec-local-pur',
    local_sales_ledger_id: null,
    created_at: '2026-09-27T10:15:00.000000+05:45',
    updated_at: '2026-09-27T10:15:00.000000+05:45',
  },
  {
    id: '01918b05-5000-7b3f-b12a-555555555555',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Metals & Alloys',
    alias: 'METAL',
    code: 'SG-RAW-MTL',
    parent_id: '01918b01-1000-7b3f-b12a-111111111111',
    parent_name: 'Raw Materials',
    is_active: true,
    is_taxable: true,
    is_predefined: false,
    global_purchase_ledger_id: 'ledger-mtl-global-pur',
    global_sales_ledger_id: null,
    local_purchase_ledger_id: 'ledger-mtl-local-pur',
    local_sales_ledger_id: null,
    created_at: '2026-09-27T10:20:00.000000+05:45',
    updated_at: '2026-09-27T10:20:00.000000+05:45',
  },
  {
    id: '01918b06-6000-7b3f-b12a-666666666666',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Consumer Electronics',
    alias: 'CONS-ELEC',
    code: 'SG-FG-CE',
    parent_id: '01918b02-2000-7b3f-b12a-222222222222',
    parent_name: 'Finished Goods',
    is_active: true,
    is_taxable: true,
    is_predefined: false,
    global_purchase_ledger_id: null,
    global_sales_ledger_id: 'ledger-ce-global-sale',
    local_purchase_ledger_id: null,
    local_sales_ledger_id: 'ledger-ce-local-sale',
    created_at: '2026-09-27T11:00:00.000000+05:45',
    updated_at: '2026-09-27T11:00:00.000000+05:45',
  },
  {
    id: '01918b07-7000-7b3f-b12a-777777777777',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Corrugated Boxes',
    alias: 'BOXES',
    code: 'SG-PKG-BOX',
    parent_id: '01918b03-3000-7b3f-b12a-333333333333',
    parent_name: 'Packing Materials',
    is_active: true,
    is_taxable: true,
    is_predefined: false,
    global_purchase_ledger_id: 'ledger-box-global-pur',
    global_sales_ledger_id: null,
    local_purchase_ledger_id: 'ledger-box-local-pur',
    local_sales_ledger_id: null,
    created_at: '2026-09-27T11:30:00.000000+05:45',
    updated_at: '2026-09-27T11:30:00.000000+05:45',
  },
];

export const getStockGroupsHandler = http.get(
  '*/inventory/stockgroups',
  async () => {
    if (!isMockEnabled('inventory', 'getStockGroups')) return;
    await delay(300);
    return HttpResponse.json(mockStockGroups);
  }
);

export const getStockGroupByIdHandler = http.get(
  '*/inventory/stockgroups/:id',
  async ({ params }) => {
    if (!isMockEnabled('inventory', 'getStockGroups')) return;
    await delay(300);
    const { id } = params;
    const group = mockStockGroups.find((g) => g.id === id);
    if (group) {
      return HttpResponse.json(group);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const createStockGroupHandler = http.post(
  '*/inventory/stockgroups',
  async ({ request }) => {
    if (!isMockEnabled('inventory', 'getStockGroups')) return;
    await delay(300);
    const body = (await request.json()) as any;
    const parentGroup = body.parent_id
      ? mockStockGroups.find((g) => g.id === body.parent_id)
      : null;
    const newGroup: StockGroupItem = {
      id: `mock-sg-${Date.now()}`,
      company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
      name: body.name || 'Untitled Stock Group',
      alias: body.alias || null,
      code: body.code || `SG-${mockStockGroups.length + 1}`,
      parent_id: body.parent_id || null,
      parent_name: parentGroup?.name || null,
      global_purchase_ledger_id: body.global_purchase_ledger_id || null,
      global_sales_ledger_id: body.global_sales_ledger_id || null,
      local_purchase_ledger_id: body.local_purchase_ledger_id || null,
      local_sales_ledger_id: body.local_sales_ledger_id || null,
      is_taxable: true,
      is_active: true,
      is_predefined: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    mockStockGroups.push(newGroup);
    return HttpResponse.json(newGroup, { status: 201 });
  }
);

export const updateStockGroupHandler = http.put(
  '*/inventory/stockgroups/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('inventory', 'getStockGroups')) return;
    await delay(300);
    const { id } = params;
    const body = (await request.json()) as any;
    const index = mockStockGroups.findIndex((g) => g.id === id);
    if (index !== -1) {
      const nextParentId =
        body.parent_id !== undefined ? body.parent_id : mockStockGroups[index].parent_id;
      const parentGroup = nextParentId
        ? mockStockGroups.find((g) => g.id === nextParentId)
        : null;

      mockStockGroups[index] = {
        ...mockStockGroups[index],
        name: body.name ?? mockStockGroups[index].name,
        alias: body.alias !== undefined ? body.alias : mockStockGroups[index].alias,
        code: body.code !== undefined ? body.code : mockStockGroups[index].code,
        parent_id: nextParentId,
        parent_name: parentGroup?.name || null,
        global_purchase_ledger_id:
          body.global_purchase_ledger_id !== undefined
            ? body.global_purchase_ledger_id
            : mockStockGroups[index].global_purchase_ledger_id,
        global_sales_ledger_id:
          body.global_sales_ledger_id !== undefined
            ? body.global_sales_ledger_id
            : mockStockGroups[index].global_sales_ledger_id,
        local_purchase_ledger_id:
          body.local_purchase_ledger_id !== undefined
            ? body.local_purchase_ledger_id
            : mockStockGroups[index].local_purchase_ledger_id,
        local_sales_ledger_id:
          body.local_sales_ledger_id !== undefined
            ? body.local_sales_ledger_id
            : mockStockGroups[index].local_sales_ledger_id,
        is_taxable: body.is_taxable !== undefined ? body.is_taxable : mockStockGroups[index].is_taxable,
        updated_at: new Date().toISOString(),
      };
      return HttpResponse.json(mockStockGroups[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const deleteStockGroupHandler = http.delete(
  '*/inventory/stockgroups/:id',
  async ({ params }) => {
    if (!isMockEnabled('inventory', 'getStockGroups')) return;
    await delay(300);
    const { id } = params;
    const index = mockStockGroups.findIndex((g) => g.id === id);
    if (index !== -1) {
      mockStockGroups.splice(index, 1);
      return HttpResponse.json({ message: 'Stock group deleted successfully' });
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const stockGroupHandlers = [
  getStockGroupsHandler,
  getStockGroupByIdHandler,
  createStockGroupHandler,
  updateStockGroupHandler,
  deleteStockGroupHandler,
];

// Backwards-compatible export for existing imports
export const getStockGroups = getStockGroupsHandler;
