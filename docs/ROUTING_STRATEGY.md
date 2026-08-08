# Routing Strategy: Next.js, Expo Web, & React Native

## Purpose

This document defines the strategy for handling routing and navigation across:

1.  **Next.js** (`apps/web`) - App Router
2.  **Expo Web** (`apps/mobile` on web) - Expo Router
3.  **Expo Native** (`apps/mobile` on iOS/Android) - Expo Router

The goal is to maintain **platform independence** in shared packages while ensuring widespread code sharing and SEO optimization where applicable.

---

## Core Principles

1.  **Shared Code is Router-Agnostic**: Packages (`ui`, `modules`) must **never** import `next/link`, `next/navigation`, or `expo-router`.
2.  **Apps Orchestrate Navigation**: The App Shells (`apps/web`, `apps/mobile`) are responsible for importing and configuring their specific routers.
3.  **Navigation via Contract**: Shared components signal intent (e.g., "User clicked profile"), and Apps execute the navigation.

---

## Strategy 1: The Callback Pattern (Programmatic Navigation)

**Use Case**: Buttons, Cards, Form submissions, Interactive elements where SEO (href) is not critical.

This is the preferred pattern for most "app-like" interactions.

### Architecture

1.  **Shared Component (`modules/user/UserList.tsx`)**:
    Accepts a callback prop.

    ```tsx
    interface UserListProps {
      onSelectUser: (userId: string) => void;
    }

    export const UserList = ({ onSelectUser }: UserListProps) => (
      // Renders list
      <UserCard onPress={() => onSelectUser(user.id)} />
    );
    ```

2.  **Next.js App (`apps/web/app/users/page.tsx`)**:
    Injects `next/navigation`.

    ```tsx
    import { useRouter } from 'next/navigation';
    import { UserList } from '@prime/modules/user';

    export default function UsersPage() {
      const router = useRouter();
      return <UserList onSelectUser={(id) => router.push(`/users/${id}`)} />;
    }
    ```

3.  **Expo App (`apps/mobile/app/users/index.tsx`)**:
    Injects `expo-router`.
    ```tsx
    import { useRouter } from 'expo-router';
    import { UserList } from '@prime/modules/user';

    export default function UsersScreen() {
      const router = useRouter();
      return <UserList onSelectUser={(id) => router.push(`/users/${id}`)} />;
    }
    ```

---

## Strategy 2: The Link Provider Pattern (Hyperlinks)

**Use Case**: Text links, Navigation Bars, Footer links.

Even for **authenticated/internal apps**, this is critical for:

1.  **UX / Power Users**: Enables **Cmd+Click** (Open in New Tab). Using `router.push` (buttons) forces users to stay in the same tab, which is frustrating for dashboards (e.g., opening multiple invoices).
2.  **Accessibility**: Screen readers expect `<a>` tags for navigation, not `<button>` or `<div onClick>`.
3.  **SEO**: Only relevant if you have public pages (marketing, login, help center).

### Architecture

1.  **Shared Link Interface (`packages/ui/src/primitives/Link.tsx`)**:
    A wrapper that consumes the specific implementation from a React Context.

    ```tsx
    import { createContext, useContext } from 'react';
    import { Text } from 'react-native';

    // The contract
    export interface LinkProps {
      href: string;
      children: React.ReactNode;
      className?: string; // For styling
    }

    const LinkContext = createContext<React.ComponentType<LinkProps> | null>(null);

    // The Provider
    export const LinkProvider = LinkContext.Provider;

    // The Consumer Component
    export const UniversalLink = (props: LinkProps) => {
      const LinkImpl = useContext(LinkContext);
      if (!LinkImpl) {
        // Fallback or Error
        console.warn('No LinkProvider found');
        return <Text>{props.children}</Text>;
      }
      return <LinkImpl {...props} />;
    };
    ```

2.  **Next.js Implementation (`apps/web/providers/AppProvider.tsx`)**:

    ```tsx
    import Link from 'next/link';
    import { LinkProvider } from '@prime/ui';

    const NextLinkAdapter = ({ href, children, ...props }: any) => (
      <Link href={href} {...props}>
        {children}
      </Link>
    );

    export const AppProvider = ({ children }) => (
      <LinkProvider value={NextLinkAdapter}>{children}</LinkProvider>
    );
    ```

3.  **Expo Implementation (`apps/mobile/providers/AppProvider.tsx`)**:
    Works for both Native and Expo Web.
    ```tsx
    import { Link } from 'expo-router';
    import { LinkProvider } from '@prime/ui';

    const ExpoLinkAdapter = ({ href, children, ...props }: any) => (
      // asChild matches usual Expo/Radix patterns if needed
      <Link href={href} {...props}>
        {children}
      </Link>
    );

    export const AppProvider = ({ children }) => (
      <LinkProvider value={ExpoLinkAdapter}>{children}</LinkProvider>
    );
    ```

---

## URL Structure & Deep Linking

To share logic effectively, both apps should strive for **symmetrical URL structures** where possible.

- **Web**: `https://app.prime.com/invoices/123`
- **Mobile Integration**: Configure `scheme` and `linking` in `apps/mobile/app.json`.

```json
{
  "expo": {
    "scheme": "prime",
    "web": {
      "bundler": "metro"
    }
  }
}
```

### Route Parity

If `apps/web` has `/dashboard`, `apps/mobile` should ideally have `app/dashboard.tsx` (using Expo Router's file system).

If routes _must_ diverge (e.g., Mobile uses a Modal for editing where Web uses a page), the **Callback Pattern** handles this gracefully, as the App Shell decides the destination path.

---

## Summary of Responsibilities

| Feature              | `packages/ui` & `modules`      | `apps/web` (Next.js)     | `apps/mobile` (Expo)     |
| :------------------- | :----------------------------- | :----------------------- | :----------------------- |
| **Interactive Nav**  | Triggers Callbacks (`onPress`) | Executes `router.push()` | Executes `router.push()` |
| **Text Links**       | Uses `<UniversalLink>`         | Provides `<Link>` (Next) | Provides `<Link>` (Expo) |
| **Route Definition** | None                           | File system (`app/`)     | File system (`app/`)     |
| **Deep Linking**     | None                           | Server Response          | Native Linking Config    |

---

## Implementation Checklist

1.  [ ] Define `LinkContext` and `UniversalLink` in `packages/ui`.
2.  [ ] Create `NextLinkAdapter` in `apps/web`.
3.  [ ] Create `ExpoLinkAdapter` in `apps/mobile`.
4.  [ ] Wrap root layouts with `LinkProvider`.
5.  [ ] Refactor existing hardcoded links in shared packages to use `UniversalLink`.
