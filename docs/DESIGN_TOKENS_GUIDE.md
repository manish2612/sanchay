# DESIGN_TOKENS_GUIDE.md

## Purpose

This document defines the **design tokens strategy** for this project.

The design-tokens package is the **single source of truth** for all visual
design decisions across:

- Web (Radix UI based components)
- Mobile (React Native components)

This guide is used for:
- Team member onboarding
- Enforcing architectural consistency
- AI agent instructions for safe code generation

---

## Core Objective

> **Change a token in one place → UI updates everywhere.**

No platform (web or mobile) is allowed to define visual values independently.

---

## Architectural Positioning

Design tokens sit at the **lowest layer** of the UI system.

```
design-tokens (this package)
        ↓
theme adapters (web / native)
        ↓
Radix UI components (web)
React Native components (mobile)
```

Components are **never allowed** to hardcode colors, spacing, typography,
radii, or shadows.

---

## Theme Specification Standard

### Base Specification

The token structure is **strictly aligned** with the  
**Theme UI Theme Specification**:

https://theme-ui.com/theme-spec

Important clarifications:

- Theme UI is **not** used as a runtime library
- Only the **theme object shape and naming conventions** are adopted
- This ensures:
  - Industry standard structure
  - Predictable semantics
  - AI-friendly consistency
  - Future extensibility

---

## Scope of design-tokens Package

### What This Package Contains

- Theme tokens only
- No platform assumptions
- No styling implementation details

### What This Package Does NOT Contain

- React components
- React Native components
- Radix primitives
- CSS / Tailwind classes
- Platform-specific logic

This package must remain **pure, deterministic, and platform-agnostic**.

---

## Token Organization Rules

### File Structure (Conceptual)

The design-tokens package **will contain separate files per token category**.

Examples (non-exhaustive):
- colors
- spacing
- typography
- radii
- shadows
- z-index
- sizes

⚠️ **This document does NOT define or include those files.**  
File generation will be handled later via an AI coding agent.

This guide only defines **rules and structure**, not implementation.

---

## Token Naming Principles

### 1. Semantic Naming Only

Tokens must describe **intent**, not usage.

✔ Allowed:
- `primary`
- `background`
- `muted`
- `danger`
- `border`

✘ Not allowed:
- `buttonBlue`
- `headerBg`
- `cardShadow`

Components decide *how* tokens are used.

---

### 2. No Component Coupling

Tokens must never reference:
- Button
- Input
- Modal
- Card
- Table

Tokens describe **design language**, not UI structure.

---

## Light and Dark Theme Strategy

### Mandatory Requirement

The design-tokens package must support **at least two base themes**:

- `light`
- `dark`

These themes must share the **same token keys**, differing only in values.

Keys **must never change** between light and dark.

---

### Theme Switching Rule

- Theme switching is handled **outside** this package
- Consumers (web / RN) choose which theme object to apply
- Tokens themselves contain **no runtime logic**

---

## Future: Multi-Brand / Multi-Tenant Theming

This system must scale to support:

- Multiple brands
- White-label deployments
- Client-specific themes
- Vertical-specific branding (future ERP modules)

### Required Design Constraint

All themes must conform to the **same base token schema**.

Conceptual model:

```
base-theme
   ├─ light
   └─ dark

brand-a
   ├─ light
   └─ dark

brand-b
   ├─ light
   └─ dark
```

Rules:
- Token keys are shared across all brands
- Only values may differ
- No brand may introduce new token categories arbitrarily

---

## Theme Assembly Responsibility

The design-tokens package exports **theme objects only**.

It does NOT:
- Convert tokens to CSS variables
- Apply tokens to components
- Handle media queries
- Handle device settings

Those responsibilities belong to **theme adapters**, not tokens.

---

## Consumption Contract

### Web (Radix UI)

- Tokens are converted to CSS variables
- Radix primitives read from those variables
- Radix remains unstyled and token-driven

### React Native

- Tokens are consumed as plain JS values
- Provided via a Theme Provider
- Styles derive only from tokens

---

## Non-Negotiable Rules

1. Tokens must follow Theme UI spec
2. Tokens must be semantic
3. Tokens must be platform-agnostic
4. Light and dark themes must stay in sync
5. Future brands must reuse the same schema
6. Components must never define design values

---

## Summary

The `design-tokens` package is the **foundation of the UI system**.

If this layer is correct:
- Web and Mobile stay visually aligned
- Themes scale cleanly
- Components remain simple
- The system survives growth
