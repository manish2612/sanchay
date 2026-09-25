import { http, HttpResponse, delay } from 'msw';
import type { LoginRequest, LoginResponse } from '@/features/Auth/api';
import { isMockEnabled } from '../../store/mockConfig';

export const loginHandler = http.post<never, LoginRequest, LoginResponse>(
  '*/auth/signin',
  async ({ request }) => {
    if (!isMockEnabled('auth', 'login')) {
      return; // Bypasses MSW and hits real API
    }
    
    await delay(800);

    const requestData = await request.json();

    return HttpResponse.json<LoginResponse>({
      token: 'mock-jwt-token-1234567890',
      companies: [
        {
          id: '01a098e5-8747-71a4-95de-f72ab84344bf',
          name: 'Test company',
          decimal_places: 2,
          registration_type: 'PAN',
          tax_identifier: '4234234',
          cin_number: '',
          country_id: '1',
          state_id: '1',
          company_fiscal_years: [{ from_date: '2026-07-16T00:00:00Z', to_date: '2027-07-15T00:00:00Z' }]
        },
        {
          id: '02b198e5-8747-71a4-95de-f72ab84344b0',
          name: 'Secondary Mock Ltd.',
          decimal_places: 2,
          registration_type: 'VAT',
          tax_identifier: 'REG-654321',
          cin_number: '',
          country_id: '1',
          state_id: '1',
          company_fiscal_years: [{ from_date: '2026-07-16T00:00:00Z', to_date: '2027-07-15T00:00:00Z' }]
        },
      ],
      user: {
        full_name: 'Mock User',
        email: requestData.email || 'mock@example.com',
        mobile_number: '9999999999',
      },
    }, { status: 200 });
  }
);
