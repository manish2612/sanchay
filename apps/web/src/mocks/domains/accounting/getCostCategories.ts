import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';

export const mockCostCategories = [
  {
    id: "01a0dcc9-8b79-7294-a8e4-a500bc8bd565",
    is_active: true,
    name: "Primary Cost Category",
    allocate_revenue: true,
    allocate_non_revenue: false,
    display_order: 0
  }
];

export const getCostCategoriesHandler = http.get(
  '*/api/v1/accounting/costcategories',
  async () => {
    if (!isMockEnabled('accounting', 'getCostCategories')) return;
    await delay(300);
    return HttpResponse.json(mockCostCategories);
  }
);
