# UI Component Standards

To ensure cross-platform compatibility and clear separation of concerns in the `@prime/ui` package, we follow this Strict Multi-File Strategy.

## Directory Structure

Every primitive component (e.g., `Button`, `TextInput`) must have its own directory with the following structure:

```text
packages/ui/src/primitives/ComponentName/
├── types.ts                # Shared TypeScript interfaces (Props, Variants)
├── styles.ts               # Shared Native styles (StyleSheet)
├── ComponentName.dom.tsx   # Web Implementation (HTML DOM / Next.js / Vite)
├── ComponentName.native.tsx # Native Implementation (React Native)
├── index.ts                # Web Export Entry
└── index.native.ts         # Native Export Entry
```

## File Responsibilities

### 1. `types.ts` (Shared)

- Defines the common `Props` interface.
- Defines variant string unions (e.g., `'primary' | 'secondary'`).
- **Goal**: Ensure consumers use the same API on both platforms where possible.

### 2. `ComponentName.dom.tsx` (Web / React DOM)

- **Why `.dom.tsx`?**: We use this extension to avoid conflicts with Expo Web (which prefers `.web.tsx`) and to explicitly denote DOM-based implementation. It is framework-agnostic.
- **Framework**: React (DOM).
- **Styling**: Tailwind CSS, `class-variance-authority`.
- **Primitives**: HTML tags (`div`, `input`, `button`) or Radix UI primitives.

### 3. `ComponentName.native.tsx` (Native / Universal)

- **Framework**: React Native.
- **Styling**: `StyleSheet` (imported from `styles.ts`), `@prime/theme-provider`.
- **Primitives**: `View`, `Text`, `Pressable`, `TextInput`.
- **Usage**: Used by iOS, Android, AND Expo Web (via `react-native-web`).

### 4. `index.ts` (Web Entry)

Standard entry point for Web bundlers.

```typescript
export * from './ComponentName.dom';
export * from './types';
```

### 5. `index.native.ts` (Native/Universal Entry)

Explicit entry for the Expo app (Metro).

```typescript
export * from './ComponentName.native';
export * from './types';
```

## Package Entry (`packages/ui/package.json`)

The package configures the main entry points to respect this split:

```json
{
  "main": "src/index.ts", // Web Bundler picks this (Getting HTML/DOM Comps)
  "react-native": "src/index.native.ts", // Metro picks this (Getting Native Comps)
  "types": "src/index.ts"
}
```

## Why this structure?

- **Safety**: Prevents Expo Web from accidentally loading HTML/Tailwind components.
- **Explicit**: `dom.tsx` clearly indicates "Code intended for the DOM environment".
- **Separation**: strict split between DOM-based and Native-based logic.

## Component Usage Guidelines

### Text and Typography

Always use the `Text` primitive from `@prime/ui` instead of raw HTML elements (`<p>`, `<h1>`, `<span>`) or React Native `<Text>`.

- **Why?**: properly handles dynamic theming, density, and responsive font sizing.
- **Web**: Uses `asChild` for semantic HTML (e.g. `<Text asChild><h1>Title</h1></Text>`).
- **Native**: Handles platform-specific font resolution and maps tokens to native styles.
