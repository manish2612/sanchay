import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import type {
  StockItemListItem,
  StockItemResponse,
  CreateStockItemPayload,
} from '@/features/Inventory/StockItem/types';

export let mockStockItems: StockItemListItem[] = [
  {
    id: '01a150ca-09b1-7141-8297-76de4af6bb46',
    is_active: true,
    name: 'Item1',
    item_code: 'ITM-001',
    part_number: 'PN-101',
    hsn_sac_code: '1234',
    description: 'Sample Inventory Item 1',
    remarks: 'Active fast-moving inventory',
    base_unit_id: '01a129c4-e4fe-719d-b11d-7eb2f8f6adc6',
    stock_group_id: '01a129c4-e4ee-753b-b30e-84e9a67943f9',
    stock_category_id: '01a129c4-e4f7-7c3f-b751-754640cfe817',
    maintain_batches: false,
    track_mfg_date: false,
    track_expiry_date: false,
    opening_quantity: '100',
    opening_rate: '250',
    opening_value: '25000',
    tax_rates: [
      {
        id: 'tax-rate-1',
        effective_from: '2026-04-01T00:00:00Z',
        effective_to: null,
        tax_group_id: '01918a20-8000-7b3f-b12a-456789abcdef',
        excise_tax_group_id: '',
        applicability: 'both',
        tax_rate: 0.18,
      },
    ],
  },
  {
    id: '01a150ca-09b2-7141-8297-76de4af6bb47',
    is_active: true,
    name: 'Standard Resistor 10k',
    item_code: 'ITM-002',
    part_number: 'PN-102',
    hsn_sac_code: '8533',
    description: 'Standard 10k Carbon Film Resistor',
    remarks: 'Electronic components',
    base_unit_id: '01a129c4-e4fe-719d-b11d-7eb2f8f6adc6',
    stock_group_id: '01a129c4-e4ee-753b-b30e-84e9a67943f9',
    stock_category_id: null,
    maintain_batches: true,
    track_mfg_date: true,
    track_expiry_date: false,
    opening_quantity: '500',
    opening_rate: '2.5',
    opening_value: '1250',
  },
];

export const getStockItemsHandler = http.get(
  '*/inventory/stockitems',
  async () => {
    if (!isMockEnabled('inventory', 'getStockItems')) return;
    await delay(300);
    return HttpResponse.json(mockStockItems);
  }
);

export const getStockItemByIdHandler = http.get(
  '*/inventory/stockitems/:id',
  async ({ params }) => {
    if (!isMockEnabled('inventory', 'getStockItems')) return;
    await delay(300);
    const { id } = params;
    const item = mockStockItems.find((i) => i.id === id);
    if (item) {
      return HttpResponse.json(item);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const createStockItemHandler = http.post<never, CreateStockItemPayload, StockItemResponse>(
  '*/inventory/stockitems',
  async ({ request }) => {
    if (!isMockEnabled('inventory', 'getStockItems')) return;
    await delay(500);
    const body = await request.json();

    const newItem: StockItemListItem = {
      id: '01a150ca-' + Math.random().toString(36).substring(2, 10),
      name: body.name || 'Sample Item',
      item_code: body.item_code || '',
      part_number: body.part_number || '',
      hsn_sac_code: body.hsn_sac_code || '',
      description: body.description || '',
      remarks: body.remarks || '',
      base_unit_id: body.base_unit_id || null,
      stock_group_id: body.stock_group_id || null,
      stock_category_id: body.stock_category_id || null,
      maintain_batches: body.maintain_batches || false,
      track_mfg_date: body.track_mfg_date || false,
      track_expiry_date: body.track_expiry_date || false,
      opening_quantity: body.opening_quantity ?? '0',
      opening_rate: body.opening_rate ?? '0',
      opening_value: body.opening_value ?? '0',
      tax_rates: body.tax_rates || [],
      is_active: true,
    };

    mockStockItems.unshift(newItem);
    return HttpResponse.json(newItem as unknown as StockItemResponse, { status: 201 });
  }
);

export const updateStockItemHandler = http.put(
  '*/inventory/stockitems/:id',
  async ({ params, request }) => {
    if (!isMockEnabled('inventory', 'getStockItems')) return;
    await delay(300);
    const { id } = params;
    const body = (await request.json()) as any;
    const index = mockStockItems.findIndex((i) => i.id === id);
    if (index !== -1) {
      mockStockItems[index] = {
        ...mockStockItems[index],
        name: body.name ?? mockStockItems[index].name,
        base_unit_id: body.base_unit_id !== undefined ? body.base_unit_id : mockStockItems[index].base_unit_id,
        stock_group_id: body.stock_group_id !== undefined ? body.stock_group_id : mockStockItems[index].stock_group_id,
        stock_category_id: body.stock_category_id !== undefined ? body.stock_category_id : mockStockItems[index].stock_category_id,
        hsn_sac_code: body.hsn_sac_code !== undefined ? body.hsn_sac_code : mockStockItems[index].hsn_sac_code,
        part_number: body.part_number !== undefined ? body.part_number : mockStockItems[index].part_number,
        maintain_batches: body.maintain_batches !== undefined ? body.maintain_batches : mockStockItems[index].maintain_batches,
        track_mfg_date: body.track_mfg_date !== undefined ? body.track_mfg_date : mockStockItems[index].track_mfg_date,
        track_expiry_date: body.track_expiry_date !== undefined ? body.track_expiry_date : mockStockItems[index].track_expiry_date,
        opening_quantity: body.opening_quantity !== undefined ? body.opening_quantity : mockStockItems[index].opening_quantity,
        opening_rate: body.opening_rate !== undefined ? body.opening_rate : mockStockItems[index].opening_rate,
        opening_value: body.opening_value !== undefined ? body.opening_value : mockStockItems[index].opening_value,
        local_purchase_ledger_id: body.local_purchase_ledger_id,
        local_sales_ledger_id: body.local_sales_ledger_id,
        global_purchase_ledger_id: body.global_purchase_ledger_id,
        global_sales_ledger_id: body.global_sales_ledger_id,
        tax_rates: body.tax_rates !== undefined ? body.tax_rates : mockStockItems[index].tax_rates,
      };
      return HttpResponse.json(mockStockItems[index]);
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const deleteStockItemHandler = http.delete(
  '*/inventory/stockitems/:id',
  async ({ params }) => {
    if (!isMockEnabled('inventory', 'getStockItems')) return;
    await delay(300);
    const { id } = params;
    const index = mockStockItems.findIndex((i) => i.id === id);
    if (index !== -1) {
      mockStockItems.splice(index, 1);
      return HttpResponse.json({ message: 'Stock item deleted successfully' });
    }
    return new HttpResponse(null, { status: 404 });
  }
);

export const stockItemHandlers = [
  getStockItemsHandler,
  getStockItemByIdHandler,
  createStockItemHandler,
  updateStockItemHandler,
  deleteStockItemHandler,
];
