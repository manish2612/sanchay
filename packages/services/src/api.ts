import { createApiRegistry, ApiRegistry, IHttpClient } from '@prime/api';
import type { ITokenStorage, RefreshTokenCallback } from '@prime/api';

type ApiServiceConfig = {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  tokenStorage?: ITokenStorage;
  onRefreshToken?: RefreshTokenCallback;
  onUnauthorized?: () => void;
};

class ApiService {
  private static registry: ApiRegistry<'DEFAULT'>;

  public static initialize(config: ApiServiceConfig): void {
    if (!this.registry) {
      this.registry = createApiRegistry<'DEFAULT'>({
        clients: {
          DEFAULT: {
            baseURL: config.baseURL,
            timeout: config.timeout,
            headers: config.headers,
            withCredentials: true,
          },
        },
        defaultClient: 'DEFAULT',
        tokenStorage: config.tokenStorage,
        onRefreshToken: config.onRefreshToken,
        onUnauthorized: config.onUnauthorized,
      });
    }
  }

  public static getInstance(): IHttpClient {
    if (!this.registry) {
      throw new Error('ApiService not initialized. Call ApiService.initialize(config) first.');
    }
    return this.registry.getClient('DEFAULT');
  }
}

export const apiClient = {
  get: <T>(url: string, config?: any) => ApiService.getInstance().get<T>(url, config),
  post: <T, B>(url: string, body?: B, config?: any) =>
    ApiService.getInstance().post<T, B>(url, body, config),
  put: <T, B>(url: string, body?: B, config?: any) =>
    ApiService.getInstance().put<T, B>(url, body, config),
  patch: <T, B>(url: string, body?: B, config?: any) =>
    ApiService.getInstance().patch<T, B>(url, body, config),
  delete: <T>(url: string, config?: any) => ApiService.getInstance().delete<T>(url, config),
};

export { ApiService };
