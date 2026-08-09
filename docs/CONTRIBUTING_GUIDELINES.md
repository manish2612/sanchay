# Contributing Guidelines

## Purpose

This document defines how contributors should work
within the ERP frontend architecture.

---

## General Rules

- Respect architectural boundaries
- Prefer clarity over cleverness
- Avoid shortcuts that introduce coupling

---

## Adding New Code

- New business logic goes into modules
- New UI primitives go into the UI package
- Platform-specific logic stays in app shells

---

## Reviews

Code reviews must check:

- Boundary violations
- Duplication
- Long-term maintainability

---

## Architectural Invariant

If convenience overrides architecture,
the system will degrade.
