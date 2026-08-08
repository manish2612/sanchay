# THEME_PROVIDERS.md

## Purpose

This document defines the **ThemeProvider layer** in the UI architecture. It ensures a single source of truth for runtime theme application while leveraging platform-specific optimizations like `next-themes` for Web (Next.js) and standard Context for Mobile (React Native).

## Position in the Architecture

ThemeProviders sit **above theme adapters and below UI components**.

```
design-tokens
        ↓
theme adapters
        ↓
ThemeProviders (this package)
        ↓
UI Components
```

---

## Package Strategy: Hybrid-Single Package

We use a single package (`packages/theme-provider`) with **Conditional Exports** to prevent the web bundler from attempting to compile native code.

### Recommended Package Structure

```
packages/theme-provider
├─ src
│  ├─ index.ts              // Unified entry point (Conditional)
│  ├─ types.ts              // Shared interfaces
│  ├─ web/
│  │  ├─ index.tsx          // Uses next-themes for SSR/FOUC prevention
│  │  └─ script-helpers.ts  // Blocking scripts for theme injection
│  └─ native/
│     ├─ index.native.tsx   // Standard React Context for mobile
│     └─ context.ts
├─ package.json             // Contains "exports" for platform isolation
└─ tsconfig.json
```

---

## Rules of Engagement: Provider vs. Component

To maintain a strict "Source of Truth," we enforce the following boundaries.

### ThemeProvider MUST:

- **Select the Theme**: Act as the brain that chooses which token set to load (Light/Dark/Brand).
- **Handle Injection**: On Web, inject CSS variables into the DOM. On Mobile, provide the theme object via Context.
- **Manage Persistence**: Remember user theme preferences (system, light, or dark) across sessions.
- **Expose Access**: Provide the `useTheme()` hook for components to check metadata (e.g., `isDark`).

### ThemeProvider MUST NOT:

- **Define Values**: It must never contain hardcoded hex codes or pixel values; it only "forwards" values from Adapters.
- **Style Components**: It should not contain CSS for specific buttons or layouts.
- **Contain Business Logic**: It is a purely visual infrastructure layer.

### UI Components MUST:

- **Consume via Hook**: Access theme metadata strictly through the provided `useTheme()` hook.
- **Rely on Plumbed Values**: On Web, rely on CSS variables (e.g., `var(--color-primary)`). On Mobile, use the object returned by the hook.

### UI Components MUST NOT:

- **Import Raw Tokens**: Never import from `@erp/design-tokens` directly.
- **Hardcode Theme Values**: No `color: '#000'` in component files.

---

## Web Implementation (Next.js & next-themes)

The Web provider wraps `next-themes` to prevent the **Flash of Unstyled Content (FOUC)** during SSR.

### Responsibilities

- **SSR Safety**: Utilize `next-themes` to inject the `data-theme` attribute on the server side.
- **Radix Alignment**: Ensure `data-theme` values match Radix UI expectation.

---

## React Native Implementation

Mobile relies on standard React Context to provide a unitless JS theme object.

### Responsibilities

- **Unitless Injection**: Fetch the unitless JS object from the **Native Theme Adapter**.
- **Reactivity**: Listen to `Appearance` changes to support system-level dark mode.

---

## Strict Platform Isolation (The Bundler Fix)

The `package.json` MUST use conditional exports to prevent build crashes:

```json
{
  "name": "@erp/theme-provider",
  "exports": {
    ".": {
      "native": "./src/native/index.native.tsx",
      "default": "./src/web/index.tsx"
    }
  }
}
```

---

## Validation Checklist

- [ ] Web: Toggle theme → `data-theme` updates on `<html>` without flash.
- [ ] Native: Toggle theme → Context updates and components re-render.
- [ ] Build: `npm run build` for Web does not trigger React Native module errors.
