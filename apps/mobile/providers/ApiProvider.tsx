import { ApiService } from '@prime/services';
import { ReactNode, useRef } from 'react';

// In a real mobile app, this might come from expo-constants or react-native-dotenv
// For now, hardcoded as requested
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export function ApiProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    try {
      ApiService.initialize({
        baseURL: API_BASE_URL,
        timeout: 30000,
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const clientInstance = ApiService.getInstance();

      clientInstance.registerRequestInterceptor((config) => {
        // Simplified logging to prevent circular reference crashes on Android
        console.log(`[Mobile API Request] ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      });

      clientInstance.registerResponseInterceptor(
        (response) => {
          console.log(`[Mobile API Response] ${response.status} from ${response.config.url}`);
          return response;
        },
        (error) => {
          // console.error("[Mobile API Error]", error.message);
          return Promise.reject(error);
        },
      );
      initialized.current = true;
    } catch (e) {
      // Ignroe if already initialized
    }
  }

  return <>{children}</>;
}
