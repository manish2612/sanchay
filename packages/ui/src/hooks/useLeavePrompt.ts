'use client';

import { useEffect } from 'react';

export function useLeavePrompt(
  shouldPrompt: boolean,
  message: string = 'You have unsaved changes. Are you sure you want to leave?'
) {
  useEffect(() => {
    if (!shouldPrompt) return;

    let hasConfirmedLeave = false;
    const formUrl = new URL(window.location.href);
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    const getTargetUrl = (url?: string | URL | null) => {
      if (!url) return null;
      try {
        return new URL(url, window.location.href);
      } catch {
        return null;
      }
    };

    const isDifferentRoute = (url1: URL, url2: URL) => {
      return url1.pathname !== url2.pathname || url1.search !== url2.search;
    };

    // HISTORY TRAP: 
    // We use originalPushState so Next.js's internal history index stays in sync.
    // This prevents Next.js from panicking and throwing a hard window.location.reload()
    if (!window.history.state?.__isLeaveGuardTrap) {
      originalPushState.apply(window.history, [
        { ...window.history.state, __isLeaveGuardTrap: true },
        '',
        window.location.href
      ]);
    }

    const removeTrapSilently = () => {
      if (window.history.state?.__isLeaveGuardTrap) {
        const cleanState = { ...window.history.state };
        delete cleanState.__isLeaveGuardTrap;
        originalReplaceState.apply(window.history, [cleanState, '', window.location.href]);
      }
    };

    // 1. Handle Window Close / Refresh
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasConfirmedLeave) return;
      e.preventDefault();
      e.returnValue = message; 
      return message;
    };

    // 2. Handle client-side Next.js link clicks
    const handleClick = (e: MouseEvent) => {
      if (hasConfirmedLeave) return;
      
      const target = (e.target as Element).closest('a');
      if (target && target.href && target.target !== '_blank') {
        try {
          const targetUrl = getTargetUrl(target.href);
          if (targetUrl && isDifferentRoute(formUrl, targetUrl)) {
            if (!window.confirm(message)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
            } else {
              hasConfirmedLeave = true;
              removeTrapSilently();
            }
          }
        } catch (error) {}
      }
    };

    // 3. Handle programmatic Next.js navigation
    const handleStateChange = (originalMethod: any, args: any[]) => {
      if (hasConfirmedLeave) return originalMethod.apply(window.history, args);

      const targetUrl = getTargetUrl(args[2]);
      if (targetUrl && isDifferentRoute(formUrl, targetUrl)) {
        if (!window.confirm(message)) {
          // Defer the PopStateEvent to the next tick to avoid React crashes
          setTimeout(() => {
            window.dispatchEvent(new PopStateEvent('popstate', { state: window.history.state }));
          }, 0);
          return; // Block the router URL change
        }
        hasConfirmedLeave = true;
        removeTrapSilently();
      }
      return originalMethod.apply(window.history, args);
    };

    window.history.pushState = function (...args) {
      return handleStateChange(originalPushState, args);
    };

    window.history.replaceState = function (...args) {
      return handleStateChange(originalReplaceState, args);
    };

    // 4. Handle Back/Forward browser navigation
    const handlePopState = (e: PopStateEvent) => {
      if (hasConfirmedLeave) return;

      // If they clicked back and landed on the previous, untrapped entry:
      if (!e.state?.__isLeaveGuardTrap) {
        if (!window.confirm(message)) {
          // They cancelled. Set the trap again using Next.js's pushState!
          originalPushState.apply(window.history, [
            { ...window.history.state, __isLeaveGuardTrap: true },
            '',
            window.location.href
          ]);
        } else {
          hasConfirmedLeave = true;
          // They want to leave. Let them go back for real
          window.history.back();
        }
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleClick, true); 
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
      
      // If we are unmounting without confirming leave (e.g., they saved the form),
      // we must quietly back out of the trap so history remains perfectly intact.
      if (window.history.state?.__isLeaveGuardTrap && !hasConfirmedLeave) {
        window.history.back();
      }
    };
  }, [shouldPrompt, message]);
}
