'use client';

import { ApiService } from '@prime/services';
import type { ITokenStorage, RefreshTokenCallback } from '@prime/api';
import { ReactNode, useRef } from 'react';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

type ApiProviderProps = {
  children: ReactNode;
  /**
   * Optional token storage implementation to inject into the API engine.
   * If omitted, the engine operates without JS-accessible token attachment
   * (suitable for HttpOnly cookie-based auth where the browser handles everything).
   */
  tokenStorage?: ITokenStorage;
  /**
   * Optional callback the engine will invoke when a 401 is received.
   * Should perform the token refresh and update `tokenStorage` with the new token.
   */
  onRefreshToken?: RefreshTokenCallback;
  /**
   * Optional callback invoked when the refresh itself fails (e.g. refresh token expired).
   * Use this to force-logout the user and redirect to the login screen.
   */
  onUnauthorized?: () => void;
};

export function ApiProvider({
  children,
  tokenStorage,
  onRefreshToken,
  onUnauthorized,
}: ApiProviderProps) {
  const initialized = useRef(false);

  if (!initialized.current) {
    ApiService.initialize({
      baseURL: API_BASE_URL,
      timeout: 30_000,
      headers: {
        'Content-Type': 'application/json',
      },
      tokenStorage,
      onRefreshToken,
      onUnauthorized,
    });
    initialized.current = true;
  }

  return <>{children}</>;
}
