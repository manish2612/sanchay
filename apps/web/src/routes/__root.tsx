import React from 'react';
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
        </AppProvider>
      </div>
    </>
  );
}
