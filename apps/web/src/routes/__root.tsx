import React, { useEffect, useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';

import '../globals.css';
import '@fontsource/ibm-plex-sans/300.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/300-italic.css';
import '@fontsource/ibm-plex-sans/400-italic.css';
import '@fontsource/ibm-plex-sans/500-italic.css';
import '@fontsource/work-sans/400.css';
import '@fontsource/work-sans/500.css';
import '@fontsource/work-sans/600.css';
import '@fontsource/work-sans/700.css';

import { ThemeProvider, THEME_STORAGE_KEYS } from '@prime/theme-provider/web';
import { LinkProvider, ShortcutProvider } from '@prime/ui';
import { RouterLinkAdapter } from '@/providers/RouterLinkAdapter';
import { ApiProvider } from '@/providers/ApiProvider';
import { AppLayout } from '../components/AppLayout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [initialBrand] = useState<any>(() => localStorage.getItem(THEME_STORAGE_KEYS.BRAND) || 'classic');
  const [initialDensity] = useState<any>(() => localStorage.getItem(THEME_STORAGE_KEYS.DENSITY) || 'comfortable');
  const [initialMode] = useState<any>(() => localStorage.getItem(THEME_STORAGE_KEYS.MODE) || 'system');

  return (
    <>
      <Helmet>
        <title>Prime ERP</title>
        <meta name="description" content="Pro grade ERP" />
      </Helmet>
      <div className="font-body min-h-screen">
        <ThemeProvider
          initialBrand={initialBrand}
          initialMode={initialMode}
          initialDensity={initialDensity}
        >
          <ShortcutProvider>
            <ApiProvider>
              <LinkProvider value={RouterLinkAdapter}>
                <AppLayout>
                  <Outlet />
                </AppLayout>
              </LinkProvider>
            </ApiProvider>
          </ShortcutProvider>
        </ThemeProvider>
      </div>
    </>
  );
}
