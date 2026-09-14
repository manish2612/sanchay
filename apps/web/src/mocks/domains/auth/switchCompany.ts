import { http, HttpResponse, delay } from 'msw';
import { isMockEnabled } from '../../store/mockConfig';
import { SwitchCompanyRequest, SwitchCompanyResponse } from '@/features/Auth/api';

export const switchCompanyHandler = http.post<never, SwitchCompanyRequest, SwitchCompanyResponse>(
  '*/auth/switch-company',
  async ({ request }) => {
    if (!isMockEnabled('auth', 'switchCompany')) {
      return; 
    }
    
    await delay(500);

    return HttpResponse.json({
      message: "Switched company successfully without re-login",
      token: "mock-new-jwt-token-after-switch-12345"
    }, { status: 200 });
  }
);
