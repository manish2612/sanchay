import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectCurrentUser, logout } from '@/store/authSlice';
import { cookieTokenStorage } from '@/utils/tokenStorage';

const baseURL = import.meta.env.VITE_API_URL || 'http://202.51.1.109:5814/api/v1/';

/**
 * Runs once on mount to validate the current session against the server.
 *
 * Calls POST /auth/refresh via native fetch (same implementation as the Axios
 * interceptor's onRefreshToken — avoids interceptor deadlocks).
 *
 * SINGLE RESPONSIBILITY — this hook only manages state:
 *   - On success: stores fresh access token, hydrates Redux with server data.
 *   - On failure: clears stale token and stale Redux/localStorage user.
 *
 * It does NOT navigate. Redirect decisions belong entirely to AppLayout,
 * which reads `isInitializing` and `isAuthenticated` and renders either a
 * spinner, a <Navigate>, or the protected layout accordingly. This avoids:
 *   1. Double-navigate races from React StrictMode's double-effect invocation
 *      in development (StrictMode mounts → unmounts → remounts, firing the
 *      effect twice).
 *   2. Stale closure bugs where an imperative navigate() reads an outdated URL
 *      after an async operation.
 */
export function useInitializeAuth() {
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    let cancelled = false;

    const initialize = async () => {
      try {
        const response = await fetch(`${baseURL}auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          credentials: 'include', // sends the HttpOnly refresh_token cookie
        });

        if (cancelled) return;

        if (!response.ok) {
          throw new Error('Refresh failed');
        }

        const data = await response.json();

        if (cancelled) return;

        if (data?.token) {
          cookieTokenStorage.setToken(data.token);
        } else {
          throw new Error('No access token in refresh response');
        }

        if (data?.user) {
          dispatch(
            setCredentials({
              user: data.user,
              companies: data.companies || [],
            })
          );
        }
      } catch {
        if (cancelled) return;
        // Session is invalid — clear stale access token and stale localStorage
        // user so AppLayout's <Navigate to="/login" /> guard can fire cleanly.
        cookieTokenStorage.clearToken();
        dispatch(logout());
      } finally {
        if (!cancelled) {
          setIsInitializing(false);
        }
      }
    };

    initialize();

    // Cleanup: if StrictMode unmounts this effect before the fetch resolves,
    // ignore the stale result. This prevents the double-state-update that
    // causes the login/dashboard flicker in development.
    return () => {
      cancelled = true;
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps — intentionally runs once on mount.

  return { isInitializing, isAuthenticated: !!user };
}
