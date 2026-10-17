import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { CreateStockItemPayload, StockItemResponse } from '@/features/Inventory/StockItem/types';

export const createStockItem = http.post<never, CreateStockItemPayload, StockItemResponse>(
  '*/inventory/stockitems',
  async ({ request }) => {
    if (!isMockEnabled('inventory', 'createStockItem')) return;

    await delay(1000);

    const body = await request.json();

    return HttpResponse.json({
      id: '01a0item-' + Math.random().toString(36).substring(2, 9),
      name: body.name || 'Sample Stock Item',
      alias: body.alias || '',
      item_code: body.item_code || '',
      part_number: body.part_number || '',
      base_unit_id: body.base_unit_id || '',
      stock_group_id: body.stock_group_id || '',
      stock_category_id: body.stock_category_id || '',
      is_active: true,
      company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }
);
