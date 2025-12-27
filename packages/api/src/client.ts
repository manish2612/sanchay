import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { APIConfig, IHttpClient, RequestConfig, InterceptorFn, ErrorInterceptorFn } from './types';
import { validateConfig } from './config';

export class HttpClient implements IHttpClient {
  private client: AxiosInstance;

  constructor(config: APIConfig) {
    const validatedConfig = validateConfig(config);
    this.client = axios.create({
      baseURL: validatedConfig.baseURL,
      timeout: validatedConfig.timeout,
      headers: validatedConfig.headers,
    });
  }

  public registerRequestInterceptor(onFulfilled: InterceptorFn, onRejected?: ErrorInterceptorFn) {
    this.client.interceptors.request.use(onFulfilled, onRejected);
  }

  public registerResponseInterceptor(onFulfilled: (response: any) => any, onRejected?: ErrorInterceptorFn) {
    this.client.interceptors.response.use(onFulfilled, onRejected);
  }

  public async get<TResponse>(url: string, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.get<TResponse>(url, config);
    return response.data;
  }

  public async post<TResponse, TBody = unknown>(url: string, body?: TBody, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.post<TResponse>(url, body, config);
    return response.data;
  }

  public async put<TResponse, TBody = unknown>(url: string, body?: TBody, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.put<TResponse>(url, body, config);
    return response.data;
  }

  public async patch<TResponse, TBody = unknown>(url: string, body?: TBody, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.patch<TResponse>(url, body, config);
    return response.data;
  }

  public async delete<TResponse>(url: string, config?: RequestConfig): Promise<TResponse> {
    const response = await this.client.delete<TResponse>(url, config);
    return response.data;
  }

  // Expose the raw axios instance if absolutely needed (use with caution)
  public getRawClient(): AxiosInstance {
    return this.client;
  }
}

export const createClient = (config: APIConfig): HttpClient => {
  return new HttpClient(config);
};
