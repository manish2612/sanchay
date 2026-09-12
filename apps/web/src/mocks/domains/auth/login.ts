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
          company_id: 1,
          company_name: 'Acme Corp',
          registration_no: 'REG12345',
          role: 'Admin',
        },
        {
          company_id: 2,
          company_name: 'Secondary Mock Ltd.',
          registration_no: 'REG-654321',
          role: 'user',
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
