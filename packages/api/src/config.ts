import { APIConfig } from './types';

export const validateConfig = (config: APIConfig): APIConfig => {
  if (!config.baseURL) {
    throw new Error('API Configuration Error: baseURL is required');
  }
  return {
    timeout: 10000,
    ...config,
  };
};
