# Font Architecture & Migration Guide

This document explains the font architecture in the Sanchay ERP system and provides step-by-step instructions for migrating to different technology stacks in the future.

## Architecture

The UI system uses a **Dependency Injection** pattern for fonts to ensure platform independence:

1.  **Tokens (`packages/design-tokens`)**: Define fonts using abstract IDs (CSS Variables).
    ```typescript
    fontFamily: {
        body: "var(--font-ibm-plex-sans), ...",
        heading: "var(--font-work-sans), ...",
    }
    ```
2.  **Adapters (`packages/theme-adapters`)**: Map these IDs to platform specifics.
    -   **Web**: Keeps the variable name (e.g., `var(--font-ibm-plex-sans)`).
    -   **Native**: Intercepts the variable and returns the Family Name (e.g., `"IBM Plex Sans"`).
3.  **Loaders (App Layer)**: Responsible for actually loading the font files.
    -   **Next.js**: Uses `next/font/google`.
    -   **Expo**: Uses `@expo-google-fonts` + `expo-font`.

---

## Migration Guides

### 1. Migrating from Next.js to Generic Web (Vite, Remix, Plain HTML)

If you move the web app to a stack that doesn't support `next/font`, you only need to change **how the font is loaded**. The UI components and Tokens do NOT change.

**Step 1: Download Font Files**
Download the `.woff2` files for IBM Plex Sans and Work Sans (e.g., from Google Fonts) and place them in your plain `public/fonts` directory.

**Step 2: Add Standard CSS**
Create a global CSS file (e.g., `fonts.css`) and define the variables explicitly.

```css
/* fonts.css */
@font-face {
  font-family: 'IBM Plex Sans';
  src: url('/fonts/ibm-plex-sans-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
}
/* ... match all weights you need ... */

:root {
  /* CRITICAL: This variable name must match what is in standard-tokens/typography.ts */
  --font-ibm-plex-sans: 'IBM Plex Sans', sans-serif;
  --font-work-sans: 'Work Sans', sans-serif;
}
```

**Step 3: Import CSS**
Import this CSS file in your main entry point (e.g., `main.tsx` or `index.html`).

**Result**: The Token Adapter will continue to output `font-family: var(--font-ibm-plex-sans)`, which now resolves to your standard CSS definition.

---

### 2. Migrating from Expo Go to Bare React Native

If you eject from Expo or move to a bare CLI workflow, you will switch from "Runtime Loading" to "Native Linking".

**Step 1: Download Font Files**
Download `.ttf` files for IBM Plex Sans and Work Sans.

**Step 2: Add to Native Projects**
-   **Android**: Copy `.ttf` files to `android/app/src/main/assets/fonts`.
-   **iOS**: Add `.ttf` files to the Xcode project and update `Info.plist` with the font filenames.

**Step 3: Remove Expo Loaders**
In `apps/mobile/app/_layout.tsx`:
-   Remove `useFonts` hook.
-   Remove `@expo-google-fonts/*` dependencies.

**Step 4: Verify Names**
Ensure the "Family Name" of the `.ttf` files matches what the Adapter expects.
-   The Adapter maps `var(--font-ibm-plex-sans)` -> `"IBM Plex Sans"`.
-   Verify your font files are recognized as "IBM Plex Sans" by the OS (standard behavior).
-   If you need to change the mapped name, update `packages/theme-adapters/src/native/index.ts`.

**Result**: React Native will look for "IBM Plex Sans" and find the system-linked font. No UI code changes required.
