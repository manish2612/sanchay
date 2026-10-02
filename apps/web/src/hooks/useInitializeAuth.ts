import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, selectCurrentUser, logout } from '@/store/authSlice';
import { cookieTokenStorage } from '@/utils/tokenStorage';
import { useNavigate, useLocation } from '@tanstack/react-router';

const baseURL = import.meta.env.VITE_API_URL || 'http://202.51.1.109:5814/api/v1/';

/**
 * Runs once on mount to validate the current session against the server.
 *
 * Always calls POST /auth/refresh via native fetch (same path as the Axios
 * interceptor's onRefreshToken — avoids interceptor deadlocks and keeps a
 * single, consistent refresh implementation). If the server's HttpOnly
 * refresh_token cookie is still valid, we receive a fresh access token and
 * re-hydrate Redux. If not, we clear all local state and redirect to /login.
 *
 * WHY we don't skip when `user` exists in Redux:
 *   authSlice rehydrates `user` from localStorage on every page load.
 *   That `user` object is display data only — it is NOT proof the session
 *   is still active. We must always confirm with the server.
 */
export function useInitializeAuth() {
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      try {
        // Use native fetch — identical to onRefreshToken in store/api.ts.
        // This bypasses Axios interceptors, preventing any chance of a
        // refresh-loop deadlock on startup.
        const response = await fetch(`${baseURL}auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          credentials: 'include', // sends the HttpOnly refresh_token cookie
        });

        if (!response.ok) {
          throw new Error('Refresh failed');
        }

        const data = await response.json();

        // Store the fresh access token so Axios can attach it as Bearer header.
        if (data?.token) {
          cookieTokenStorage.setToken(data.token);
        } else {
          throw new Error('No access token in refresh response');
        }

        // Sync Redux (and localStorage via authSlice) with the latest server data.
        if (data?.user) {
          dispatch(
            setCredentials({
              user: data.user,
              companies: data.companies || [],
            })
          );
        }
      } catch {
        // Session is invalid. Clear the stale access token AND the stale
        // localStorage user so we don't trust it on the next page load.
        cookieTokenStorage.clearToken();
        dispatch(logout());

        const isAuthPage =
          location.pathname === '/login' || location.pathname === '/signup';

        if (!isAuthPage) {
          navigate({ to: '/login' });
        }
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Intentionally empty — run exactly once on mount.

  return { isInitializing, isAuthenticated: !!user };
}
