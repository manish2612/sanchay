# State Management Strategy

## Purpose

This document defines how shared and module-level state is handled
across the ERP frontend.

---

## What State Is Used For

State is used to manage:

- Authentication
- User context
- Application settings
- Cached or derived data
- Cross-module shared data

This list is **illustrative, not exhaustive**.

---

## What State Is Not Used For

State must not:

- Encode business rules
- Orchestrate API workflows
- Replace domain logic

---

## State Ownership

- Global, cross-cutting state lives in the shared state package
- Domain-specific state lives inside its module
- UI-only state stays inside components

---

## Persistence

Persistence is:

- Optional
- Explicit
- Infrastructure-driven

State persistence must never be assumed by modules.

---

## Offline Interaction

Offline support may enhance state persistence,
but state must remain functional without offline enabled.

---

## Replaceability

The state solution must remain:

- Replaceable
- Testable
- Isolated behind clear APIs

---

## Architectural Invariant

If state becomes the source of business truth, the architecture is broken.
