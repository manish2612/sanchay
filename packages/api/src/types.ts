import type { AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

export type APIConfig = {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
};

export type RequestConfig = AxiosRequestConfig;
export type Response<T> = AxiosResponse<T>;

export type InterceptorFn = (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
export type ErrorInterceptorFn = (error: any) => any;

export interface IHttpClient {
  get<TResponse>(url: string, config?: RequestConfig): Promise<TResponse>;
  post<TResponse, TBody = unknown>(url: string, body?: TBody, config?: RequestConfig): Promise<TResponse>;
  put<TResponse, TBody = unknown>(url: string, body?: TBody, config?: RequestConfig): Promise<TResponse>;
  patch<TResponse, TBody = unknown>(url: string, body?: TBody, config?: RequestConfig): Promise<TResponse>;
  delete<TResponse>(url: string, config?: RequestConfig): Promise<TResponse>;
}
