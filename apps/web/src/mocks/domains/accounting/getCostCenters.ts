import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';

export const mockCostCenters = [
  {
    id: "01a0dcc9-8b7e-7f3b-ad37-c65a0f23db77",
    is_active: true,
    name: "Primary Cost Centre",
    display_order: 0,
    cost_category_name: "Primary Cost Category"
  }
];

export const getCostCentersHandler = http.get(
  '*/api/v1/accounting/costcentres',
  async () => {
    if (!isMockEnabled('accounting', 'getCostCenters')) return;
    await delay(300);
    return HttpResponse.json(mockCostCenters);
  }
);
