# Storybook Setup

## Purpose

This document defines how Storybook is used to develop, test,
and document the shared UI system for the ERP frontend.

---

## Scope

Storybook is used for:
- UI component development in isolation
- Visual documentation
- Regression prevention

Storybook is tooling-only and never ships to production.

---

## Platforms

Storybook is maintained separately for:
- Web (Next.js)
- Mobile (React Native)

Both consume the same shared UI package.

---

## Rules

- Storybook's primary scope is packages/ui; other components are optional and non-authoritative
- No business logic in stories
- No API calls in stories
- No platform hacks inside UI components

---

## Environment Gating

- Storybook runs only in development
- It is excluded from production bundles
- Build and runtime flags ensure zero prod impact

---

## Architectural Invariant

If Storybook code ships to production, the architecture is broken.
