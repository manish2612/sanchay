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
