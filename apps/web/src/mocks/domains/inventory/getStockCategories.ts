import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { StockCategory } from '@/features/Masters/api/stockCategoriesApi';

export const getStockCategories = http.get<never, never, StockCategory[]>(
  '*/inventory/stockcategories',
  async () => {
    if (!isMockEnabled('inventory', 'getStockCategories')) return;

    await delay(800);

    return HttpResponse.json([
      {
        id: '01a0ddd8-cat1-7879-9ef1-399ca31134d9',
        company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
        created_at: '2026-09-26T18:57:10.421555+05:45',
        updated_at: '2026-09-26T18:57:10.421555+05:45',
        deleted_at: null,
        created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
        is_active: true,
        name: 'Primary Category',
      },
      {
        id: '01a0ddd8-cat2-7297-b7c4-9fa724cee423',
        company_id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
        created_at: '2026-09-26T18:57:10.422169+05:45',
        updated_at: '2026-09-26T18:57:10.422169+05:45',
        deleted_at: null,
        created_by: '01a0dcc5-5d80-719a-b3c0-7835dd04b47d',
        is_active: true,
        name: 'Secondary Category',
      },
    ]);
  }
);
