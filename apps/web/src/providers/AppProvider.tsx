import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, THEME_STORAGE_KEYS } from '@prime/theme-provider/web';
import {
  LinkProvider,
  ShortcutProvider,
  TooltipProvider,
  ToastProvider,
  ToastViewport,
} from '@prime/ui';
import { RouterLinkAdapter } from './RouterLinkAdapter';
import { GlobalMasterSheetProvider } from '@/features/Masters/components/MasterFormSheet/MasterFormSheetContext';
import { MasterFormSheet } from '@/features/Masters/components/MasterFormSheet/MasterFormSheet.dom';
import { store } from '@/store';

interface AppProviderProps {
  children: React.ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [initialBrand] = useState<any>(
    () => localStorage.getItem(THEME_STORAGE_KEYS.BRAND) || 'classic',
  );
  const [initialDensity] = useState<any>(
    () => localStorage.getItem(THEME_STORAGE_KEYS.DENSITY) || 'comfortable',
  );
  const [initialMode] = useState<any>(
    () => localStorage.getItem(THEME_STORAGE_KEYS.MODE) || 'system',
  );

  return (
    <Provider store={store}>
      <ThemeProvider
        initialBrand={initialBrand}
        initialMode={initialMode}
        initialDensity={initialDensity}
      >
        <ShortcutProvider>
          <TooltipProvider>
            <ToastProvider>
              <GlobalMasterSheetProvider>
                <LinkProvider value={RouterLinkAdapter}>
                  {children}
                  <MasterFormSheet />
                  <ToastViewport />
                </LinkProvider>
              </GlobalMasterSheetProvider>
            </ToastProvider>
          </TooltipProvider>
        </ShortcutProvider>
      </ThemeProvider>
    </Provider>
  );
}
