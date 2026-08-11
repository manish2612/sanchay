import React, { useState, useEffect } from 'react';
import { ThemeProvider, THEME_STORAGE_KEYS } from '@prime/theme-provider/web';
import {
  LinkProvider,
  ShortcutProvider,
  TooltipProvider,
  ToastProvider,
  ToastViewport,
} from '@prime/ui';
import { RouterLinkAdapter } from './RouterLinkAdapter';
import { ApiProvider } from './ApiProvider';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [initialBrand] = useState<any>(() => localStorage.getItem(THEME_STORAGE_KEYS.BRAND) || 'classic');
  const [initialDensity] = useState<any>(() => localStorage.getItem(THEME_STORAGE_KEYS.DENSITY) || 'comfortable');
  const [initialMode] = useState<any>(() => localStorage.getItem(THEME_STORAGE_KEYS.MODE) || 'system');

  return (
    <ThemeProvider
      initialBrand={initialBrand}
      initialMode={initialMode}
      initialDensity={initialDensity}
    >
      <ShortcutProvider>
        <TooltipProvider>
          <ToastProvider>
            <ApiProvider>
              <LinkProvider value={RouterLinkAdapter}>
                {children}
                <ToastViewport />
              </LinkProvider>
            </ApiProvider>
          </ToastProvider>
        </TooltipProvider>
      </ShortcutProvider>
    </ThemeProvider>
  );
}
