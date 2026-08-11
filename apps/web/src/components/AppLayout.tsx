'use client';

import React from 'react';
import { useLocation } from '@tanstack/react-router';
import { Sidebar } from '../../features/Navigation/components/Sidebar';
import { APP_NAME } from '@prime/config';

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const pathname = location.pathname;

  // TODO: [AUTHENTICATION]
  // Once authentication is implemented, you can check user session here.
  // const { isAuthenticated, user } = useAuth();
  // if (!isAuthenticated && pathname !== "/login") return <Redirect to="/login" />

  // If we are on an auth page, render the page content without the Sidebar wrapper
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (isAuthPage) {
    return <>{children}</>;
  }

  // Temporary mock user until auth is integrated
  const mockUser = { name: 'Admin User', email: 'admin@example.com' };

  return (
    <div className="h-dvh w-full overflow-hidden flex bg-background text-foreground selection:bg-primary/30">
      {/* Global Navigation Sidebar */}
      <Sidebar
        appName={APP_NAME}
        user={mockUser}
        onLogout={() => {
          // TODO: [AUTHENTICATION] Implement real logout logic here
          console.log('Logout clicked');
        }}
      />

      {/* Main Content Area */}
      <main className="flex flex-col flex-1 relative overflow-hidden items-center bg-background">
        <div className="w-full max-w-[1440px] flex-1 flex flex-col">{children}</div>
      </main>
    </div>
  );
}
