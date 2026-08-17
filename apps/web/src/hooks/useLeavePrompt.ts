import * as React from 'react';
import { useBlocker } from '@tanstack/react-router';
import type { UseFormReturn, FieldValues } from 'react-hook-form';
import {
  useFormLeaveGuard,
  LeavePromptDialog as LeavePromptDialogComponent,
} from '@prime/ui';
import type { LeavePromptDialogProps } from '@prime/ui';

// ─── Options ──────────────────────────────────────────────────────────────────
export interface UseLeavePromptOptions {
  /**
   * The react-hook-form instance. When provided the hook reads
   * `form.formState.isDirty` automatically.
   *
   * If omitted, pass `isDirty` manually (useful for custom / non-RHF forms).
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form?: UseFormReturn<any, any, any>;
  /**
   * Manually control dirty state. Overrides `form.formState.isDirty` when set.
   * Useful for non-RHF forms or composite dirty tracking across multiple sources.
   */
  isDirty?: boolean;
  /**
   * Set to `true` to disable the leave prompt entirely.
   * Use this after a successful form submission so the user can navigate freely.
   *
   * @example
   * const { isSubmitSuccessful } = form.formState;
   * const { LeavePromptDialog } = useLeavePrompt({ form, disabled: isSubmitSuccessful });
   */
  disabled?: boolean;
  /** Dialog heading. Defaults to "Unsaved changes". */
  title?: string;
  /** Dialog body copy. Defaults to a generic unsaved-changes message. */
  description?: string;
  /** Label for the "leave" (destructive) button. Defaults to "Discard & leave". */
  confirmLabel?: string;
  /** Label for the "stay" (safe) button. Defaults to "Keep editing". */
  cancelLabel?: string;
}

// ─── Return value ─────────────────────────────────────────────────────────────
export interface UseLeavePromptReturn {
  /**
   * Drop this component anywhere in the JSX tree — it renders the leave-prompt
   * dialog when a navigation is blocked. No props needed on the render site.
   *
   * @example
   * const { LeavePromptDialog } = useLeavePrompt({ form });
   * return (
   *   <>
   *     <MyForm />
   *     <LeavePromptDialog />
   *   </>
   * );
   */
  LeavePromptDialog: React.FC;
}

/**
 * useLeavePrompt
 *
 * Wires TanStack Router's useBlocker to @prime/ui's LeavePromptDialog so
 * users are asked to confirm before leaving a dirty form.
 *
 * Covers ALL navigation vectors:
 *   • In-app SPA navigation (useNavigate, <Link>, browser Back button)
 *   • Tab close / refresh / external link (native browser "Leave site?" dialog
 *     via enableBeforeUnload — cannot be customised, browser-controlled)
 *
 * ─── Simple Form ─────────────────────────────────────────────────────────────
 * @example
 * const form = useForm({ ... });
 * const { LeavePromptDialog } = useLeavePrompt({ form });
 *
 * return (
 *   <>
 *     <Form {...form}><form onSubmit={...}>...</form></Form>
 *     <LeavePromptDialog />
 *   </>
 * );
 *
 * ─── FormWizard ──────────────────────────────────────────────────────────────
 * @example
 * const form = useForm({ ... });
 * const { LeavePromptDialog } = useLeavePrompt({ form });
 *
 * return (
 *   <>
 *     <FormWizard form={form} steps={...}>
 *       ...
 *       <FormWizard.Footer onCancel={() => navigate({ to: '/list' })} />
 *     </FormWizard>
 *     <LeavePromptDialog />
 *   </>
 * );
 *
 * ─── Disable after submit ────────────────────────────────────────────────────
 * @example
 * const { isSubmitSuccessful } = form.formState;
 * const { LeavePromptDialog } = useLeavePrompt({ form, disabled: isSubmitSuccessful });
 *
 * ─── Custom / non-RHF form ───────────────────────────────────────────────────
 * @example
 * const [isDirty, setIsDirty] = useState(false);
 * const { LeavePromptDialog } = useLeavePrompt({ isDirty });
 *
 * ─── Custom copy ─────────────────────────────────────────────────────────────
 * @example
 * const { LeavePromptDialog } = useLeavePrompt({
 *   form,
 *   title: 'Abandon voucher?',
 *   description: 'Your voucher entries will be permanently lost.',
 *   confirmLabel: 'Yes, discard',
 *   cancelLabel: 'Keep editing',
 * });
 */
export function useLeavePrompt({
  form,
  isDirty: isDirtyProp,
  disabled = false,
  title,
  description,
  confirmLabel,
  cancelLabel,
}: UseLeavePromptOptions = {}): UseLeavePromptReturn {
  // ── Resolve dirty flag ────────────────────────────────────────────────────
  // Priority: explicit isDirtyProp > form.formState.isDirty
  const isFormDirty =
    isDirtyProp !== undefined ? isDirtyProp : (form?.formState?.isDirty ?? false);

  // When reset() is called for a POP action (browser back/forward), TanStack
  // internally calls window.history.go(±delta) to restore the prior URL.
  // That history.go() fires another popstate event. If shouldBlockFn is still
  // returning true, TanStack intercepts the restoration and blocks it too —
  // the URL stays wrong and the history stack becomes corrupted.
  const isResettingRef = React.useRef(false);

  const blocker = useBlocker({
    shouldBlockFn: () => {
      // Allow TanStack's own restoration navigation to pass through unblocked.
      if (isResettingRef.current) return false;
      return isFormDirty;
    },
    withResolver: true,
    enableBeforeUnload: true,
    disabled,
  });

  const blockerRef = React.useRef(blocker);
  blockerRef.current = blocker;

  const proceed = React.useCallback(() => {
    blockerRef.current.proceed?.();
  }, []);

  const reset = React.useCallback(() => {
    const b = blockerRef.current;
    if (!b.reset) return;

    const isPopAction = ['FORWARD', 'BACK', 'GO'].includes(String(b.action).toUpperCase());
    if (isPopAction) {
      isResettingRef.current = true;

      // Clear the flag once TanStack's restoration popstate has been handled.
      const cleanup = () => {
        isResettingRef.current = false;
        window.removeEventListener('popstate', cleanup);
      };
      
      window.addEventListener('popstate', cleanup, { once: true });
      
      // Fallback in case popstate doesn't fire or fails to clear the ref
      setTimeout(cleanup, 150);
    }

    b.reset();
  }, []);

  const minimalBlocker = React.useMemo(
    () => ({
      status: blocker.status,
      proceed,
      reset,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [blocker.status],
  );

  const guardProps = useFormLeaveGuard({
    // useBlocker with withResolver:true always returns the full resolver shape.
    // We cast to the router-agnostic FormLeaveBlocker interface so @prime/ui
    // stays free of any @tanstack/react-router import.
    blocker: minimalBlocker,
    isDirty: isFormDirty,
    title,
    description,
    confirmLabel,
    cancelLabel,
  });

  // ── Memoised dialog component ─────────────────────────────────────────────
  // Memoised to preserve referential stability — the component identity doesn't
  // change on re-renders, preventing unnecessary subtree unmounts.
  const LeavePromptDialog = React.useMemo<React.FC>(
    () =>
      function LeavePromptDialogBound() {
        return React.createElement(
          LeavePromptDialogComponent as React.ComponentType<LeavePromptDialogProps>,
          guardProps,
        );
      },
    // Re-create only when the guard props themselves change (open state, callbacks).
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [guardProps.isOpen, guardProps.proceed, guardProps.reset],
  );

  return { LeavePromptDialog };
}

// ─── Generic form type helper ─────────────────────────────────────────────────
// Exported so callers can type their form without repeating the generic mess.
export type AnyForm = UseFormReturn<FieldValues, unknown, FieldValues | undefined>;
