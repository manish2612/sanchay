import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { StockCategory } from '@/features/Masters/api/stockCategoriesApi';

export let mockStockCategories: StockCategory[] = [
  {
    id: '01a0ddd8-cat1-7879-9ef1-399ca31134d9',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Electronics',
    alias: 'ELEC',
    code: 'SC-ELEC',
    parent_id: null,
    parent_name: null,
    is_active: true,
    is_predefined: true,
    display_order: 1,
    created_at: '2026-09-26T18:57:10.421555+05:45',
    updated_at: '2026-09-26T18:57:10.421555+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-cat2-7297-b7c4-9fa724cee423',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Smartphones',
    alias: 'PHONE',
    code: 'SC-PHN',
    parent_id: '01a0ddd8-cat1-7879-9ef1-399ca31134d9',
    parent_name: 'Electronics',
    is_active: true,
    is_predefined: false,
    display_order: 2,
    created_at: '2026-09-26T18:57:10.422169+05:45',
    updated_at: '2026-09-26T18:57:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-cat3-7297-b7c4-9fa724cee424',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Laptops & Computers',
    alias: 'LAPTOP',
    code: 'SC-LAP',
    parent_id: '01a0ddd8-cat1-7879-9ef1-399ca31134d9',
    parent_name: 'Electronics',
    is_active: true,
    is_predefined: false,
    display_order: 3,
    created_at: '2026-09-26T19:00:10.422169+05:45',
    updated_at: '2026-09-26T19:00:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-cat4-7297-b7c4-9fa724cee425',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Electronic Accessories',
    alias: 'ACC',
    code: 'SC-ACC',
    parent_id: '01a0ddd8-cat1-7879-9ef1-399ca31134d9',
    parent_name: 'Electronics',
    is_active: true,
    is_predefined: false,
    display_order: 4,
    created_at: '2026-09-26T19:05:10.422169+05:45',
    updated_at: '2026-09-26T19:05:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-cat5-7297-b7c4-9fa724cee426',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Hardware & Tools',
    alias: 'HRD',
    code: 'SC-HRD',
    parent_id: null,
    parent_name: null,
    is_active: true,
    is_predefined: true,
    display_order: 5,
    created_at: '2026-09-26T19:10:10.422169+05:45',
    updated_at: '2026-09-26T19:10:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-cat6-7297-b7c4-9fa724cee427',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Power Tools',
    alias: 'PWR',
    code: 'SC-PWR',
    parent_id: '01a0ddd8-cat5-7297-b7c4-9fa724cee426',
    parent_name: 'Hardware & Tools',
    is_active: true,
    is_predefined: false,
    display_order: 6,
    created_at: '2026-09-26T19:15:10.422169+05:45',
    updated_at: '2026-09-26T19:15:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-cat7-7297-b7c4-9fa724cee428',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Hand Tools',
    alias: 'HND',
    code: 'SC-HND',
    parent_id: '01a0ddd8-cat5-7297-b7c4-9fa724cee426',
    parent_name: 'Hardware & Tools',
    is_active: true,
    is_predefined: false,
    display_order: 7,
    created_at: '2026-09-26T19:20:10.422169+05:45',
    updated_at: '2026-09-26T19:20:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
  {
    id: '01a0ddd8-cat8-7297-b7c4-9fa724cee429',
    company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
    name: 'Consumables & Packaging',
    alias: 'CNS',
    code: 'SC-CNS',
    parent_id: null,
    parent_name: null,
    is_active: true,
    is_predefined: false,
    display_order: 8,
    created_at: '2026-09-26T19:25:10.422169+05:45',
    updated_at: '2026-09-26T19:25:10.422169+05:45',
    deleted_at: null,
    created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
  },
];

export const getStockCategoriesHandler = http.get(
  '*/inventory/stockcategories',
  async () => {
    if (!isMockEnabled('inventory', 'getStockCategories')) return;
    await delay(300);
    return HttpResponse.json(mockStockCategories);
  }
);

export const getStockCategoryByIdHandler = http.get(
  '*/inventory/stockcategories/:id',
  async ({ params }) => {
    if (!isMockEnabled('inventory', 'getStockCategories')) return;
    await delay(300);
    const { id } = params;
    const category = mockStockCategories.find((c) => c.id === id);
    if (category) {
      return HttpResponse.json(category);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const createStockCategoryHandler = http.post(
  '*/inventory/stockcategories',
  async ({ request }) => {
    if (!isMockEnabled('inventory', 'getStockCategories')) return;
    await delay(300);
    const body = (await request.json()) as any;
    const parent = mockStockCategories.find((c) => c.id === body.parent_id);

    const newCategory: StockCategory = {
      id: `mock-sc-${Date.now()}`,
      company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
      name: body.name || 'Untitled Stock Category',
      alias: body.alias || null,
      code: body.code || `SC-${mockStockCategories.length + 1}`,
      parent_id: body.parent_id || null,
      parent_name: parent ? parent.name : body.parent_name || null,
      is_active: true,
      is_predefined: false,
      display_order: mockStockCategories.length + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted_at: null,
      created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
    };
    mockStockCategories.push(newCategory);
    return HttpResponse.json(newCategory, { status: 201 });
  }
);

export const updateStockCategoryHandler = http.put(
  '*/inventory/stockcategories/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('inventory', 'getStockCategories')) return;
    await delay(300);
    const { id } = params;
    const body = (await request.json()) as any;
    const index = mockStockCategories.findIndex((c) => c.id === id);
    if (index !== -1) {
      const parent = body.parent_id !== undefined
        ? mockStockCategories.find((c) => c.id === body.parent_id)
        : undefined;

      mockStockCategories[index] = {
        ...mockStockCategories[index],
        name: body.name ?? mockStockCategories[index].name,
        alias: body.alias !== undefined ? body.alias : mockStockCategories[index].alias,
        code: body.code !== undefined ? body.code : mockStockCategories[index].code,
        parent_id: body.parent_id !== undefined ? body.parent_id : mockStockCategories[index].parent_id,
        parent_name: parent !== undefined ? (parent ? parent.name : null) : (body.parent_name !== undefined ? body.parent_name : mockStockCategories[index].parent_name),
        is_active: body.is_active !== undefined ? body.is_active : mockStockCategories[index].is_active,
        updated_at: new Date().toISOString(),
      };
      return HttpResponse.json(mockStockCategories[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const deleteStockCategoryHandler = http.delete(
  '*/inventory/stockcategories/:id',
  async ({ params }) => {
    if (!isMockEnabled('inventory', 'getStockCategories')) return;
    await delay(300);
    const { id } = params;
    const index = mockStockCategories.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockStockCategories.splice(index, 1);
      return HttpResponse.json({ message: 'Stock category deleted successfully' });
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const stockCategoryHandlers = [
  getStockCategoriesHandler,
  getStockCategoryByIdHandler,
  createStockCategoryHandler,
  updateStockCategoryHandler,
  deleteStockCategoryHandler,
];

// Backwards-compatible export for existing imports
export const getStockCategories = getStockCategoriesHandler;
