import { authRegistry } from '../domains/auth/registry';

const STORAGE_KEY = 'erp_mock_settings';

// Centralized defaults built by composing decentralized domain registries
export const defaultRegistry = {
  auth: authRegistry,
};

// TypeScript automatically infers the massive global registry type
export type MockRegistry = typeof defaultRegistry;

export const getMockConfig = (): MockRegistry => {
  if (typeof window === 'undefined') return defaultRegistry;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      
      // Deep merge parsed state with defaultRegistry to ensure new keys default safely
      const merged: any = { ...defaultRegistry };
      for (const key of Object.keys(defaultRegistry) as Array<keyof MockRegistry>) {
        if (parsed[key]) {
          merged[key] = { ...defaultRegistry[key], ...parsed[key] };
        }
      }
      return merged as MockRegistry;
    }
  } catch (e) {
    console.error('Failed to parse mock settings', e);
  }
  
  return defaultRegistry;
};

export const setMockConfig = (config: MockRegistry) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    window.dispatchEvent(new Event('mock_config_changed'));
  }
};

export const isMockEnabled = <M extends keyof MockRegistry>(
  module: M,
  endpoint: keyof MockRegistry[M]
): boolean => {
  const config = getMockConfig();
  return !!(config[module] && (config[module] as any)[endpoint]);
};

export const isAnyMockEnabled = (): boolean => {
  const config = getMockConfig();
  return Object.values(config).some((moduleObj) => 
    Object.values(moduleObj).some((isEnabled) => isEnabled === true)
  );
};
