import axios, { AxiosError } from 'axios';
import type { ApiError } from './types';

/**
 * Normalizes an Axios error or generic error into a standardized ApiError.
 * Ensures the consuming application always receives a predictable error format.
 */
export function normalizeHttpError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    
    return {
      status: axiosError.response?.status,
      message: getErrorMessage(axiosError),
      errorCode: getErrorCode(axiosError),
      details: axiosError.response?.data,
      isNetworkError: !axiosError.response && !axios.isCancel(error),
      isCancel: axios.isCancel(error),
    };
  }

  // Handle non-Axios errors (e.g., syntax errors in interceptors)
  return {
    message: error instanceof Error ? error.message : 'An unknown error occurred.',
    isNetworkError: false,
    isCancel: false,
  };
}

/**
 * Extracts a safe error message from the Axios response, falling back to the HTTP status text or standard message.
 */
function getErrorMessage(error: AxiosError): string {
  // Assuming the backend might send { message: "Invalid credentials" } or { error: "..." }
  const data = error.response?.data as Record<string, any> | undefined;
  
  if (data?.message) return String(data.message);
  if (data?.error) return String(data.error);
  
  return error.message;
}

/**
 * Extracts an optional string-based error code if the backend provides one.
 */
function getErrorCode(error: AxiosError): string | undefined {
  const data = error.response?.data as Record<string, any> | undefined;
  if (data?.code) return String(data.code);
  return undefined;
}
