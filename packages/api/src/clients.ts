import axios, { AxiosInstance } from 'axios';
import type {
  ApiRegistryConfig,
  ApiRequestArgs,
  ApiRequestConfig,
  IHttpClient,
  RequestConfig,
} from './types';
import { setupInterceptors } from './interceptors';
import { normalizeHttpError } from './errors';

/**
 * Internal HTTP client implementation. All errors thrown here are normalized to
 * `ApiError` before propagating, so callers never receive a raw AxiosError.
 */
class HttpClient implements IHttpClient {
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  public async get<TResponse>(url: string, config?: RequestConfig): Promise<TResponse> {
    try {
      const response = await this.client.get<TResponse>(url, config);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  }

  public async post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: RequestConfig,
  ): Promise<TResponse> {
    try {
      const response = await this.client.post<TResponse>(url, body, config);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  }

  public async put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: RequestConfig,
  ): Promise<TResponse> {
    try {
      const response = await this.client.put<TResponse>(url, body, config);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  }

  public async patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: RequestConfig,
  ): Promise<TResponse> {
    try {
      const response = await this.client.patch<TResponse>(url, body, config);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  }

  public async delete<TResponse>(url: string, config?: RequestConfig): Promise<TResponse> {
    try {
      const response = await this.client.delete<TResponse>(url, config);
      return response.data;
    } catch (error) {
      throw normalizeHttpError(error);
    }
  }

  public getRawClient(): AxiosInstance {
    return this.client;
  }
}

export class ApiRegistry<TClientKey extends string> {
  private readonly instances: Map<TClientKey, IHttpClient> = new Map();
  private readonly defaultKey: TClientKey;

  constructor(config: ApiRegistryConfig<TClientKey>) {
    const keys = Object.keys(config.clients) as TClientKey[];

    if (keys.length === 0) {
      throw new Error('ApiRegistry requires at least one client to be configured.');
    }

    // Determine the default client key: explicit config takes priority, otherwise first key.
    this.defaultKey = config.defaultClient ?? keys[0];

    if (!config.clients[this.defaultKey]) {
      throw new Error(
        `ApiRegistry: defaultClient "${String(this.defaultKey)}" is not defined in clients config.`,
      );
    }

    for (const key of keys) {
      const clientConfig = config.clients[key];

      const axiosInstance = axios.create({
        baseURL: clientConfig.baseURL,
        timeout: clientConfig.timeout ?? 10000,
        headers: clientConfig.headers,
        withCredentials: clientConfig.withCredentials ?? true,
      });

      // Each instance gets its own isolated interceptor closure — no shared state.
      setupInterceptors(
        axiosInstance,
        config.tokenStorage,
        config.onRefreshToken,
        config.onUnauthorized,
      );

      this.instances.set(key, new HttpClient(axiosInstance));
    }
  }

  /**
   * Retrieves a configured HTTP client by its key.
   * Use this when you need full control over which backend to target explicitly.
   */
  public getClient(key: TClientKey): IHttpClient {
    const client = this.instances.get(key);
    if (!client) {
      throw new Error(
        `ApiRegistry: Client for key "${String(key)}" has not been configured in the registry.`,
      );
    }
    return client;
  }

  // -------------------------------------------------------------------------
  // DX Facade Methods
  // These mirror the IHttpClient interface but accept an optional `client` key
  // in the config object, routing to the correct backend automatically.
  // If `client` is omitted, the `defaultClient` is used.
  // -------------------------------------------------------------------------

  private resolveClient(key?: TClientKey): IHttpClient {
    return this.getClient(key ?? this.defaultKey);
  }

  public get<TResponse>(
    url: string,
    config?: ApiRequestConfig<TClientKey>,
  ): Promise<TResponse> {
    const { client, ...axiosConfig } = config ?? {};
    return this.resolveClient(client).get<TResponse>(url, axiosConfig);
  }

  public post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: ApiRequestConfig<TClientKey>,
  ): Promise<TResponse> {
    const { client, ...axiosConfig } = config ?? {};
    return this.resolveClient(client).post<TResponse, TBody>(url, body, axiosConfig);
  }

  public put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: ApiRequestConfig<TClientKey>,
  ): Promise<TResponse> {
    const { client, ...axiosConfig } = config ?? {};
    return this.resolveClient(client).put<TResponse, TBody>(url, body, axiosConfig);
  }

  public patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: ApiRequestConfig<TClientKey>,
  ): Promise<TResponse> {
    const { client, ...axiosConfig } = config ?? {};
    return this.resolveClient(client).patch<TResponse, TBody>(url, body, axiosConfig);
  }

  public delete<TResponse>(
    url: string,
    config?: ApiRequestConfig<TClientKey>,
  ): Promise<TResponse> {
    const { client, ...axiosConfig } = config ?? {};
    return this.resolveClient(client).delete<TResponse>(url, axiosConfig);
  }

  /**
   * Unified request method — the standard calling convention for the entire codebase.
   *
   * Accepts `ApiRequestArgs` shape which is identical to what RTK Query endpoint
   * `query()` functions return, and what raw imperative callers produce.
   * Both paths share the same zero-overhead mental model.
   *
   * @example
   * // Raw imperative call
   * api.request({ url: '/users', method: 'POST', body: { name: 'John' } });
   *
   * // RTK Query endpoint (identical shape)
   * query: (args) => ({ url: '/users', method: 'POST', body: args })
   */
  public request<TResponse>({
    url,
    method,
    body,
    params,
    client,
    ...rest
  }: ApiRequestArgs<TClientKey>): Promise<TResponse> {
    const httpClient = this.resolveClient(client);
    const config: RequestConfig = { params, ...rest };

    switch (method.toUpperCase()) {
      case 'GET':
        return httpClient.get<TResponse>(url, config);
      case 'DELETE':
        return httpClient.delete<TResponse>(url, config);
      case 'POST':
        return httpClient.post<TResponse, unknown>(url, body, config);
      case 'PUT':
        return httpClient.put<TResponse, unknown>(url, body, config);
      case 'PATCH':
        return httpClient.patch<TResponse, unknown>(url, body, config);
      default:
        return Promise.reject(
          new Error(`ApiRegistry.request: unsupported method "${method}"`),
        );
    }
  }
}

/**
 * Factory function to create a new API registry.
 */
export function createApiRegistry<TClientKey extends string>(
  config: ApiRegistryConfig<TClientKey>,
): ApiRegistry<TClientKey> {
  return new ApiRegistry(config);
}
