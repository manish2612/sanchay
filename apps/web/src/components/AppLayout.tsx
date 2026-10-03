'use client';

import React from 'react';
import { Navigate, useLocation, useNavigate } from '@tanstack/react-router';
import { Sidebar } from '@/features/Navigation/components/Sidebar';
import { SidebarProvider } from '@/features/Navigation/components/Sidebar/useSidebar';
import { MobileHeader } from '@/features/Navigation/components/MobileHeader';
import { GlobalCompanyRibbon } from '@/features/Navigation/components/GlobalCompanyRibbon';
import { APP_NAME } from '@prime/config';
import { useLogoutMutation } from '@/features/Auth/api';
import { cookieTokenStorage } from '@/utils/tokenStorage';
import { useInitializeAuth } from '@/hooks/useInitializeAuth';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, logout as logoutAction } from '@/store/authSlice';
import { apiSlice } from '@/store/apiSlice';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const dispatch = useDispatch();
  
  const [logoutMutation] = useLogoutMutation();
  const { isInitializing, isAuthenticated } = useInitializeAuth();
  const user = useSelector(selectCurrentUser);

  // If we are on an auth or onboarding page, render the page content without the Sidebar wrapper
  const isAuthPage = 
    pathname === '/login' || 
    pathname === '/signup' || 
    pathname === '/company/select';

  // Wait for silent refresh to finish before deciding what to render
  if (isInitializing) {
    return (
      <div className="h-dvh w-full flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Unauthenticated guard: initialization is done and session is invalid.
  // useInitializeAuth clears Redux state on failure; this declarative <Navigate>
  // is the single, authoritative redirect. Using the <Navigate> component (not
  // the imperative navigate()) is essential — it commits the redirect after the
  // render phase and is safe to return from render.
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const handleLogout = async () => {
    try {
      // Attempt to invalidate session on the server
      await logoutMutation().unwrap();
    } catch (e) {
      // Ignore errors on logout (server might already consider the session expired)
      console.warn('Server logout failed, clearing local session anyway', e);
    } finally {
      // Always clear local token, reset redux state and redirect
      cookieTokenStorage.clearToken();
      dispatch(apiSlice.util.resetApiState()); // Completely clears RTK Query cache
      dispatch(logoutAction());
      navigate({ to: '/login' });
    }
  };

  return (
    <SidebarProvider>
      <div className="h-dvh w-full overflow-hidden flex flex-col lg:flex-row bg-background text-foreground selection:bg-primary/30">
        {/* Mobile Header (Hidden on Desktop) */}
        <MobileHeader appName={APP_NAME} />

        {/* Global Navigation Sidebar */}
        <Sidebar
          appName={APP_NAME}
          user={{ name: user?.full_name || '', email: user?.email || '' }}
          onLogout={handleLogout}
        />

        {/* Main Content Area */}
        <main className="flex flex-col flex-1 min-h-0 relative overflow-hidden items-center bg-background">
          <div className="w-full max-w-[1440px] flex-1 min-h-0 flex flex-col">
            <GlobalCompanyRibbon />
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
