/**
 * Mobile API Provider — Phase 3 placeholder.
 *
 * The mobile app's API registry will be set up here in Phase 3 when
 * RTK Query + Redux is introduced for mobile. For now, the mobile app
 * creates its registry on-demand in individual screens (e.g. login.tsx).
 *
 * TODO (Phase 3): Create apps/mobile/store/api.ts with createApiRegistry,
 * add a Redux Provider here, and remove per-screen registry creation.
 */
import { ReactNode } from 'react';

export function ApiProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
