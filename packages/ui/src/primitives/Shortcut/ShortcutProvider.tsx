"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";
import { HotkeysProvider } from "react-hotkeys-hook";

// Internal context for registry/debugging - separated from the library's provider
interface InternalShortcutContextType {
  activeScopes: string[];
  pushScope: (scope: string) => void;
  popScope: (scope: string) => void;
}

const InternalShortcutContext =
  createContext<InternalShortcutContextType | null>(null);

export const ShortcutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeScopes, setActiveScopes] = useState<string[]>(["*"]); // '*' is usually global in many libraries, or we just rely on the library's mechanism.
  // react-hotkeys-hook v4 manages scopes via useHotkeys arguments.
  // However, often we want a "Scope Provider" to declaratively set the current scope (e.g. inside a Modal).

  // For now, we will simply wrap the library's provider if it has one, or just provide our own state.
  // react-hotkeys-hook exports HotkeysProvider to manage scopes.

  const pushScope = useCallback((scope: string) => {
    setActiveScopes((prev) => [...prev, scope]);
  }, []);

  const popScope = useCallback((scope: string) => {
    setActiveScopes((prev) => prev.filter((s) => s !== scope));
  }, []);

  const value = useMemo(
    () => ({
      activeScopes,
      pushScope,
      popScope,
    }),
    [activeScopes, pushScope, popScope]
  );

  return (
    <HotkeysProvider initiallyActiveScopes={["*"]}>
      <InternalShortcutContext.Provider value={value}>
        {children}
      </InternalShortcutContext.Provider>
    </HotkeysProvider>
  );
};

export const useShortcutContext = () => {
  const context = useContext(InternalShortcutContext);
  if (!context) {
    throw new Error(
      "useShortcutContext must be used within a ShortcutProvider"
    );
  }
  return context;
};
