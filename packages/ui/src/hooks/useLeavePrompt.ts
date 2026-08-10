'use client';

import { useEffect } from 'react';

export function useLeavePrompt(
  shouldPrompt: boolean,
  message: string = 'You have unsaved changes. Are you sure you want to leave?'
) {
  useEffect(() => {
    if (!shouldPrompt) return;

    let isReverting = false;

    // 1. Handle Window Close / Refresh
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // Required for Chrome to show the prompt. 
      // Note: Modern browsers will show their own generic message, not the custom one here.
      e.returnValue = message; 
      return message;
    };

    // 2. Handle client-side Next.js link clicks
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a');
      if (target && target.href && target.target !== '_blank') {
        try {
          const currentUrl = new URL(window.location.href);
          const targetUrl = new URL(target.href);
          
          // If navigating to a different route or external site
          if (
            currentUrl.origin !== targetUrl.origin ||
            currentUrl.pathname !== targetUrl.pathname ||
            currentUrl.search !== targetUrl.search
          ) {
            if (!window.confirm(message)) {
              e.preventDefault();
              e.stopPropagation();
              e.stopImmediatePropagation();
            }
          }
        } catch (error) {
          // ignore invalid URLs
        }
      }
    };

    // 3. Handle programmatic Next.js navigation (router.push/replace)
    const originalPushState = window.history.pushState;
    const originalReplaceState = window.history.replaceState;

    window.history.pushState = function (...args) {
      if (!window.confirm(message)) {
        isReverting = true;
        window.dispatchEvent(new Event('popstate'));
        return;
      }
      return originalPushState.apply(window.history, args);
    };

    window.history.replaceState = function (...args) {
      if (!window.confirm(message)) {
        isReverting = true;
        window.dispatchEvent(new Event('popstate'));
        return;
      }
      return originalReplaceState.apply(window.history, args);
    };

    // 4. Handle Back/Forward browser navigation
    const handlePopState = () => {
      if (isReverting) {
        isReverting = false;
        return;
      }
      if (!window.confirm(message)) {
        // We push the current state back to undo the user's navigation.
        originalPushState.apply(window.history, [null, '', window.location.href]);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('click', handleClick, true); // Use capture phase to intercept before Next.js
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('click', handleClick, true);
      window.removeEventListener('popstate', handlePopState);
      window.history.pushState = originalPushState;
      window.history.replaceState = originalReplaceState;
    };
  }, [shouldPrompt, message]);
}
