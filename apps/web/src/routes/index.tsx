import { createFileRoute, redirect } from '@tanstack/react-router';

/**
 * Index route "/" — immediately redirects to /dashboard at the router level.
 *
 * WHY `beforeLoad` redirect instead of a component-level `<Navigate>`:
 *   A component-level <Navigate> fires inside React's render cycle, AFTER the
 *   router has matched the route and potentially after AppLayout has already
 *   started its async initialization. This creates a race between:
 *     1. The auth initialization spinner (isInitializing: true)
 *     2. The <Navigate> trying to change the URL to /dashboard
 *   ...causing a URL flicker loop at "/" in development.
 *
 *   A `beforeLoad` redirect is SYNCHRONOUS and fires at the ROUTER level before
 *   any React component renders. The router resolves "/" → "/dashboard" in one
 *   step, so AppLayout always mounts with the correct final URL (/dashboard),
 *   and the initialization runs cleanly from a stable starting URL.
 */
export const Route = createFileRoute('/')(({
  beforeLoad: () => {
    throw redirect({ to: '/dashboard' });
  },
}));
