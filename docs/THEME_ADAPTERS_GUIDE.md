# THEME_ADAPTERS_GUIDE.md

## Purpose

This document defines the **Theme Adapter layer** in the UI architecture.

Theme adapters are responsible for **translating design tokens into
platform-specific theme representations** that can be consumed by:

- Web UI (Radix UI primitives)
- Mobile UI (React Native components)

This guide is intended for:
- Team member onboarding
- Architectural enforcement
- AI coding agents generating adapters correctly and safely

---

## Position in Architecture

Theme adapters sit **between design tokens and UI components**.

```
design-tokens
        ↓
theme adapters
        ↓
Radix UI components (web)
React Native components (mobile)
```

Adapters are mandatory.  
UI components must never consume design tokens directly.

---

## Core Responsibility

> **Adapters translate tokens. They do not design UI.**

Theme adapters must:
- Consume `design-tokens`
- Output platform-compatible theme formats
- Maintain parity between web and mobile

Theme adapters must NOT:
- Contain UI components
- Implement business or domain logic
- Define visual variants or component behavior
- Hardcode any design values

---

## Adapter Types

This system defines **two primary theme adapters**:

1. Web Theme Adapter
2. React Native Theme Adapter

Both adapters:
- Consume the same token schema
- Support the same theme variants
- Expose platform-appropriate APIs

---

## Web Theme Adapter (Radix-Compatible)

### Purpose

The web theme adapter converts design tokens into **CSS variables** that are
consumed by **Radix UI primitives** and other web components.

Radix primitives remain:
- Unstyled
- Token-driven
- Decoupled from design decisions

---

### Responsibilities

The web adapter must:
- Generate CSS variables from design tokens
- Support light and dark themes
- Be extensible for future brand themes
- Provide a predictable mechanism for theme application
- Remain compatible with Radix primitives

---

### Explicit Non-Responsibilities

The web adapter must NOT:
- Import or wrap Radix components
- Use Radix Themes
- Define Tailwind or utility classes
- Apply component-level styling
- Introduce design decisions

---

### Output Contract (Conceptual)

The adapter outputs:
- A set of CSS variables per theme
- A mechanism to apply the active theme at the document or root level

Conceptual example (not code):
```
[data-theme="light"] → light theme CSS variables
[data-theme="dark"]  → dark theme CSS variables
```

Radix primitives must read **only** from these variables.

---

## React Native Theme Adapter

### Purpose

The React Native theme adapter converts design tokens into a **plain JavaScript
theme object** consumable by React Native components.

Because React Native does not support CSS variables:
- Tokens are exposed as JS values
- A Theme Provider is required

---

### Responsibilities

The React Native adapter must:
- Export theme objects (light, dark, future brands)
- Provide a Theme Provider
- Ensure all styling values originate from tokens
- Keep the theme deterministic and serializable

---

### Explicit Non-Responsibilities

The React Native adapter must NOT:
- Allow components to import design tokens directly
- Contain UI component logic
- Include platform logic unrelated to theming
- Define animations or layout behavior

---

### Output Contract (Conceptual)

The adapter outputs:
- Light theme object
- Dark theme object
- A provider to expose the active theme to components

Components consume theme values only, never raw tokens.

---

## Light and Dark Theme Handling

### Rules

- Both adapters must support light and dark themes
- Token keys must be identical across themes
- Only token values may differ

Theme switching:
- Is handled outside the adapters
- Is driven by application-level state
- Must not mutate design tokens

---

## Future: Multi-Brand and Multi-Tenant Support

Theme adapters must be designed to scale for:
- Multiple brands
- White-label deployments
- Client-specific themes
- Vertical-specific branding

### Required Constraint

All brands must:
- Share the same token schema
- Use the same adapter logic
- Differ only by token values

Conceptual structure:
```
design-tokens
  ├─ base
  ├─ brand-a
  └─ brand-b

theme-adapters
  ├─ web
  └─ native
```

Adapters must not contain brand-specific conditionals.

---

## Consumption Rules (Strict)

### Allowed

UI components may import from:
- Web theme adapter
- React Native theme adapter

### Forbidden

UI components must never import:
- `design-tokens`
- Individual token files
- Hardcoded design values

Violating this rule breaks cross-platform consistency.

---

## Validation and Smoke Testing

Before building any UI components:

Web:
1. Apply web theme adapter
2. Toggle light/dark theme
3. Verify CSS variables update correctly

React Native:
1. Apply native theme adapter
2. Toggle theme
3. Verify theme object updates correctly

Only after these checks pass should UI components be implemented.

---

## Explicitly Out of Scope

Theme adapters do not handle:
- Component variants
- Interaction states
- Animations
- Layout logic
- Business rules

These belong exclusively to the component layer.

---

## Summary

Theme adapters are the **critical translation layer** that ensure:

- Design tokens remain the single source of truth
- Web and mobile stay visually aligned
- Radix UI and React Native remain interoperable
- The system scales safely for ERP-level growth

If adapters are correct:
- Components stay simple
- Themes evolve safely
- Technical debt is minimized

**Do not bypass this layer.**
