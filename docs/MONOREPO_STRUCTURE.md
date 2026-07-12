# Monorepo Structure

## Purpose

This document defines the **physical and logical structure** of the Prime ERP frontend monorepo.

The structure is designed to:
- Enforce architectural boundaries
- Maximize code reuse
- Scale to large teams and large codebases
- Be understandable by humans and AI agents

---

## Top-Level Layout

prime/
- apps/
- packages/
- tooling/
- package.json
- tsconfig.base.json
- eslint.config.js
- README.md

---

## Navigation Ownership

Navigation is a **platform concern**.

Rules:
- Navigation libraries live only in app shells
- Shared code triggers navigation via abstraction only
- No module or UI component imports platform navigation APIs

This guarantees platform independence.

---

## apps/

apps/
├── web/
└── mobile/


### apps/web (Next.js)

Some of the responsibilities:
- Routing
- SSR / RSC
- SEO
- Web-only providers

Rules:
- May import from `packages/*`
- Must not export logic back to packages
- Must not contain Prime ERP business rules

---

### apps/mobile (React Native)

Some of the responsibilities:
- Navigation
- Native permissions
- Native lifecycle handling

Rules:
- Same rules as web app
- No Prime ERP logic
- No shared state ownership

---

## packages/

This is the **core of the system**.

packages/
├── ui/
├── modules/
├── hooks/
├── services/
├── state/
├── offline/
├── config/
├── types/
└── debug/


---

## packages/ui/

Purpose:
- Shared UI system across web and mobile

Sample Structure:
ui/
├── primitives/
├── layout/
├── theme/
└── index.ts


Rules:
- Use platform files where required
- No business logic
- No API calls
- No state ownership beyond local UI state

---

## packages/modules/

Purpose:
- Prime ERP business domains

Sample Structure:
modules/
├── auth/
├── sales/
├── accounting/
├── inventory/
└── reports/


Each module may contain:
- API usage
- Domain state
- Domain components
- Screens

Rules:
- Modules must not depend on apps
- Modules must not access platform APIs
- Modules must not manage navigation directly

---

## packages/hooks/

Purpose:
- Cross-cutting reusable logic

Some of the examples:
- Auth helpers
- Permissions
- Feature flag readers
- Utility hooks

Rules:
- No platform assumptions
- No side effects without explicit intent

---

## packages/services/

Purpose:
- Infrastructure layer

Some of the includes:
- API client
- Auth handling
- Storage abstraction
- Network abstraction

Rules:
- Platform differences handled via adapters
- Prime ERP modules consume services, not implementations

---

## packages/state/

Purpose:
- Shared global state

Sample use cases:
- Auth
- User
- Settings
- Cached data

Rules:
- No business rules
- No API orchestration
- Optional persistence only

---

## packages/offline/

Purpose:
- Optional offline-first infrastructure

Contains:
- Offline engine
- Sync manager
- Mutation queue
- Conflict resolution strategies

Rules:
- Must be invisible to Prime ERP modules
- Must be disabled by default
- Must introduce zero overhead when disabled

---

## packages/config/

Purpose:
- Centralized configuration

Includes:
- Environment config
- Feature toggles
- Build-time flags

Rules:
- Typed access only
- No direct env access in modules

---

## packages/types/

Purpose:
- Shared contracts

Includes:
- API payloads
- Domain models
- Shared enums

Rules:
- Treated as contracts
- Changes require coordination with backend

---

## packages/debug/

Purpose:
- Dev-only debugging and observability

Includes:
- Loggers
- Tracing
- Debug panels

Rules:
- Never included in production builds
- Fully gated by environment flags

---

## tooling/

Purpose:
- Developer experience and consistency

Includes:
- ESLint config
- TS config
- Metro / Next tooling

Rules:
- Tooling must not affect runtime behavior

---

## Dependency Rules (Summary)

Allowed:
apps → packages
modules → ui, hooks, services, types

Disallowed:
packages → apps
modules → platform APIs
ui → business logic


Breaking these rules is an architectural violation.

---

## Final Note

This structure is intentionally strict.

It trades short-term freedom for:
- Long-term velocity
- Safety
- Predictability
- ERP-grade maintainability

