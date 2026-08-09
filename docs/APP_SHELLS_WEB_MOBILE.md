# App Shells: Web & Mobile

## Purpose

This document defines the role and constraints of **application shells** for:

- Web (Next.js)
- Mobile (React Native)

App shells are **delivery layers**, not product logic owners.

---

## Core Principle

> **Apps orchestrate platform concerns.  
> Packages implement product value.**

Apps must remain thin and replaceable.

---

## What Is an App Shell?

An app shell is responsible for:

- Bootstrapping the runtime
- Wiring providers
- Handling platform-specific lifecycle
- Rendering Prime modules

An app shell does **not** define business behavior.

---

## Web App Shell (Next.js)

### Primary Responsibilities (Illustrative, Not Exhaustive)

The web app typically handles:

- Routing (App Router / Pages)
- SSR / RSC orchestration
- SEO and metadata
- Web-only providers (e.g., theme, cookies, analytics)

> These are **representative responsibilities**, not a closed list.

---

### Explicit Non-Responsibilities

The web app **must not**:

- Contain Prime business logic
- Own global business state
- Perform API logic directly
- Implement feature rules
- Branch on offline behavior

Any violation is an architectural bug.

---

### Allowed Imports

apps/web → packages/*

### Disallowed Imports

packages/* → apps/web

---

## Mobile App Shell (React Native)

### Primary Responsibilities (Illustrative, Not Exhaustive)

The mobile app typically handles:

- Navigation setup
- Native permissions
- App lifecycle handling
- Native-only providers

> These are **examples**, not a fixed list.

---

### Explicit Non-Responsibilities

The mobile app **must not**:

- Implement Prime rules
- Own shared business state
- Perform API logic
- Implement offline logic directly

---

### Allowed Imports

apps/mobile → packages/*

### Disallowed Imports

packages/* → apps/mobile

---

## Shared Rules for All App Shells

1. Apps may **compose** modules but never modify them
2. Apps may **configure** infrastructure but never implement it
3. Apps may enable/disable features but never define behavior
4. Apps must remain thin regardless of app size

---

## Architectural Invariant

If business logic appears inside an app shell, the architecture is broken.
