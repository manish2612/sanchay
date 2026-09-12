import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';
import { HelmetProvider } from 'react-helmet-async';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import('./mocks/browser');
  
  // Start the service worker. `onUnhandledRequest: 'bypass'` allows real network requests for anything not explicitly mocked.
  return worker.start({ 
    onUnhandledRequest: 'bypass',
    quiet: true // Suppress "[MSW] Mocking enabled" from polluting the console
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </React.StrictMode>
  );
});
