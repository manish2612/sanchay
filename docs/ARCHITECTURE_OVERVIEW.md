# Prime ERP Frontend Architecture Overview

## Purpose

This document defines the **core frontend architecture** for a production-grade ERP system
supporting **Web (Next.js)** and **Mobile (React Native)** from a **single monorepo**.

The architecture is designed to:

- Scale to ERP-level complexity (Odoo / Tally class)
- Maximize code sharing
- Maintain strict ownership boundaries
- Support optional offline-first behavior
- Remain understandable and maintainable long-term

This document is the **entry point** for all architectural decisions.

---

## Non-Negotiable Architectural Goals

1. **Single Source of Truth**
   - Business logic exists once
   - UI logic exists once
   - Platform logic exists only where unavoidable

2. **Thin Apps, Heavy Packages**
   - Apps are shells
   - Packages contain all real value

3. **Platform-Agnostic ERP Logic**
   - ERP modules must not know:
     - Web vs Mobile
     - Online vs Offline
     - Storage implementation
     - Navigation library

4. **Opt-in Complexity**
   - Offline, persistence, debugging, feature flags are optional
   - Disabled by default
   - Zero overhead when unused

5. **Long-Term Scalability**
   - Easy to add modules
   - Easy to add platforms
   - Easy to onboard engineers and AI agents

---

## High-Level System View

User
↓
App Shell (Web / Mobile)
↓
Prime ERP Modules
↓
Shared Services (API, State, Storage)
↓
Backend (Go services)

Key point:

> **Apps orchestrate. Packages implement.**

---

## Layer Responsibilities

### 1. Apps Layer (`apps/`)

**What it does**

- Routing / Navigation
- Platform lifecycle
- Bootstrapping providers

**What it never does**

- Business logic
- API logic
- ERP rules
- Cross-platform decisions

Apps are **replaceable**.

---

### 2. Packages Layer (`packages/`)

This is where Prime ERP actually lives.

Includes:

- UI system
- Prime ERP modules (Sales, Accounting, Inventory, etc.)
- API & service abstractions
- State management
- Offline engine (optional)
- Feature flags
- Shared configuration
- Shared types

Packages are **platform-agnostic by default**.

---

## Code Sharing Strategy

| Area            | Strategy                                   |
| --------------- | ------------------------------------------ |
| UI              | Platform files (`.web.tsx`, `.native.tsx`) |
| Business logic  | 100% shared                                |
| API layer       | Shared core + platform adapters            |
| State           | Shared store, optional persistence         |
| Offline support | Interceptor-based, plug-and-play           |

Bundlers ensure unused platform code is **not included**.

---

# Technology Stack

TypeScript
React
Next.js (Web)
React Native (Mobile)
Yarn Workspaces (Monorepo)
Redux Toolkit (State management)
Storybook (Web & React Native)
Fetch / Axios (API layer)
IndexedDB (Web offline storage)
SQLite / MMKV (Mobile offline storage)
Go backend (service layer integration)

---

## Offline-First Philosophy (Optional)

Offline-first is treated as **infrastructure**, not a feature.

Rules:

- Prime ERP modules never branch on offline logic
- API client decides online vs offline
- Storage and network are adapter-based
- Offline can be enabled or disabled per app

If offline is disabled:

- No storage
- No queues
- No sync
- No performance cost

---

## Debugging & Observability

Debugging must:

- Be fast
- Be correct
- Not affect production
- Not increase build size

Strategy:

- Dev-only debug layer
- Structured logs
- API tracing
- Flow markers
- State snapshots (read-only)

All debug code is **tree-shaken from production**.

---

## Feature Flags & Configuration

- Feature flags are runtime-controlled
- Flags are read-only inside modules
- Environment configuration is centralized and typed
- No direct `process.env` usage inside modules

---

## Why This Is Not Over-Engineering

This architecture avoids:

- Platform forks
- Rewrite cycles
- Hidden coupling
- ERP-scale technical debt

Complexity is:

- Isolated
- Explicit
- Optional
- Replaceable

This is **right-sized engineering for Prime ERP**, not premature abstraction.

---

## Architectural Invariants (Must Always Hold)

1. Apps never own business logic
2. Modules never know platform details
3. Offline is optional and invisible
4. Debug code never ships to production
5. Types define contracts
6. Boundaries are enforced

Violation of these rules is considered an architectural bug.
