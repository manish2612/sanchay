# UI System Design

## Purpose

This document defines the **shared UI system** used across:
- Web (Next.js)
- Mobile (React Native)

The UI system ensures:
- Visual consistency
- Cross-platform reuse
- Clear separation from business logic

---

## Core Principle

> **UI components are presentation-only.  
> They never own business rules or navigation logic.**

---

## Scope of the UI System

The UI system includes:
- Primitives (Button, Text, Input)
- Layout components (Stack, Grid, Container)
- Theme tokens (colors, spacing, typography)
- Interaction patterns

The UI system does **not** include:
- API logic
- Business rules
- Domain state
- Navigation decisions
- Feature decisions

---

## Platform-Specific Files

Component differences are handled using file extensions:

- Component.tsx
- Component.web.tsx
- Component.native.tsx

Bundlers resolve the correct file at build time.
Unused platform files are excluded from the final bundle.

---

## Navigation Strategy (Shared Code)

Shared code **must not perform navigation directly**. Importing `next/link` or `expo-router` inside `packages/ui` will strictly break cross-platform compatibility and lock the system into a specific framework.

### Recommended Pattern: The Callback Approach ("Solution 1")

Instead of the component deciding *how* to navigate, it just signals *that* an action occurred. The parent component (living in the specific App) injects the navigation logic.

#### 1. Why? (The Problem)
- **Framework Locking**: If you import `next/link`, your component cannot work in Expo.
- **Maintenance Hell**: Moving from one router (e.g., Next.js Pages) to another (e.g., TanStack Start) would require rewriting every single UI component.
- **Testing**: It is easier to test `onPress={() => jest.fn()}` than mocking a complex router context.

#### 2. What? (The Implementation)
**In Shared Package (`packages/ui/src/UserCard.tsx`):**
Define a clear "contract" using props.
```tsx
type UserCardProps = {
  name: string;
  onViewProfile: (id: string) => void; // ✨ The Contract
};

export const UserCard = ({ name, onViewProfile }: UserCardProps) => (
  // Web uses onClick, Native uses onPress
  <div onClick={() => onViewProfile('123')}>
    View Profile
  </div>
);
```

**In The App (`apps/web` or `apps/mobile`):**
Inject the actual router.
```tsx
// apps/web/page.tsx
const router = useRouter();
<UserCard onViewProfile={(id) => router.push(`/users/${id}`)} />

// apps/mobile/screen.tsx
const router = useRouter();
<UserCard onViewProfile={(id) => router.push(`/users/${id}`)} />
```

#### 3. Future Implications
- **TanStack Start Migration**: If we migrate from Next.js to anything else, **zero** changes are needed in `packages/ui`. We only update the adapter at the App layer.
- **Flexibility**: We can easily swap out navigation libraries without touching UI code.

---

## Folder Structure

packages/ui/
- primitives/
- layout/
- theme/
- index.ts

---

## Design Tokens

Theme specification standards to follow: https://theme-ui.com/theme-spec

Rules:
- Tokens are platform-agnostic
- Tokens are the single source of truth
- UI components consume tokens, not hardcoded values

- UI components consume tokens, not hardcoded values

### Typography
- **Body**: IBM Plex Sans (Light, Regular, Medium, Italic)
- **Heading**: Work Sans (Medium, SemiBold, Bold)
- **Architecture**:
  - Tokens use CSS Variables (e.g., `var(--font-ibm-plex-sans)`).
  - **Web**: Maps to `next/font` injected variables.
  - **Mobile**: Maps to Native Font Family names via `theme-adapters`.

---

## Density Strategy

User Interfaces must support multiple information densities: "Comfortable" (Default), "Compact", and "Spacious".

Rules:
- **No Hardcoded Values**: All spacing and sizes must use `theme.spacing` and `theme.sizes`.
- **Density Awareness**: Components should scale their padding, line-height, and height based on the active density.
- **Strict Fallbacks**: If a density definition is missing, tokens must fallback to "Comfortable".

Implementation Detail:
- Density is handled at the **Provider** level.
- Components receive "resolved" tokens (e.g., `spacing[1]` is `4px` or `2px`).
- Do NOT perform logic like `if (density === 'compact')` inside components unless absolutely necessary (for layout shifts). Prefer token consumption.

### Minimal Implementation Examples

#### 1. Web (Next.js)
Using CSS Variables (Zero Runtime Cost):
```tsx
import { useTheme } from '@prime/theme-provider';

// Usage in Standard Web Component
export const WebCard = () => {
  const { theme } = useTheme();
  
  return (
    <div style={{
      // theme.spacing[4] resolves to "var(--spacing-4)"
      padding: theme.spacing[4],
      borderRadius: theme.radii.md,
      border: `1px solid ${theme.colors.border}`,
      // theme.sizes.cardHeight resolves to "var(--sizes-cardHeight)"
      height: theme.sizes.cardHeight, 
    }}>
       Content
    </div>
  );
};
```

#### 2. Mobile (React Native)
Using Run-Time Numbers:
```tsx
import { View, StyleSheet } from 'react-native';
import { useTheme } from '@prime/theme-provider';

export const NativeCard = () => {
  const { theme } = useTheme();
  // Safe cast for TypeScript (since tokens are converted to numbers at runtime)
  const t = theme as any;

  return (
    <View style={{
      // t.spacing[4] resolves to literal number 16 (if comfortable) or 12 (if compact)
      padding: t.spacing[4],
      borderRadius: t.radii.md,
      height: t.sizes.cardHeight,
      backgroundColor: t.colors.surface
    }}>
       {/* Content */}
    </View>
  );
};
```

#### 3. Universal / Expo Web
Using `react-native-web` (Shared Code):
```tsx
import { View } from 'react-native';
import { useTheme } from '@prime/theme-provider';

export const UniversalCard = () => {
  const { theme } = useTheme();
  const t = theme as any;

  return (
    <View style={{
       // Works on both:
       // - Web: RN Web converts numbers to px or uses its own style engine
       // - Native: Uses numbers directly
       padding: t.spacing[4],
       height: t.sizes.cardHeight,
    }}>
       {/* Content */}
    </View>
  );
};
```

---

## State Inside UI Components

Allowed:
- Local UI state (hover, focus, open/close)

Disallowed:
- Business state
- Shared application state
- API-driven state

---

## Storybook

Storybook is used to:
- Develop UI in isolation
- Document component behavior
- Prevent visual regressions

Rules:
- Primary ownership is `packages/ui`
- Non-UI components may be rendered only as demos or mocks
- Storybook never ships to production

---


---

## Future-Proofing Guidelines (Critical)

To ensure the codebase can migrate between frameworks (e.g., Next.js → TanStack Start) or platforms (Web → Mobile) with minimal effort, strict rules apply to **Environment Variables**, **Images**, and **Data Fetching**.

### 1. Environment Variables
**The Trap:** Accessing `process.env.NEXT_PUBLIC_*` or `import.meta.env.*` directly throughout the UI code locks you into a specific bundler.

**The Solution:**
Centralize all environment access in `@prime/config`.
- **DO NOT** use `process.env` in `packages/ui`.
- **DO** import from a shared config object.

```typescript
// packages/config/src/env.ts
export const Env = {
  // Graceful fallback for different bundlers
  API_URL: process.env.NEXT_PUBLIC_API_URL || process.env.EXPO_PUBLIC_API_URL || '',
};

// Usage
import { Env } from '@prime/config';
console.log(Env.API_URL);
```

### 2. Images and Assets
**The Trap:** `next/image` does not work in Expo or other web frameworks. Using it in shared packages breaks the mobile app.

**The Solution:**
Use a "Universal Image" wrapper in `packages/ui`.
- **Default:** Use standard `<img>` tags (most portable).
- **Optimization:** If needed, inject the optimized component (NextImage / ExpoImage) via a Provider, similar to the Link pattern.

```tsx
// packages/ui/src/primitives/Image.tsx
export const UniversalImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
  // Simple, works everywhere
  return <img {...props} />;
};
```

### 3. Data Fetching & Business Logic
**The Trap:** Writing database queries or API calls directly inside React Components (`apps/web/...`). This couples your "View" to your "Framework" (e.g., Next.js Server Actions).

**The Solution:**
Logic lives in **Pure Functions** in `packages/api` or `packages/lib`.
- **DO NOT** write `await db.query()` inside a UI component.
- **DO** write `await getUserById(id)` where `getUserById` is a pure Typescript function imported from a package.

**Flow:**
1.  **Package (`packages/api`)**: `export const getUser = async (id) => db.find(...)`
2.  **App (Next.js)**: Server Component calls `await getUser(id)`.
3.  **App (TanStack)**: Loader calls `await getUser(id)`.

---

## Architectural Invariant

If a UI component performs navigation or knows business logic,
the UI system is broken.
