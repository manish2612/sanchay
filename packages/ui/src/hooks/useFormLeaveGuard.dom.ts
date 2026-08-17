'use client';

import { useCallback, useEffect } from 'react';

// ─── Blocker shape ────────────────────────────────────────────────────────────
// Intentionally router-agnostic so @prime/ui never imports a specific router.
// The app layer passes in the resolved blocker from e.g. @tanstack/react-router.
export interface FormLeaveBlocker {
  /** 'blocked' when a navigation is pending and awaiting user decision */
  status: 'blocked' | 'idle';
  /** Allow the pending navigation to proceed */
  proceed: (() => void) | undefined;
  /** Cancel the pending navigation and keep the user on the current page */
  reset: (() => void) | undefined;
}

// ─── Options ─────────────────────────────────────────────────────────────────
export interface UseFormLeaveGuardOptions {
  /**
   * Pre-resolved blocker state from the router layer.
   * Pass the result of useBlocker({ withResolver: true }) from @tanstack/react-router.
   */
  blocker: FormLeaveBlocker;
  /**
   * Whether the form has unsaved changes.
   * Provide this from form.formState.isDirty (RHF) or any custom dirty-tracking state.
   * The app-layer hook (useLeavePrompt) resolves this automatically.
   */
  isDirty: boolean;
  /** Dialog heading. Defaults to "Unsaved changes". */
  title?: string;
  /** Dialog body copy. */
  description?: string;
  /** Label for the destructive "leave" button. Defaults to "Discard & leave". */
  confirmLabel?: string;
  /** Label for the "stay" (safe) button. Defaults to "Keep editing". */
  cancelLabel?: string;
}

// ─── Return value ─────────────────────────────────────────────────────────────
export interface UseFormLeaveGuardReturn {
  /** true when a navigation is blocked and the dialog should be visible */
  isOpen: boolean;
  /** Allow the pending navigation (user chose to discard changes) */
  proceed: () => void;
  /** Cancel the pending navigation (user chose to keep editing) */
  reset: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  cancelLabel: string;
}

/**
 * useFormLeaveGuard
 *
 * Router-agnostic hook that maps a blocker resolver into dialog open/close
 * state and stable action handlers. Lives in @prime/ui and has zero router
 * dependency — the router blocker is injected from the app layer.
 *
 * For most use cases prefer the app-layer useLeavePrompt hook which wires
 * useBlocker + this hook together automatically.
 *
 * @example
 * // Direct usage (advanced / custom router integration)
 * const guard = useFormLeaveGuard({ blocker, isDirty: form.formState.isDirty });
 * return <LeavePromptDialog {...guard} />;
 */
export function useFormLeaveGuard({
  blocker,
  isDirty,
  title = 'Unsaved changes',
  description = 'You have unsaved changes that will be lost if you leave this page.',
  confirmLabel = 'Discard & leave',
  cancelLabel = 'Keep editing',
}: UseFormLeaveGuardOptions): UseFormLeaveGuardReturn {
  // ── Auto-proceed when form becomes clean ──────────────────────────────────
  // If a navigation is blocked but the form is subsequently reset/submitted
  // (isDirty flips to false), let the navigation proceed automatically so
  // the dialog never appears for a clean form.
  useEffect(() => {
    if (!isDirty && blocker.status === 'blocked') {
      blocker.proceed?.();
    }
  }, [isDirty, blocker]);

  // ── Stable action callbacks ───────────────────────────────────────────────
  const proceed = useCallback(() => {
    blocker.proceed?.();
  }, [blocker]);

  const reset = useCallback(() => {
    blocker.reset?.();
  }, [blocker]);

  return {
    isOpen: blocker.status === 'blocked',
    proceed,
    reset,
    title,
    description,
    confirmLabel,
    cancelLabel,
  };
}
