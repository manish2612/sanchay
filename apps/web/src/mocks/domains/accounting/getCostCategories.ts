import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { CostCategory } from '@/features/Masters/api/costCategoriesApi';

export const mockCostCategories: CostCategory[] = [
  {
    id: '01918a20-8000-7b3f-b12a-456789abcdef',
    is_active: true,
    name: 'Primary Cost Category',
    alias: 'PRIMARY',
    code: 'CCAT-01',
    allocate_revenue: true,
    allocate_non_revenue: false,
    display_order: 1,
    is_predefined: true,
  },
  {
    id: '01918a21-9000-7b3f-b12a-987654fedcba',
    is_active: true,
    name: 'Marketing & Branding',
    alias: 'MKTG',
    code: 'CCAT-02',
    allocate_revenue: true,
    allocate_non_revenue: true,
    display_order: 2,
    is_predefined: false,
  },
  {
    id: '01918a22-a000-7b3f-b12a-112233445566',
    is_active: true,
    name: 'Research & Development',
    alias: 'RND',
    code: 'CCAT-03',
    allocate_revenue: false,
    allocate_non_revenue: true,
    display_order: 3,
    is_predefined: false,
  },
  {
    id: '01918a23-b000-7b3f-b12a-aabbccddeeff',
    is_active: true,
    name: 'Corporate Administration',
    alias: 'ADMIN',
    code: 'CCAT-04',
    allocate_revenue: false,
    allocate_non_revenue: true,
    display_order: 4,
    is_predefined: false,
  },
  {
    id: '01918a24-c000-7b3f-b12a-556677889900',
    is_active: true,
    name: 'Sales & Distribution',
    alias: 'SALES',
    code: 'CCAT-05',
    allocate_revenue: true,
    allocate_non_revenue: false,
    display_order: 5,
    is_predefined: false,
  },
];

export const getCostCategoriesHandler = http.get(
  '*/api/v1/accounting/costcategories',
  async () => {
    if (!isMockEnabled('accounting', 'getCostCategories')) return;
    await delay(300);
    return HttpResponse.json(mockCostCategories);
  }
);

export const getCostCategoryByIdHandler = http.get(
  '*/api/v1/accounting/costcategories/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getCostCategories')) return;
    await delay(300);
    const { id } = params;
    const category = mockCostCategories.find((c) => c.id === id);
    if (category) {
      return HttpResponse.json(category);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const createCostCategoryHandler = http.post(
  '*/api/v1/accounting/costcategories',
  async ({ request }) => {
    if (!isMockEnabled('accounting', 'getCostCategories')) return;
    await delay(300);
    const body = (await request.json()) as Partial<CostCategory>;
    const newCategory: CostCategory = {
      id: `mock-ccat-${Date.now()}`,
      name: body.name || 'Untitled Category',
      alias: body.alias || null,
      code: body.code || `CCAT-${mockCostCategories.length + 1}`,
      allocate_revenue: Boolean(body.allocate_revenue),
      allocate_non_revenue: Boolean(body.allocate_non_revenue),
      is_active: true,
      display_order: mockCostCategories.length + 1,
      is_predefined: false,
    };
    mockCostCategories.push(newCategory);
    return HttpResponse.json(newCategory, { status: 201 });
  }
);

export const updateCostCategoryHandler = http.put(
  '*/api/v1/accounting/costcategories/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('accounting', 'getCostCategories')) return;
    await delay(300);
    const { id } = params;
    const body = (await request.json()) as Partial<CostCategory>;
    const index = mockCostCategories.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockCostCategories[index] = {
        ...mockCostCategories[index],
        name: body.name ?? mockCostCategories[index].name,
        alias: body.alias !== undefined ? body.alias : mockCostCategories[index].alias,
        code: body.code !== undefined ? body.code : mockCostCategories[index].code,
        allocate_revenue:
          body.allocate_revenue !== undefined
            ? Boolean(body.allocate_revenue)
            : mockCostCategories[index].allocate_revenue,
        allocate_non_revenue:
          body.allocate_non_revenue !== undefined
            ? Boolean(body.allocate_non_revenue)
            : mockCostCategories[index].allocate_non_revenue,
      };
      return HttpResponse.json(mockCostCategories[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const deleteCostCategoryHandler = http.delete(
  '*/api/v1/accounting/costcategories/:id',
  async ({ params }) => {
    if (!isMockEnabled('accounting', 'getCostCategories')) return;
    await delay(300);
    const { id } = params;
    const index = mockCostCategories.findIndex((c) => c.id === id);
    if (index !== -1) {
      mockCostCategories.splice(index, 1);
      return HttpResponse.json({ message: 'Operation completed successfully' });
    }
    return new HttpResponse(null, { status: 404 });
  }
);
