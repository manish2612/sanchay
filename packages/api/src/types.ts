import type { AxiosRequestConfig, AxiosResponse, Method } from 'axios';

// --- Error Definitions ---
export interface ApiError {
  status?: number;
  message: string;
  errorCode?: string;
  details?: unknown;
  isNetworkError: boolean;
  isCancel: boolean;
}

// --- Token Management ---
export interface ITokenStorage {
  getToken: () => string | null | undefined | Promise<string | null | undefined>;
  setToken: (token: string) => void | Promise<void>;
  clearToken: () => void | Promise<void>;
}

export type RefreshTokenCallback = () => Promise<void>;

// --- Client Configuration & Registry ---
export type ApiClientConfig = {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
  withCredentials?: boolean; // Essential for HttpOnly cookies
};

export type ApiRegistryConfig<TClientKey extends string> = {
  clients: Record<TClientKey, ApiClientConfig>;
  /**
   * The key of the client to use when no `client` is specified in a request config.
   * Defaults to the first key defined in `clients`.
   */
  defaultClient?: TClientKey;
  tokenStorage?: ITokenStorage;
  onRefreshToken?: RefreshTokenCallback;
  onUnauthorized?: () => void; // Hook for forcing logout if refresh fails entirely
};

// --- HTTP Client ---
export type RequestConfig = AxiosRequestConfig;

/**
 * Extends AxiosRequestConfig with an optional `client` key for routing facade requests
 * to a specific backend via the ApiRegistry facade methods.
 * If omitted, the registry's `defaultClient` is used.
 */
export type ApiRequestConfig<TClientKey extends string = string> = AxiosRequestConfig & {
  client?: TClientKey;
};

/**
 * The universal standard shape for all API calls in this codebase.
 *
 * Used by:
 *  - `ApiRegistry.request()` for raw imperative calls
 *  - RTK Query endpoint `query()` functions (via `createAxiosBaseQuery`)
 *
 * Mapping to Axios:
 *  - `body`   → `AxiosRequestConfig.data`   (JSON payload / FormData)
 *  - `params` → `AxiosRequestConfig.params` (URL query string)
 *  - `client` → resolved to the correct `HttpClient` instance in the registry
 */
export type ApiRequestArgs<TClientKey extends string = string> = {
  url: string;
  method: Method;
  /** JSON body, FormData, or any request payload. Maps to Axios `data`. */
  body?: unknown;
  /** URL query parameters as a plain object. Maps to Axios `params`. */
  params?: Record<string, unknown>;
  /** Target backend client key. Falls back to `defaultClient` if omitted. */
  client?: TClientKey;
} & Omit<AxiosRequestConfig, 'url' | 'method' | 'data' | 'params'>;

export type Response<T> = AxiosResponse<T>;

export interface IHttpClient {
  get<TResponse>(url: string, config?: RequestConfig): Promise<TResponse>;
  post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: RequestConfig,
  ): Promise<TResponse>;
  put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: RequestConfig,
  ): Promise<TResponse>;
  patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    config?: RequestConfig,
  ): Promise<TResponse>;
  delete<TResponse>(url: string, config?: RequestConfig): Promise<TResponse>;
  /** Exposes the underlying Axios instance (useful for mocking/testing) */
  getRawClient(): import('axios').AxiosInstance;
}
