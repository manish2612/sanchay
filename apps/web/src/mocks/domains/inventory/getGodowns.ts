import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { GodownItem } from '@/features/Masters/api/godownsApi';

export let mockGodowns: GodownItem[] = [
  {
    id: '01a0ddd8-gdn1-7879-9ef1-399ca31134d9',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Main Location',
    alias: 'MAIN',
    code: 'GDN-MAIN',
    parent_id: null,
    is_active: true,
    is_predefined: true,
    created_at: '2026-09-26T18:57:10.421555+05:45',
    updated_at: '2026-09-26T18:57:10.421555+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-gdn2-7297-b7c4-9fa724cee423',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Central Warehouse',
    alias: 'CW',
    code: 'GDN-CW',
    parent_id: null,
    is_active: true,
    is_predefined: false,
    created_at: '2026-09-26T18:57:10.422169+05:45',
    updated_at: '2026-09-26T18:57:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-gdn3-7297-b7c4-9fa724cee424',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Rack A - Electronics',
    alias: 'RACK-A',
    code: 'GDN-RACKA',
    parent_id: '01a0ddd8-gdn2-7297-b7c4-9fa724cee423',
    parent_name: 'Central Warehouse',
    is_active: true,
    is_predefined: false,
    created_at: '2026-09-26T19:00:10.422169+05:45',
    updated_at: '2026-09-26T19:00:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-gdn4-7297-b7c4-9fa724cee425',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Rack B - Hardware',
    alias: 'RACK-B',
    code: 'GDN-RACKB',
    parent_id: '01a0ddd8-gdn2-7297-b7c4-9fa724cee423',
    parent_name: 'Central Warehouse',
    is_active: true,
    is_predefined: false,
    created_at: '2026-09-26T19:05:10.422169+05:45',
    updated_at: '2026-09-26T19:05:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-gdn5-7297-b7c4-9fa724cee426',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Cold Storage Facility',
    alias: 'COLD',
    code: 'GDN-COLD',
    parent_id: null,
    is_active: true,
    is_predefined: false,
    created_at: '2026-09-26T19:10:10.422169+05:45',
    updated_at: '2026-09-26T19:10:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-gdn6-7297-b7c4-9fa724cee427',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Deep Freezer Unit 1',
    alias: 'FREEZER-1',
    code: 'GDN-FRZ1',
    parent_id: '01a0ddd8-gdn5-7297-b7c4-9fa724cee426',
    parent_name: 'Cold Storage Facility',
    is_active: true,
    is_predefined: false,
    created_at: '2026-09-26T19:15:10.422169+05:45',
    updated_at: '2026-09-26T19:15:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-gdn7-7297-b7c4-9fa724cee428',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Transit Godown',
    alias: 'TRANSIT',
    code: 'GDN-TRN',
    parent_id: null,
    is_active: true,
    is_predefined: false,
    created_at: '2026-09-26T19:20:10.422169+05:45',
    updated_at: '2026-09-26T19:20:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
];

export const getGodownsHandler = http.get('*/inventory/godowns', async () => {
  if (!isMockEnabled('inventory', 'getGodowns' as any)) return;
  await delay(300);
  return HttpResponse.json(mockGodowns);
});

export const getGodownByIdHandler = http.get('*/inventory/godowns/:id', async ({ params }) => {
  if (!isMockEnabled('inventory', 'getGodowns' as any)) return;
  await delay(300);
  const { id } = params;
  const godown = mockGodowns.find((g) => g.id === id);
  if (godown) {
    return HttpResponse.json(godown);
  }
  return new HttpResponse(null, { status: 404 });
});

export const createGodownHandler = http.post('*/inventory/godowns', async ({ request }) => {
  if (!isMockEnabled('inventory', 'getGodowns' as any)) return;
  await delay(300);
  const body = (await request.json()) as any;
  const parentGodown = body.parent_id
    ? mockGodowns.find((g) => g.id === body.parent_id || g.code === body.parent_id)
    : null;
  const newGodown: GodownItem = {
    id: `mock-gdn-${Date.now()}`,
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: body.name || 'Untitled Godown',
    alias: body.alias || null,
    code: body.code || `GDN-${mockGodowns.length + 1}`,
    parent_id: body.parent_id || null,
    parent_name: parentGodown ? parentGodown.name : null,
    is_active: true,
    is_predefined: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  };
  mockGodowns.push(newGodown);
  return HttpResponse.json(newGodown, { status: 201 });
});

export const updateGodownHandler = http.put(
  '*/inventory/godowns/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('inventory', 'getGodowns' as any)) return;
    await delay(300);
    const { id } = params;
    const body = (await request.json()) as any;
    const index = mockGodowns.findIndex((g) => g.id === id);
    if (index !== -1) {
      if (mockGodowns[index].is_predefined) {
        return HttpResponse.json(
          { message: 'Cannot edit predefined system godown' },
          { status: 403 },
        );
      }
      const updatedParentId =
        body.parent_id !== undefined ? body.parent_id : mockGodowns[index].parent_id;
      const updatedParent = updatedParentId
        ? mockGodowns.find((g) => g.id === updatedParentId || g.code === updatedParentId)
        : null;

      mockGodowns[index] = {
        ...mockGodowns[index],
        name: body.name ?? mockGodowns[index].name,
        alias: body.alias !== undefined ? body.alias : mockGodowns[index].alias,
        code: body.code !== undefined ? body.code : mockGodowns[index].code,
        parent_id: updatedParentId,
        parent_name: updatedParent ? updatedParent.name : null,
        is_active: body.is_active !== undefined ? body.is_active : mockGodowns[index].is_active,
        updated_at: new Date().toISOString(),
      };
      return HttpResponse.json(mockGodowns[index]);
    }
    return new HttpResponse(null, { status: 404 });
  },
);

export const deleteGodownHandler = http.delete('*/inventory/godowns/:id', async ({ params }) => {
  if (!isMockEnabled('inventory', 'getGodowns' as any)) return;
  await delay(300);
  const { id } = params;
  const index = mockGodowns.findIndex((g) => g.id === id);
  if (index !== -1) {
    if (mockGodowns[index].is_predefined) {
      return HttpResponse.json(
        { message: 'Cannot delete predefined system godown' },
        { status: 403 },
      );
    }
    mockGodowns.splice(index, 1);
    return HttpResponse.json({ message: 'Godown deleted successfully' });
  }
  return new HttpResponse(null, { status: 404 });
});

export const godownHandlers = [
  getGodownsHandler,
  getGodownByIdHandler,
  createGodownHandler,
  updateGodownHandler,
  deleteGodownHandler,
];

export const getGodowns = getGodownsHandler;
