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

Shared code **must not perform navigation directly**.

### How Navigation Is Triggered

- UI components emit **intent**, not navigation
- ERP modules call a **navigation abstraction**
- App shells bind that abstraction to platform navigation

### Example Pattern

- UI component → emits `onNavigate("invoiceDetails", id)`
- Module → calls `NavigationService.navigate(...)`
- App shell → maps route/screen to platform implementation

This keeps:
- UI reusable
- Modules platform-agnostic
- Navigation replaceable

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
import { useTheme } from '@sanchay/theme-provider';

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
import { useTheme } from '@sanchay/theme-provider';

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
import { useTheme } from '@sanchay/theme-provider';

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

## Architectural Invariant

If a UI component performs navigation or knows business logic,
the UI system is broken.
