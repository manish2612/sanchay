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
          mailing_name: 'test pvt ltd',
          no_of_decimal: 2,
          registration_no: '4234234',
        },
        {
          id: '02b198e5-8747-71a4-95de-f72ab84344b0',
          name: 'Secondary Mock Ltd.',
          mailing_name: 'Secondary Mock Ltd.',
          no_of_decimal: 2,
          registration_no: 'REG-654321',
        },
      ],
      user: {
        full_name: 'Mock User',
        email: requestData.email || 'mock@example.com',
        mobile_no: '9999999999',
      },
    }, { status: 200 });
  }
);
