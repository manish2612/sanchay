import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { StockUnit } from '@/features/Masters/api/stockUnitsApi';

export const getStockUnits = http.get<never, never, StockUnit[]>(
  '*/inventory/stockunits',
  async () => {
    if (!isMockEnabled('inventory', 'getStockUnits')) return;

    await delay(800);

    return HttpResponse.json([
      {
        decimal_places: 0,
        name: 'Pieces',
        symbol: 'Pcs',
        uqc_code: 'PCS',
      },
      {
        decimal_places: 2,
        name: 'Kilograms',
        symbol: 'Kgs',
        uqc_code: 'KGS',
      },
      {
        decimal_places: 0,
        name: 'Box',
        symbol: 'Box',
        uqc_code: 'BOX',
      },
      {
        decimal_places: 2,
        name: 'Liters',
        symbol: 'Ltr',
        uqc_code: 'LTR',
      },
      {
        decimal_places: 2,
        name: 'Meters',
        symbol: 'Mtr',
        uqc_code: 'MTR',
      },
      {
        decimal_places: 0,
        name: 'Numbers',
        symbol: 'Nos',
        uqc_code: 'NOS',
      },
    ]);
  }
);
