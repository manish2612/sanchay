# Testing Strategy

## Purpose

This document defines the testing philosophy
for the ERP frontend architecture.

---

## What We Test

- Business logic inside modules
- Shared services
- Hooks and utilities

---

## What We Avoid Over-Testing

- App shells
- Platform glue code
- UI rendering details

---

## Testing Principles

- Test once, trust everywhere
- Prefer unit and integration tests
- Avoid brittle tests

---

## Tooling

Testing tools must:

- Be fast
- Be deterministic
- Not affect production builds

---

## Architectural Invariant

If business logic is untested or tests leak into production,
the architecture is broken.
