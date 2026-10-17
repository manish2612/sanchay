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
        id: '01a129c4-e500-785c-8ace-0bb3b4151846',
        decimal_places: 0,
        name: 'Pieces',
        symbol: 'Pcs',
        uqc_code: 'PCS',
        is_active: true,
      },
      {
        id: '02b239c4-e500-785c-8ace-0bb3b4151847',
        decimal_places: 2,
        name: 'Kilograms',
        symbol: 'Kgs',
        uqc_code: 'KGS',
        is_active: true,
      },
      {
        id: '03c349c4-e500-785c-8ace-0bb3b4151848',
        decimal_places: 0,
        name: 'Box',
        symbol: 'Box',
        uqc_code: 'BOX',
        is_active: true,
      },
      {
        id: '04d459c4-e500-785c-8ace-0bb3b4151849',
        decimal_places: 2,
        name: 'Liters',
        symbol: 'Ltr',
        uqc_code: 'LTR',
        is_active: true,
      },
      {
        id: '05e569c4-e500-785c-8ace-0bb3b4151850',
        decimal_places: 2,
        name: 'Meters',
        symbol: 'Mtr',
        uqc_code: 'MTR',
        is_active: true,
      },
      {
        id: '06f679c4-e500-785c-8ace-0bb3b4151851',
        decimal_places: 0,
        name: 'Numbers',
        symbol: 'Nos',
        uqc_code: 'NOS',
        is_active: true,
      },
    ]);
  }
);
