import { ApiService } from '@prime/services';
import { ReactNode, useRef } from 'react';

// In a real mobile app, this might come from expo-constants or react-native-dotenv
// For now, hardcoded as requested
const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export function ApiProvider({ children }: { children: ReactNode }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    ApiService.initialize({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
      // Note: In Phase 2, we will wire up the mobile-specific token storage
      // (e.g. SecureStore) and refresh logic here via props.
    });
    initialized.current = true;
  }

  return <>{children}</>;
}
