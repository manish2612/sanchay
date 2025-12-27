import { createClient, HttpClient, APIConfig } from '@sanchay/api';

class ApiService {
  private static instance: HttpClient;

  public static initialize(config: APIConfig): void {
    if (!this.instance) {
      this.instance = createClient(config);
    }
  }

  public static getInstance(): HttpClient {
    if (!this.instance) {
      throw new Error('ApiService not initialized. Call ApiService.initialize(config) first.');
    }
    return this.instance;
  }
}

export const apiClient = {
  get: <T>(url: string, config?: any) => ApiService.getInstance().get<T>(url, config),
  post: <T, B>(url: string, body?: B, config?: any) => ApiService.getInstance().post<T, B>(url, body, config),
  put: <T, B>(url: string, body?: B, config?: any) => ApiService.getInstance().put<T, B>(url, body, config),
  patch: <T, B>(url: string, body?: B, config?: any) => ApiService.getInstance().patch<T, B>(url, body, config),
  delete: <T>(url: string, config?: any) => ApiService.getInstance().delete<T>(url, config),
  
  // Expose registration methods if needed, proxied to instance
  getRawClient: () => ApiService.getInstance().getRawClient(),
};

export { ApiService };
