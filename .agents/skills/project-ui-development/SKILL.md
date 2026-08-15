---
name: project-ui-development
description: Project specific UI development guidelines. Extends react-best-practices-M2 with rules for routing architecture, Lucide icons, responsive design, and accessibility. Trigger for any UI development.
---

# UI Development Guidelines for ERP-FE

This skill extends the core React rules (`react-best-practices-M2`) with project-specific UI directives. ALWAYS adhere to these rules when developing or modifying UI components.

## Core Directives

- **Inherit React Best Practices**: Always follow all architectural, styling, component structure, and composition rules defined in the `react-best-practices-M2` skill.

## 1. Iconography (Lucide Icons)

- Use **Lucide React** icons correctly wherever required.
- Do NOT change icon names randomly unless the task explicitly asks for it.
- Ensure the exact requested icon name is used to maintain consistency.

## 2. Design System and Density

- UI must be designed according to the existing design system and density guidelines of the project.
- Match existing components' padding, margins, font sizes, colors, and layout density to ensure a cohesive look.

## 3. Responsive Design Support

- **Tablet and Above**: Tablet and larger screens MUST always be supported. Responsive UI is mandatory.
- **Mobile Support**: Mobile should be supported where complexity is medium (e.g., login screens, simple forms, screens displaying up to 4-column tables, changing a sidebar to a drawer on smaller screens).
- **Mobile Exceptions**: Mobile is NOT expected to support overly complex UI layouts that will break or become unusable (e.g., data tables with too many columns, highly complex multi-panel views).
- **Doubt Escalation**: If there is any doubt about whether a specific UI element should be responsive on mobile, you MUST specifically ASK or INFORM the user before proceeding.

## 4. Accessibility (a11y)

- **Keyboard Navigation**: Everything MUST be fully usable with a keyboard.
- Ensure proper focus states are visible.
- Use semantic HTML elements properly (e.g., `<button>` for actions, `<a>` for navigation).
- Add necessary ARIA attributes to custom interactive elements to support keyboard and screen reader users fully.

## 5. Routing Architecture & Route Standards (TanStack Router)

- **Centralized Route Layer (`apps/web/src/routes/`)**:
  - All route definitions MUST live inside `apps/web/src/routes/`.
  - Never define routes or call `createFileRoute` inside feature directories.
- **Thin Route Pattern**:
  - Files in `src/routes/` must remain **thin wrappers** dedicated solely to routing concerns: `createFileRoute`, route loaders, search parameter validation (Zod schemas), and auth/permission checks (`beforeLoad`).
  - Route files must NOT contain full page JSX, local UI state, or complex business logic.
- **Domain & UI Logic in Features (`apps/web/src/features/`)**:
  - The actual Page components, business logic, client queries/mutations (e.g. RTK Query hooks), forms, and subcomponents MUST live in `apps/web/src/features/<FeatureName>/...`.
  - The route file simply imports the Page component from `@/features/...` and passes it to `component`.
- **File-Based Routing Convention**:
  - Route paths in `createFileRoute('/...')` are strictly bound 1:1 to the file path under `src/routes/`.
  - When adding or moving a route, create the file at the exact target path (e.g., `src/routes/inventory/transactions/voucher-type/index.tsx` for `/inventory/transactions/voucher-type`).
  - After modifying routes, run the build/generator (`npm run build` in `apps/web`) to ensure `routeTree.gen.ts` updates and types are synced.

### Example Pattern:

**1. Feature Page Component** (`apps/web/src/features/inventory/pages/VoucherEntryPage.tsx`):
```tsx
export function VoucherEntryPage() {
  // Complex state, hooks, UI layout, subcomponents
  return <div>...</div>;
}
```

**2. Thin Route Definition** (`apps/web/src/routes/inventory/transactions/voucher-type/index.tsx`):
```tsx
import { createFileRoute } from '@tanstack/react-router';
import { VoucherEntryPage } from '@/features/inventory/pages/VoucherEntryPage';

export const Route = createFileRoute('/inventory/transactions/voucher-type/')({
  component: VoucherEntryPage,
});
```

## 6. API & State Management (RTK Query)

- **Modular Endpoint Injection**: To keep the architecture modular and prevent the root store from becoming a monolith, NEVER define endpoints directly in the root `apiSlice.ts`.
  - ALWAYS define endpoints in feature-specific files (e.g., `apps/web/src/features/posts/api.ts`).
  - Use `apiSlice.injectEndpoints({ endpoints: (build) => ({...}) })` to attach your feature's endpoints dynamically to the root API slice.
- **Use RTK Query Hooks in Components**: By default, NEVER use raw imperative API calls inside React components. ALWAYS prefer the auto-generated RTK Query React Hooks (e.g., `useGetPostsQuery()`, `useCreatePostMutation()`) exported from your feature's `api.ts`.
- **Unified Request Contract**: The `query` function in an endpoint MUST return the unified `ApiRequestArgs` shape: `{ url, method, body, params, client }`.
  - `body`: Maps to Axios request payload (JSON/FormData).
  - `params`: Maps to Axios URL query parameters.
  - `client`: (Optional) Specifies the backend to route to (e.g. `'MAIN'`, `'ADMIN'`). Falls back to `defaultClient` if omitted.
- **Cache Invalidation**: Use `providesTags` on queries and `invalidatesTags` on mutations to ensure the UI stays synchronized with server state without requiring manual refetches.
- **Co-locate Types**: Request and Response TypeScript interfaces should be co-located with the endpoint definitions in the feature's `api.ts` file.
- **Rare Case: Using the Direct API Utility**:
  - Only bypass RTK Query and use the direct API registry/utility (e.g., `createApiRegistry` or raw client) in rare, specific scenarios where RTK Query's caching and hook lifecycle are not appropriate.
  - Valid use cases for direct usage include:
    1. Imperative logic outside of React components (e.g., Redux middleware, background tasks, Web Workers).
    2. Non-standard authentication flows or token refreshes that require direct interceptor manipulation.
    3. Specialized streaming/SSE/WebSocket setups that don't fit into RTK Query's request model.
    4. Complex one-off data fetching scripts or utilities that are entirely disconnected from the UI state.
  - When you do use the direct API utility, ensure it utilizes the centralized API registry configuration rather than instantiating raw, disconnected Axios instances.
