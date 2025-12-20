# API and Services Layer

## Purpose

This document defines the API and services layer,
which acts as the infrastructure backbone of the ERP frontend.

---

## Responsibilities

The services layer is responsible for:
- API communication
- Authentication handling
- Request interception
- Error normalization
- Optional offline interception

---

## Single API Client

There is exactly one API client abstraction.

All modules must use this client.
Direct network access is forbidden.

---

## Platform Differences

Platform-specific behavior is handled via:
- Adapters
- Interceptors
- Configuration

Modules remain unaware of platform differences.

---

## Offline Integration

Offline behavior is injected at the API layer:
- Requests may be queued
- Responses may be served from cache
- Sync is handled outside modules

Offline can be enabled or disabled without code changes.

---

## Error Handling

Errors are:
- Normalized centrally
- Typed
- Consistent across platforms

Modules react to errors, they do not interpret transport details.

---

## Security Considerations

- Tokens are handled centrally
- Sensitive data never leaks to modules
- Services enforce consistent security rules

---

## Architectural Invariant

If a module performs direct network access, the architecture is broken.
