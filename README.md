# Sanchay ERP

Welcome to the Sanchay ERP Monorepo. This project contains the frontend applications and shared logic for the Sanchay platform.

## 🏗 Architecture

This is a **Platform-Agnostic** architecture following the "Thin Apps, Heavy Packages" philosophy.

- **apps/**: Delivery shells. Contain NO business logic.
  - `web`: Next.js application.
  - `mobile`: Expo / React Native application.
- **packages/**: Core logic shared across platforms.
  - `ui`: Shared React components (Platform agnostic).
  - `config`: Shared constants and feature flags.
  - `types`: Shared TypeScript contracts.
  - `utils`: Pure JavaScript utilities.

## 🚀 Getting Started

### Prerequisites

- Node.js (v20+)
- pnpm (v9+)

### Installation

```bash
pnpm install
```

### Development

Start all applications in development mode:

```bash
pnpm dev
```

- **Web**: http://localhost:3000
- **Mobile**: Starts Metro bundler (Press `i` for iOS, `a` for Android)

### Build & Verification

Build all applications and packages:
```bash
pnpm build
```

Run type checking across the entire Workspace:
```bash
pnpm type-check
```

Lint all files:
```bash
pnpm lint
```

## 📦 Workspace Commands

We use [Turborepo](https://turbo.build/) to orchestrate tasks.

- Run a command for a specific app/package:
  ```bash
  pnpm --filter web dev
  pnpm --filter @sanchay/ui lint
  ```
