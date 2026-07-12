# Prime ERP

Welcome to the Prime ERP Monorepo. This project is a modern, high-performance web and mobile application suite built with a "Write Once, Run Everywhere" philosophy.

## 🏗 Architecture

We follow a **Platform-Agnostic** architecture where business logic and UI components are decoupled from the specific delivery framework (Next.js/Expo).

### Structure

- **apps/**: Delivery shells. Contain configuration and routing only.
  - `web`: Next.js 16 application with Tailwind v4.
  - `mobile`: Expo 52 application.
- **packages/**: The brain of the operation.
  - `design-tokens`: The source of truth for all visual values (Colors, Spacing, Typography).
  - `theme-adapters`: Bridges design tokens to platform specifics (CSS Variables for Web, Objects for Native).
  - `theme-provider`: Manages global state (Theme Mode, Brand) and injects styles.
  - `ui`: Universal React components that work on both Web and Mobile.
  - `config`: Shared strict TypeScript and ESLint configurations.

## 🎨 Design System

Our Design System is built into the core:
- **Multi-Brand**: Supports "Default" and "Orange" brands out of the box.
- **Dark Mode**: First-class citizen with semantic color mapping.
- **Universal**: The same `Button` component renders native UI on iOS/Android and HTML on Web.

## 🚀 Getting Started

### Prerequisites
- Node.js (v20+)
- pnpm (v10+)

### Installation

```bash
pnpm install
```

### Development

Start the development servers. Hot reloading works instantly for all packages.

**Web (Localhost:3000)**
```bash
pnpm dev:web
```

**Mobile (Expo Go)**
```bash
pnpm dev:mobile
```

### Build & Verification

Build all apps and packages for production:
```bash
pnpm build
```

Run type checking across the entire Workspace (Web, Mobile, and Packages):
```bash
pnpm type-check
```

## 📦 Workspace Setup

We use **Turborepo** to orchestrate tasks and cache builds.

- **Fast Builds**: Only changed packages are rebuilt.
- **Scoping**: Run commands for specific parts of the app.
  ```bash
  pnpm --filter web dev        # Dev only web
  pnpm --filter @prime/ui build # Build only UI package
  ```

## ⚡️ Developer Cheat Sheet

### Running the App
| Command           | Description                                    |
| ----------------- | ---------------------------------------------- |
| `pnpm dev`        | Starts **Web** and **Mobile** simultaneously   |
| `pnpm dev:web`    | Starts only **Next.js** (localhost:3000)       |
| `pnpm dev:mobile` | Starts only **Expo** (Press 'i' for Simulator) |

> [!NOTE]
> `dev:mobile` runs directly via `pnpm` (bypassing Turbo) to ensure interactive Expo CLI keys (like 'j', 'r', 'i') work correctly.

### Targeted Commands (Turborepo)
Run commands only for specific packages/apps using `--filter`:

```bash
# Run dev only for web
pnpm --filter web dev

# Lint only the UI package
pnpm --filter @prime/ui lint

# Build web and its dependencies
pnpm --filter web... build
```

### Maintenance & Reset
If things act weird, try these in order:

**1. Clear Expo Cache** (Mobile issues)
```bash
pnpm dev:mobile -- --clear
```

**2. Clear Turbo & Next.js Cache** (Build/Web issues)
```bash
rm -rf .turbo apps/web/.next
```

**3. "Nuclear" Reset** (Dependency issues)
```bash
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Quality Checks
```bash
# Type check entire monorepo
pnpm type-check

# Lint all files
pnpm lint

# Format code
pnpm format
```

## 🛠 Features Implemented
- ✅ Monorepo Architecture (Turborepo)
- ✅ Universal Design Tokens
- ✅ Dynamic Theme Adapter (Tailwind v4 interactions)
- ✅ Cross-Platform Theme Provider
- ✅ Hot Reloading for all packages
- ✅ Docker-ready deployment structure
- ✅ Strict TypeScript strictness
