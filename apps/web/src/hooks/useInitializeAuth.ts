import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRefreshMutation } from '@/features/Auth/api';
import { setCredentials, selectCurrentUser } from '@/store/authSlice';
import { cookieTokenStorage } from '@/utils/tokenStorage';
import { useNavigate, useLocation } from '@tanstack/react-router';

export function useInitializeAuth() {
  const [isInitializing, setIsInitializing] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const [refresh] = useRefreshMutation();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      // If we already have a user in Redux, no need to refresh (unless we want to force sync)
      if (user) {
        setIsInitializing(false);
        return;
      }

      // Check if we have an access token. If not, the refresh token cookie might still be there.
      // So we blindly attempt a silent refresh on initial load if we have no user in Redux.
      try {
        const response = await refresh().unwrap();
        
        // Save the new access token
        if (response.token) {
          cookieTokenStorage.setToken(response.token);
        }

        // Restore Redux state
        if (response.user) {
          dispatch(
            setCredentials({
              user: response.user,
              companies: response.companies || [],
            })
          );
        }
      } catch (error) {
        // Silent fail - the user just isn't logged in (no valid refresh cookie)
        cookieTokenStorage.clearToken();
        
        // Only redirect to login if we are on a protected route
        const isAuthPage = 
          location.pathname === '/login' || 
          location.pathname === '/signup';
          
        if (!isAuthPage) {
          navigate({ to: '/login' });
        }
      } finally {
        setIsInitializing(false);
      }
    };

    initialize();
  }, [dispatch, refresh, user, navigate, location.pathname]);

  return { isInitializing, isAuthenticated: !!user };
}
