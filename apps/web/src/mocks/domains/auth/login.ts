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

    return HttpResponse.json(
      {
        active_company: {
          company_id: 1,
          company_name: 'Mock Company Inc.',
          registration_no: 'REG-123456',
          role: 'admin',
        },
        companies: [
          {
            company_id: 1,
            company_name: 'Mock Company Inc.',
            registration_no: 'REG-123456',
            role: 'admin',
          },
          {
            company_id: 2,
            company_name: 'Secondary Mock Ltd.',
            registration_no: 'REG-654321',
            role: 'user',
          },
        ],
        token: 'mock-jwt-token-1234567890',
      },
      { status: 200 }
    );
  }
);
