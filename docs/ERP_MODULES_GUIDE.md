# Prime ERP Modules Guide

## Purpose

This document defines how Prime ERP business domains are modeled, structured, and governed
inside the frontend monorepo.

Prime ERP ERP modules are the **core value units** of the system.

---

## What Is a Prime ERP Module?

An Prime ERP module represents a **business domain**, for example:
- Auth
- Sales
- Accounting
- Inventory
- Reports

Each module is:
- Self-contained
- Independently scalable
- Platform-agnostic

---

## Module Responsibilities (Illustrative)

A Prime ERP module may include:
- Domain-specific API usage
- Domain state
- Domain components
- Domain screens
- Domain hooks

This list is **not exhaustive**.

---

## What Modules Must Not Do

Modules must never:
- Access platform APIs
- Implement navigation directly
- Read environment variables
- Implement offline or persistence logic
- Depend on app shells

---

## Module Structure

Typical structure:

modules/<module-name>/
- api.ts
- state.ts
- hooks.ts
- components/
- screens/
- index.ts

---

## Dependency Rules

Allowed dependencies:
- ui
- hooks
- services
- state
- types

Disallowed dependencies:
- apps/*
- platform-specific APIs

---

## Cross-Module Communication

Modules communicate only via:
- Shared services
- Shared state
- Explicit public APIs

Direct imports between modules should be avoided.

---

## Architectural Invariant

If a module depends on platform or app-specific logic, the architecture is broken.
