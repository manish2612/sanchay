# Troubleshooting: Native App Loading Web Code

## Problem Description
When running the mobile app (Expo/Android/iOS), the app crashes with an error similar to:
```
Invariant Violation: View config getter callback for component script must be a function (received undefined). Make sure to start component names with a capital letter.
```
or errors related to HTML elements like `div`, `span`, or `script` not being valid React Native components.

## Root Cause
The Native bundler (Metro) key was resolving imports to the Web implementation of a package instead of the Native implementation. This happened because:
1.  **`package.json` Misconfiguration**: The `react-native` field pointed to a generic entry point (e.g., `./src/index.ts`) which the bundler resolved to the Web-default export.
2.  **`tsconfig.json` Paths Override**: The `apps/mobile/tsconfig.json` had a path alias (e.g., `"@sanchay/*": ["../../packages/*/src/index.ts"]`) that forced resolution to a specific file, bypassing the `package.json` resolution logic entirely.

## Solution

### 1. Create Platform-Specific Entry Points
Ensure the package has dedicated entry points for each platform:
-   `src/index.ts` (Web/Default)
-   `src/index.native.ts` (Native)

### 2. Configure `package.json`
Explicitly point the `react-native` top-level field to the native entry file.
```json
{
  "main": "./src/index.ts",
  "react-native": "./src/index.native.ts",
  "exports": {
    "react-native": "./src/index.native.ts",
    "default": "./src/index.ts"
  }
}
```

### 3. Fix `tsconfig.json` Paths
Update `apps/mobile/tsconfig.json` to point to the package **directory** instead of a specific file. This allows the bundler/runtime to use `package.json` to resolve the correct file.
```json
{
  "compilerOptions": {
    "paths": {
      "@sanchay/*": ["../../packages/*"]
    }
  }
}
```
*Incorrect:* `"@sanchay/*": ["../../packages/*/src/index.ts"]`
