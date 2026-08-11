import React, { useEffect, useState } from 'react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Helmet } from 'react-helmet-async';
import Cookies from 'js-cookie';

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

import { ThemeProvider } from '@prime/theme-provider/web';
import { LinkProvider, ShortcutProvider } from '@prime/ui';
import { RouterLinkAdapter } from '@/providers/RouterLinkAdapter';
import { ApiProvider } from '@/providers/ApiProvider';
import { AppLayout } from '../components/AppLayout';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const [initialBrand, setInitialBrand] = useState<any>('classic');
  const [initialDensity, setInitialDensity] = useState<any>('comfortable');
  const [initialMode, setInitialMode] = useState<any>('system');

  useEffect(() => {
    setInitialBrand(Cookies.get('prime-brand') || 'classic');
    setInitialDensity(Cookies.get('prime-density') || 'comfortable');
    setInitialMode(Cookies.get('prime-mode') || 'system');
  }, []);

  return (
    <>
      <Helmet>
        <title>Prime ERP</title>
        <meta name="description" content="Pro grade ERP" />
      </Helmet>
      <div className={`prime-density-${initialDensity} font-body min-h-screen`}>
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
