'use client';

import React from 'react';
import { Menu } from 'lucide-react';
import { useSidebar } from '../Sidebar/useSidebar';
import { Link } from '@tanstack/react-router';

interface MobileHeaderProps {
  appName: string;
}

export function MobileHeader({ appName }: MobileHeaderProps) {
  const { setMobileMenuOpen, isMobileMenuOpen } = useSidebar();

  return (
    <header className="sticky top-0 z-40 flex h-14 w-full items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="rounded-md p-2 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
          aria-label="Open Navigation Menu"
          aria-expanded={isMobileMenuOpen}
        >
          <Menu className="h-5 w-5 text-foreground" />
        </button>
        <Link to="/dashboard" className="flex items-center">
          <span className="text-lg font-semibold tracking-tight text-foreground">{appName}</span>
        </Link>
      </div>
      
      {/* Optional: Add user avatar or actions here in the future */}
      <div className="flex items-center gap-2">
        {/* Placeholder for actions */}
      </div>
    </header>
  );
}
