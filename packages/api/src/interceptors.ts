import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { ITokenStorage, RefreshTokenCallback } from './types';

/**
 * Sets up isolated request/response interceptors for a single Axios instance.
 *
 * IMPORTANT: `isRefreshing`, `failedQueue`, and `processQueue` are intentionally
 * declared as closure variables inside this function. This ensures each Axios
 * instance (e.g. CRM_BE, ADMIN_BE) has completely independent refresh state
 * and never corrupts another instance's queue.
 */
export const setupInterceptors = (
  client: AxiosInstance,
  tokenStorage?: ITokenStorage,
  onRefreshToken?: RefreshTokenCallback,
  onUnauthorized?: () => void,
): void => {
  // Per-instance state — never shared across registries or instances
  let isRefreshing = false;
  let failedQueue: Array<{
    resolve: (token?: string | null) => void;
    reject: (error: unknown) => void;
  }> = [];

  const processQueue = (error: unknown, token: string | null = null): void => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });
    failedQueue = [];
  };

  // --- Request Interceptor ---
  client.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      // Attempt to attach a token if JS-accessible storage is injected.
      // If using HttpOnly cookies exclusively, getToken() returns null/undefined
      // and the browser attaches the cookie automatically — no action needed here.
      if (tokenStorage) {
        const token = await tokenStorage.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error: unknown) => Promise.reject(error),
  );

  // --- Response Interceptor ---
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      // Only attempt refresh on a 401 that hasn't been retried yet.
      if (
        error.response?.status === 401 &&
        originalRequest &&
        !originalRequest._retry
      ) {
        // No refresh callback provided — we cannot recover, trigger logout and fail.
        if (!onRefreshToken) {
          onUnauthorized?.();
          return Promise.reject(error);
        }

        if (isRefreshing) {
          // A refresh is already in flight. Queue this request and wait for resolution.
          return new Promise<unknown>((resolve, reject) => {
            failedQueue.push({
              resolve: (token) => {
                if (token) {
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                }
                resolve(client(originalRequest));
              },
              reject,
            });
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Delegate refresh logic entirely to the application's callback.
          await onRefreshToken();

          // Retrieve the new token (null if using HttpOnly cookies — the browser handles it).
          const newToken = tokenStorage ? await tokenStorage.getToken() : null;

          processQueue(null, newToken ?? null);

          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          return client(originalRequest);
        } catch (refreshError: unknown) {
          // Refresh itself failed — reject all queued requests and force logout.
          processQueue(refreshError, null);
          if (tokenStorage) {
            await tokenStorage.clearToken();
          }
          onUnauthorized?.();
          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    },
  );
};
