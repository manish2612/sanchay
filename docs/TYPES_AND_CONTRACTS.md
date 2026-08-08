# Types and Contracts

## Purpose

This document defines shared contracts that ensure consistency
across the ERP frontend and backend.

---

## Role of Types

Types define:

- API payloads
- Domain models
- Shared enums
- Error contracts
- Navigation contracts

They are the single source of truth.

---

## Shared Error Definitions

All errors exchanged across layers must conform to shared types.

### Example Error Categories

- NetworkError
- AuthError
- ValidationError
- PermissionError
- UnknownError

Each error type must define:

- Stable error code
- Human-readable message
- Optional metadata

---

## Usage Rules

- Services create and normalize errors
- Modules consume typed errors
- UI renders errors without interpretation

Errors must never be inferred from strings.

---

## Navigation Contracts

Navigation intent must be type-safe.

### Shared Route Names

- **RouteName** (Enum/Union): The single source of truth for all screen identifiers.
- **RouteParams** (Type): Defines the required parameters for each route.

Example:

```typescript
export type RouteName = 'invoiceDetails' | 'userProfile';
export interface RouteParams {
  invoiceDetails: { id: string };
  userProfile: undefined;
}
```

UI components must emit intents using these typed payloads.

---

## Ownership

- Error types live in the shared types package
- Backend and frontend must align on contracts

---

## Architectural Invariant

If errors are handled as untyped strings,
the architecture is broken.
