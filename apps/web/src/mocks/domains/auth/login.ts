import { http, HttpResponse, delay } from 'msw';
import type { LoginRequest, LoginResponse } from '@/features/Auth/api';
import { isMockEnabled } from '../../store/mockConfig';

export const loginHandler = http.post<never, LoginRequest, LoginResponse>(
  /\/auth\/(login|signin)$/,
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
          id: '01a0dcc9-8b34-7494-8b6e-75afc53f0127',
          name: 'Test Co.',
          mailing_name: 'Test Co.',
          decimal_places: 2,
          registration_type: 'VAT',
          tax_identifier: '123456789',
          cin_number: '',
          country_id: '01a0da7e-912d-77c5-8304-58ade784d688',
          state_id: '01a0da7e-914e-7c61-83b8-5b382aa58cad',
          company_fiscal_years: [
            {
              financial_year_id: '01a0dcc9-8b3b-7e4f-b380-a082bbe11f78',
              from_date: '2026-04-01T00:00:00Z',
              to_date: '2027-03-01T00:00:00Z',
            },
          ],
        },
        {
          id: '01a0ddd8-3999-722b-9242-cda56ef9ad1f',
          name: 'Nepali',
          mailing_name: 'Nepali',
          decimal_places: 2,
          registration_type: 'VAT',
          tax_identifier: 'vat-010101',
          cin_number: '',
          country_id: '01a0da7e-9132-735b-a71e-68be05c5473e',
          state_id: '01a0da7e-914f-7da1-91f8-63baddee17d3',
          company_fiscal_years: [
            {
              financial_year_id: '01a0ddd8-399c-7bc5-922f-0b0112db1e89',
              from_date: '2026-07-16T00:00:00Z',
              to_date: '2027-07-15T00:00:00Z',
            },
          ],
        },
        {
          id: '01a129c4-e49a-7373-a41e-13621bbf4b04',
          name: 'Nepali 2',
          mailing_name: 'Nep2',
          decimal_places: 3,
          registration_type: 'VAT',
          tax_identifier: 'MANID8283HD',
          cin_number: '',
          country_id: '01a0da7e-9132-735b-a71e-68be05c5473e',
          state_id: '01a0da7e-914f-7da2-8f15-03023d818b34',
          company_fiscal_years: [
            {
              financial_year_id: '01a129c4-e49f-7267-85ae-f01ad25b33f8',
              from_date: '2026-07-16T00:00:00Z',
              to_date: '2027-07-15T00:00:00Z',
            },
          ],
        },
      ],
      user: {
        full_name: 'Manish',
        email: requestData.email || 'manishmahajan2612@gmail.com',
        mobile_number: '124567890',
      },
    }, { status: 200 });
  }
);
