# Troubleshooting: Web "Element type is invalid" / 500 Error

## Problem Description
When running the Web app (Next.js/Expo Web), the application crashes (often with a 500 error page in production or a red error overlay in development) with:
```
Uncaught Error: Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: undefined.
```
This typically usually points to a component being imported as `undefined`.

## Root Cause
The package's entry point (e.g., `src/index.ts`) contained **only type definitions** (`export declare ...`) and no runtime code.
```typescript
// BAD: No runtime implementation exported
export declare const ThemeProvider: (props: any) => any;
```
When the bundler resolved this file, the named exports (like `ThemeProvider`) were `undefined` at runtime, causing React to crash when trying to render them.

## Solution
Ensure the main entry point exports the actual implementation.

### 1. Re-export Implementation
Update `src/index.ts` to export the actual runtime code from the platform-specific file (or define it inline).
```typescript
// GOOD: Exports runtime code
export * from './types';
export * from './web'; // Re-exports the Web implementation as default
```

### 2. Verify `main` Field
Ensure `package.json`'s `main` field points to a file that contains or re-exports runtime code.
```json
{
  "main": "./src/index.ts" 
}
```
(Where `src/index.ts` has the exports mentioned above).
