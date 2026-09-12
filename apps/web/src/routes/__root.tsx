import React, { Suspense } from 'react';
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

import { AppLayout } from '../components/AppLayout';
import { AppProvider } from '@/providers/AppProvider';

// Zero-bundle strategy: lazy load the devtools only in development
const MockDevTools = import.meta.env.DEV 
  ? React.lazy(() => import('../mocks/components/MockDevTools'))
  : () => null;

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Helmet>
        <title>Prime ERP</title>
        <meta name="description" content="Pro grade ERP" />
      </Helmet>
      <div className="font-body min-h-screen">
        <AppProvider>
          <AppLayout>
            <Outlet />
          </AppLayout>
          {import.meta.env.DEV && (
            <Suspense fallback={null}>
              <MockDevTools />
            </Suspense>
          )}
        </AppProvider>
      </div>
    </>
  );
}
