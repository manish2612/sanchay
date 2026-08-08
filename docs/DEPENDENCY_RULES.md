# Dependency Rules

## Purpose

This document defines allowed and disallowed dependencies
to preserve architectural boundaries.

---

## Allowed Dependency Flow

apps → packages  
modules → ui, hooks, services, state, types, config

---

## Disallowed Dependency Flow

packages → apps  
modules → platform APIs  
ui → business logic

---

## Enforcement

- Code reviews must enforce these rules
- Tooling may be used for static enforcement

---

## Architectural Invariant

If dependency boundaries are violated,
the architecture is broken.
