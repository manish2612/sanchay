import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import { CompanySettings } from '@/features/Company/CompanySettings/types';

let mockCompanySettings: Record<string, CompanySettings> = {
  default: {
    enable_branches: true,
    enable_cost_centres: false,
    enable_billwise_entry: true,
    enable_godowns: true,
    enable_batches: true,
    enable_negative_stock_control: false,
    enable_tracking: true,
    enable_dispatch_details: false,
    enable_buyer_details: true,
    enable_stock_item_travel_info: false,
    enable_stock_item_description: true,
    enable_ledger_description: false,
    default_stock_valuation_method: 'WEIGHTED_AVERAGE',
  },
};

export const getCompanySettingsHandler = http.get(
  '*/core/companies/:id/settings',
  async ({ params }) => {
    if (!isMockEnabled('core', 'companySettings')) return;
    await delay(350);

    const id = params.id as string;
    const settings = mockCompanySettings[id] || mockCompanySettings.default;
    return HttpResponse.json(settings);
  }
);

export const updateCompanySettingsHandler = http.put(
  '*/core/companies/:id/settings',
  async ({ params, request }) => {
    if (!isMockEnabled('core', 'companySettings')) return;
    await delay(500);

    const id = params.id as string;
    const body = (await request.json()) as CompanySettings;

    mockCompanySettings[id] = {
      ...(mockCompanySettings[id] || mockCompanySettings.default),
      ...body,
    };

    return HttpResponse.json(mockCompanySettings[id]);
  }
);
