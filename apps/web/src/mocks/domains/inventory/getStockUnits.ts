import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type { StockUnit } from '@/features/Masters/api/stockUnitsApi';

export let mockStockUnits: StockUnit[] = [
  {
    id: '01a129c4-e500-785c-8ace-0bb3b4151846',
    decimal_places: 0,
    name: 'Pieces',
    symbol: 'Pcs',
    uqc_code: 'PCS',
    is_active: true,
    is_predefined: true,
  },
  {
    id: '02b239c4-e500-785c-8ace-0bb3b4151847',
    decimal_places: 2,
    name: 'Kilograms',
    symbol: 'Kgs',
    uqc_code: 'KGS',
    is_active: true,
    is_predefined: false,
  },
  {
    id: '03c349c4-e500-785c-8ace-0bb3b4151848',
    decimal_places: 0,
    name: 'Box',
    symbol: 'Box',
    uqc_code: 'BOX',
    is_active: true,
    is_predefined: false,
  },
  {
    id: '04d459c4-e500-785c-8ace-0bb3b4151849',
    decimal_places: 2,
    name: 'Liters',
    symbol: 'Ltr',
    uqc_code: 'LTR',
    is_active: true,
    is_predefined: false,
  },
  {
    id: '05e569c4-e500-785c-8ace-0bb3b4151850',
    decimal_places: 2,
    name: 'Meters',
    symbol: 'Mtr',
    uqc_code: 'MTR',
    is_active: true,
    is_predefined: false,
  },
  {
    id: '06f679c4-e500-785c-8ace-0bb3b4151851',
    decimal_places: 0,
    name: 'Numbers',
    symbol: 'Nos',
    uqc_code: 'NOS',
    is_active: false,
    is_predefined: false,
  },
];

export const getStockUnitsHandler = http.get<never, never, StockUnit[]>(
  '*/inventory/stockunits',
  async () => {
    if (!isMockEnabled('inventory', 'getStockUnits')) return;
    await delay(300);
    return HttpResponse.json(mockStockUnits);
  }
);

export const getStockUnitByIdHandler = http.get(
  '*/inventory/stockunits/:id',
  async ({ params }) => {
    if (!isMockEnabled('inventory', 'getStockUnits')) return;
    await delay(200);
    const { id } = params;
    const unit = mockStockUnits.find((u) => u.id === id);
    if (unit) {
      return HttpResponse.json(unit);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const createStockUnitHandler = http.post(
  '*/inventory/stockunits',
  async ({ request }) => {
    if (!isMockEnabled('inventory', 'getStockUnits')) return;
    await delay(300);
    const body = (await request.json()) as any;
    const newUnit: StockUnit = {
      id: `mock-uom-${Date.now()}`,
      name: body.name || 'Untitled Unit',
      symbol: body.symbol || '',
      decimal_places: Number(body.decimal_places) || 0,
      uqc_code: body.uqc_code || '',
      is_active: true,
      is_predefined: false,
    };
    mockStockUnits.push(newUnit);
    return HttpResponse.json(newUnit, { status: 201 });
  }
);

export const updateStockUnitHandler = http.put(
  '*/inventory/stockunits/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('inventory', 'getStockUnits')) return;
    await delay(300);
    const { id } = params;
    const body = (await request.json()) as any;
    const index = mockStockUnits.findIndex((u) => u.id === id);
    if (index !== -1) {
      mockStockUnits[index] = {
        ...mockStockUnits[index],
        name: body.name ?? mockStockUnits[index].name,
        symbol: body.symbol ?? mockStockUnits[index].symbol,
        decimal_places:
          body.decimal_places !== undefined
            ? Number(body.decimal_places)
            : mockStockUnits[index].decimal_places,
        uqc_code: body.uqc_code !== undefined ? body.uqc_code : mockStockUnits[index].uqc_code,
      };
      return HttpResponse.json(mockStockUnits[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const deleteStockUnitHandler = http.delete(
  '*/inventory/stockunits/:id',
  async ({ params }) => {
    if (!isMockEnabled('inventory', 'getStockUnits')) return;
    await delay(300);
    const { id } = params;
    const index = mockStockUnits.findIndex((u) => u.id === id);
    if (index !== -1) {
      mockStockUnits.splice(index, 1);
      return HttpResponse.json({ message: 'Stock unit deleted successfully' });
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const stockUnitHandlers = [
  getStockUnitsHandler,
  getStockUnitByIdHandler,
  createStockUnitHandler,
  updateStockUnitHandler,
  deleteStockUnitHandler,
];

// Backwards-compatible export for existing imports
export const getStockUnits = getStockUnitsHandler;
