# Environment and Build Configuration

## Purpose

This document defines how environments and build-time configuration
are handled consistently across web and mobile.

---

## Goals

- Predictable behavior across environments
- Centralized configuration
- No hidden environment dependencies

---

## Environment Types

Typical environments include:

- Development
- Staging
- Production

This list is illustrative.

---

## Configuration Strategy

- All configuration is centralized
- Configuration is strongly typed
- Modules do not access raw environment variables

---

## Platform Loading

- Web and mobile load configuration differently
- Configuration shape remains identical
- Platform-specific loaders are isolated

---

## Build-Time vs Runtime

- Build-time flags control bundling and tooling
- Runtime flags control behavior
- The two must not be conflated

---

## Safety Rules

- Missing configuration must fail fast
- Defaults must be explicit
- Sensitive values are handled securely

---

## Architectural Invariant

If a module reads environment variables directly,
the architecture is broken.
