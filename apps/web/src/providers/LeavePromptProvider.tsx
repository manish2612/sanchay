'use client';

import * as React from 'react';
import { useBlocker } from '@tanstack/react-router';
import {
  useFormLeaveGuard,
  LeavePromptDialog as LeavePromptDialogComponent,
} from '@prime/ui';
import type { LeavePromptDialogProps } from '@prime/ui';

// ─── Registration entry ───────────────────────────────────────────────────────
interface BlockerEntry {
  id: string;
  isDirty: boolean;
  /** Higher priority wins when multiple forms are dirty simultaneously */
  priority: number;
}

// ─── Context ──────────────────────────────────────────────────────────────────
interface LeavePromptContextValue {
  register: (entry: BlockerEntry) => void;
  unregister: (id: string) => void;
  update: (id: string, isDirty: boolean) => void;
}

const LeavePromptContext = React.createContext<LeavePromptContextValue | null>(null);

// ─── Hook for child forms ──────────────────────────────────────────────────────
/**
 * Use inside LeavePromptProvider to register a form's dirty state.
 * The provider manages a single shared blocker — only the highest-priority
 * dirty form triggers the leave prompt.
 *
 * @example
 * // In a page with two forms:
 * <LeavePromptProvider>
 *   <SearchForm />      // registers with useLeavePromptSlot internally
 *   <MainEntryForm />   // registers with priority=10 — wins when both dirty
 * </LeavePromptProvider>
 */
export function useLeavePromptSlot({
  id,
  isDirty,
  priority = 0,
}: {
  id: string;
  isDirty: boolean;
  priority?: number;
}) {
  const ctx = React.useContext(LeavePromptContext);
  if (!ctx) {
    throw new Error('useLeavePromptSlot must be used inside <LeavePromptProvider>');
  }

  // Register on mount, unregister on unmount
  React.useEffect(() => {
    ctx.register({ id, isDirty, priority });
    return () => ctx.unregister(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync dirty state on every change
  React.useEffect(() => {
    ctx.update(id, isDirty);
  }, [ctx, id, isDirty]);
}

// ─── Provider options ─────────────────────────────────────────────────────────
export interface LeavePromptProviderProps {
  children: React.ReactNode;
  /** Dialog heading */
  title?: string;
  /** Dialog body copy */
  description?: string;
  /** Label for the destructive "leave" button */
  confirmLabel?: string;
  /** Label for the "stay" button */
  cancelLabel?: string;
}

/**
 * LeavePromptProvider
 *
 * Optional provider for pages that mount multiple forms simultaneously
 * (e.g. a filter panel + a main data-entry form). It manages a single shared
 * blocker and renders exactly one LeavePromptDialog.
 *
 * Without this provider, each useLeavePrompt() call creates its own blocker.
 * Multiple independent blockers work fine in most cases — the provider is only
 * needed when you want deterministic control over WHICH form triggers the prompt.
 *
 * Usage:
 * 1. Wrap the page (or layout) with <LeavePromptProvider>
 * 2. Replace useLeavePrompt({ form }) with useLeavePromptSlot({ id, isDirty })
 *    in each child form.
 *
 * @example
 * // _layout.tsx or PageShell.tsx
 * <LeavePromptProvider>
 *   <SearchFilter />      // useLeavePromptSlot({ id: 'filter', isDirty: filterDirty })
 *   <VoucherEntryForm />  // useLeavePromptSlot({ id: 'voucher', isDirty: form.formState.isDirty, priority: 10 })
 * </LeavePromptProvider>
 */
export function LeavePromptProvider({
  children,
  title,
  description,
  confirmLabel,
  cancelLabel,
}: LeavePromptProviderProps) {
  // Map of registered form entries
  const [entries, setEntries] = React.useState<Map<string, BlockerEntry>>(new Map());

  // Determine if ANY registered form is dirty (highest priority wins display)
  const anyDirty = React.useMemo(
    () => Array.from(entries.values()).some((e) => e.isDirty),
    [entries],
  );

  // ── Context value (stable callbacks) ───────────────────────────────────────
  const register = React.useCallback((entry: BlockerEntry) => {
    setEntries((prev) => {
      const next = new Map(prev);
      next.set(entry.id, entry);
      return next;
    });
  }, []);

  const unregister = React.useCallback((id: string) => {
    setEntries((prev) => {
      const next = new Map(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const update = React.useCallback((id: string, isDirty: boolean) => {
    setEntries((prev) => {
      const existing = prev.get(id);
      if (!existing || existing.isDirty === isDirty) return prev;
      const next = new Map(prev);
      next.set(id, { ...existing, isDirty });
      return next;
    });
  }, []);

  const contextValue = React.useMemo(
    () => ({ register, unregister, update }),
    [register, unregister, update],
  );

  // ── Single shared blocker ──────────────────────────────────────────────────
  const blocker = useBlocker({
    shouldBlockFn: () => anyDirty,
    withResolver: true,
    enableBeforeUnload: true,
  });

  const guardProps = useFormLeaveGuard({
    blocker: blocker as {
      status: 'blocked' | 'idle';
      proceed: (() => void) | undefined;
      reset: (() => void) | undefined;
    },
    isDirty: anyDirty,
    title,
    description,
    confirmLabel,
    cancelLabel,
  });

  return (
    <LeavePromptContext.Provider value={contextValue}>
      {children}
      {/* Single dialog instance for all child forms */}
      <LeavePromptDialogComponent
        {...(guardProps as LeavePromptDialogProps)}
      />
    </LeavePromptContext.Provider>
  );
}
