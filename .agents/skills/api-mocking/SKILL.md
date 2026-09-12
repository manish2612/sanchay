---
name: api-mocking
description: >-
  Trigger this skill to automatically scaffold and configure a MSW (Mock Service Worker) API mock for a new or existing endpoint, fully integrated with the Mock DevTools UI and RTK Query types.
---

# API Mocking Expert Persona

You are an expert at creating robust, type-safe API mocks using MSW (Mock Service Worker) for local development, seamlessly integrated into our custom Mock DevTools panel.

## Workflow for Scaffolding a New Mock

When tasked with mocking an API, you must adhere strictly to the **Domain-Driven Module Architecture**. Do NOT create flat monolithic handler files.

### 1. Identify the Types and Endpoint
- Locate the existing RTK Query endpoint definition (e.g., in `features/<Feature>/api.ts`).
- Extract the exact `Request` and `Response` types (e.g., `LoginRequest`, `LoginResponse`).
- Identify the exact API path being mocked (e.g., `*/auth/signin`).
- Determine the domain for this mock (e.g., `auth`, `inventory`).

### 2. Scaffold Domain Structure
Mocks are organized into domain folders (`apps/web/src/mocks/domains/<domain>/`).
If the domain folder does not exist, create it along with:
1. `registry.ts`: The decentralized configuration for this domain.
2. `index.ts`: The central export file for the domain's handlers array.
3. `<endpoint>.ts`: The specific file for your new mock handler.

### 3. Update the Domain Registry
- Open or create `apps/web/src/mocks/domains/<domain>/registry.ts`.
- Add the new endpoint to the domain's registry object, defaulting to `false`.
  ```typescript
  export const <domain>Registry = {
    myNewEndpoint: false,
  };
  ```
- If this is a **new domain**, wire its registry into `apps/web/src/mocks/store/mockConfig.ts` by adding it to `defaultRegistry`. (TypeScript will automatically infer the global type!).

### 4. Implement the Handler Logic
- Create a dedicated file for the endpoint (e.g., `apps/web/src/mocks/domains/<domain>/<endpoint>.ts`).
- Import `http`, `HttpResponse`, and `delay` from `msw`.
- Import `isMockEnabled` from `../../store/mockConfig`.
- **CRITICAL BYPASS**: The very first line of the handler resolver MUST conditionally bypass the mock if disabled.
  ```typescript
  if (!isMockEnabled('<domain>', '<endpoint>')) return;
  ```
- **Type Safety**: Strictly type the resolver using the types extracted in step 1.
  ```typescript
  export const myHandler = http.post<never, RequestType, ResponseType>('*/path', async ({ request }) => { ... })
  ```
- **Dynamic & Realistic Responses**: Generate realistic, dynamic mock data.
- **Delay**: Always apply a realistic network delay (e.g., `await delay(800)`).

### 5. Wire the Handler
- Export the newly created handler from `apps/web/src/mocks/domains/<domain>/index.ts` within the domain's handler array.
- If this is a **new domain**, register the domain's array in `apps/web/src/mocks/handlers.ts`.

### 6. Verification
- The developer will confirm the new toggle appears in the DevTools UI.
- The developer will confirm that toggling it ON intercepts the request with strongly typed data, and toggling it OFF hits the real API.
